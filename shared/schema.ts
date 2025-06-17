import { pgTable, text, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const assets = pgTable("assets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'real_estate', 'commodities', 'art', 'bonds', 'other'
  description: text("description"),
  value: decimal("value", { precision: 18, scale: 2 }).notNull(),
  tokenSymbol: text("token_symbol").notNull(),
  totalSupply: text("total_supply").notNull(),
  decimals: integer("decimals").notNull().default(18),
  owner: text("owner").notNull(),
  status: text("status").notNull().default("active"), // 'active', 'pending', 'deployed'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const bridges = pgTable("bridges", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  sourceChain: text("source_chain").notNull(),
  targetChain: text("target_chain").notNull(),
  bridgeType: text("bridge_type").notNull(), // 'fast', 'secure', 'economic'
  status: text("status").notNull().default("configured"), // 'configured', 'deploying', 'active', 'paused'
  owner: text("owner").notNull(),
  deploymentFee: decimal("deployment_fee", { precision: 18, scale: 2 }).default("50.00"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // 'asset_created', 'bridge_deployed', 'token_minted', 'transfer'
  description: text("description").notNull(),
  amount: text("amount"),
  owner: text("owner").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const marketData = pgTable("market_data", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(), // 'real_estate', 'commodities', 'art', 'bonds'
  totalValue: decimal("total_value", { precision: 18, scale: 2 }).notNull(),
  changePercent: decimal("change_percent", { precision: 5, scale: 2 }).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertAssetSchema = createInsertSchema(assets).omit({
  id: true,
  createdAt: true,
});

export const insertBridgeSchema = createInsertSchema(bridges).omit({
  id: true,
  createdAt: true,
  deploymentFee: true,
});

export const insertActivitySchema = createInsertSchema(activities).omit({
  id: true,
  createdAt: true,
});

export const insertMarketDataSchema = createInsertSchema(marketData).omit({
  id: true,
  updatedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertAsset = z.infer<typeof insertAssetSchema>;
export type Asset = typeof assets.$inferSelect;
export type InsertBridge = z.infer<typeof insertBridgeSchema>;
export type Bridge = typeof bridges.$inferSelect;
export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type Activity = typeof activities.$inferSelect;
export type InsertMarketData = z.infer<typeof insertMarketDataSchema>;
export type MarketData = typeof marketData.$inferSelect;
