import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createSubmission, updateSubmissionEmailStatus } from "./db";
import { storagePut } from "./storage";
import { sendSubmissionEmail } from "./email";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Financial Health Check-Up submission
  submission: router({
    create: publicProcedure
      .input(
        z.object({
          // Tax Accountant Information
          accountantName: z.string().min(1),
          accountantEmail: z.string().email(),
          accountantPhone: z.string().min(1),

          // Client Information
          clientEmail: z.string().email(),
          clientPhone: z.string().min(1),
          propertyType: z.enum(["primary", "investment"]),

          // Current Mortgage Details
          currentPayment: z.string().optional(),
          currentRate: z.string().optional(),
          remainingBalance: z.string().optional(),
          yearsRemaining: z.string().optional(),
          hasHelocOrLiens: z.enum(["yes", "no"]),

          // Monthly Debt Obligations
          creditCardPayments: z.string().optional(),
          autoLoans: z.string().optional(),
          personalLoans: z.string().optional(),
          studentLoans: z.string().optional(),
          otherDebts: z.string().optional(),
          totalMonthlyDebt: z.string(),

          // Financial Goals
          goalLowerPayment: z.boolean(),
          goalPayOffDebt: z.boolean(),
          goalAccessEquity: z.boolean(),
          goalShortenTerm: z.boolean(),
          goalOther: z.boolean(),
          goalOtherText: z.string().optional(),

          // Document Upload (base64 encoded)
          mortgageStatementData: z.string().optional(),
          mortgageStatementFilename: z.string().optional(),
          mortgageStatementMimeType: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          // Upload file to S3 if provided
          let mortgageStatementUrl: string | undefined;
          if (input.mortgageStatementData && input.mortgageStatementFilename) {
            // Convert base64 to buffer
            const base64Data = input.mortgageStatementData.split(",")[1] || input.mortgageStatementData;
            const fileBuffer = Buffer.from(base64Data, "base64");

            // Generate unique filename
            const timestamp = Date.now();
            const randomSuffix = Math.random().toString(36).substring(2, 8);
            const fileExtension = input.mortgageStatementFilename.split(".").pop();
            const fileKey = `submissions/${timestamp}-${randomSuffix}.${fileExtension}`;

            // Upload to S3
            const uploadResult = await storagePut(
              fileKey,
              fileBuffer,
              input.mortgageStatementMimeType || "application/pdf"
            );

            mortgageStatementUrl = uploadResult.url;
          }

          // Save to database
          const submissionData = {
            accountantName: input.accountantName,
            accountantEmail: input.accountantEmail,
            accountantPhone: input.accountantPhone,
            clientEmail: input.clientEmail,
            clientPhone: input.clientPhone,
            propertyType: input.propertyType,
            currentPayment: input.currentPayment,
            currentRate: input.currentRate,
            remainingBalance: input.remainingBalance,
            yearsRemaining: input.yearsRemaining,
            hasHelocOrLiens: input.hasHelocOrLiens,
            creditCardPayments: input.creditCardPayments,
            autoLoans: input.autoLoans,
            personalLoans: input.personalLoans,
            studentLoans: input.studentLoans,
            otherDebts: input.otherDebts,
            totalMonthlyDebt: input.totalMonthlyDebt,
            goalLowerPayment: input.goalLowerPayment,
            goalPayOffDebt: input.goalPayOffDebt,
            goalAccessEquity: input.goalAccessEquity,
            goalShortenTerm: input.goalShortenTerm,
            goalOther: input.goalOther,
            goalOtherText: input.goalOtherText,
            mortgageStatementUrl,
            mortgageStatementFilename: input.mortgageStatementFilename,
          };

          const result = await createSubmission(submissionData);
          const submissionId = Number(result[0].insertId);

          // Prepare goals array for email
          const goals: string[] = [];
          if (input.goalLowerPayment) goals.push("Lower monthly payment");
          if (input.goalPayOffDebt) goals.push("Pay off high-interest debt");
          if (input.goalAccessEquity) goals.push("Access equity for investment");
          if (input.goalShortenTerm) goals.push("Shorten loan term");
          if (input.goalOther && input.goalOtherText) goals.push("Other");

          // Send email notification
          const emailSent = await sendSubmissionEmail({
            accountantName: input.accountantName,
            accountantEmail: input.accountantEmail,
            accountantPhone: input.accountantPhone,
            clientEmail: input.clientEmail,
            clientPhone: input.clientPhone,
            propertyType: input.propertyType,
            currentPayment: input.currentPayment,
            currentRate: input.currentRate,
            remainingBalance: input.remainingBalance,
            yearsRemaining: input.yearsRemaining,
            hasHelocOrLiens: input.hasHelocOrLiens,
            creditCardPayments: input.creditCardPayments,
            autoLoans: input.autoLoans,
            personalLoans: input.personalLoans,
            studentLoans: input.studentLoans,
            otherDebts: input.otherDebts,
            totalMonthlyDebt: input.totalMonthlyDebt,
            goals,
            otherGoalText: input.goalOtherText,
            mortgageStatementUrl,
            mortgageStatementFilename: input.mortgageStatementFilename,
          });

          // Update email status
          await updateSubmissionEmailStatus(submissionId, emailSent);

          return {
            success: true,
            submissionId,
            emailSent,
          };
        } catch (error) {
          console.error("[Submission] Error creating submission:", error);
          throw new Error("Failed to submit form. Please try again.");
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
