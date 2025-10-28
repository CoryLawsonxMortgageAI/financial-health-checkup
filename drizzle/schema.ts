import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Financial health check submissions table
 * Stores all form submissions from tax accountants and their clients
 */
export const submissions = mysqlTable("submissions", {
  id: int("id").autoincrement().primaryKey(),
  
  // Tax Accountant Information
  accountantName: varchar("accountantName", { length: 255 }).notNull(),
  accountantEmail: varchar("accountantEmail", { length: 320 }).notNull(),
  accountantPhone: varchar("accountantPhone", { length: 50 }).notNull(),
  
  // Client Information
  clientEmail: varchar("clientEmail", { length: 320 }).notNull(),
  clientPhone: varchar("clientPhone", { length: 50 }).notNull(),
  propertyType: varchar("propertyType", { length: 50 }).notNull(),
  
  // Current Mortgage Details
  currentPayment: varchar("currentPayment", { length: 50 }),
  currentRate: varchar("currentRate", { length: 50 }),
  remainingBalance: varchar("remainingBalance", { length: 50 }),
  yearsRemaining: varchar("yearsRemaining", { length: 50 }),
  hasHelocOrLiens: varchar("hasHelocOrLiens", { length: 10 }).notNull(),
  
  // Monthly Debt Obligations
  creditCardPayments: varchar("creditCardPayments", { length: 50 }),
  autoLoans: varchar("autoLoans", { length: 50 }),
  personalLoans: varchar("personalLoans", { length: 50 }),
  studentLoans: varchar("studentLoans", { length: 50 }),
  otherDebts: varchar("otherDebts", { length: 50 }),
  totalMonthlyDebt: varchar("totalMonthlyDebt", { length: 50 }),
  
  // Financial Goals
  goalLowerPayment: boolean("goalLowerPayment").default(false),
  goalPayOffDebt: boolean("goalPayOffDebt").default(false),
  goalAccessEquity: boolean("goalAccessEquity").default(false),
  goalShortenTerm: boolean("goalShortenTerm").default(false),
  goalOther: boolean("goalOther").default(false),
  goalOtherText: text("goalOtherText"),
  
  // Document Upload
  mortgageStatementUrl: text("mortgageStatementUrl"),
  mortgageStatementFilename: varchar("mortgageStatementFilename", { length: 255 }),
  
  // Metadata
  emailSent: boolean("emailSent").default(false),
  emailSentAt: timestamp("emailSentAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Submission = typeof submissions.$inferSelect;
export type InsertSubmission = typeof submissions.$inferInsert;