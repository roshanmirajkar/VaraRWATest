import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAssetSchema, insertBridgeSchema, insertActivitySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Stats endpoint
  app.get("/api/stats", async (_req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  // Assets endpoints
  app.get("/api/assets", async (_req, res) => {
    try {
      const assets = await storage.getAssets();
      res.json(assets);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch assets" });
    }
  });

  app.get("/api/assets/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const asset = await storage.getAsset(id);
      if (!asset) {
        return res.status(404).json({ message: "Asset not found" });
      }
      res.json(asset);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch asset" });
    }
  });

  app.post("/api/assets", async (req, res) => {
    try {
      const validatedData = insertAssetSchema.parse(req.body);
      const asset = await storage.createAsset(validatedData);
      res.status(201).json(asset);
    } catch (error) {
      res.status(400).json({ message: "Invalid asset data", error });
    }
  });

  // Bridges endpoints
  app.get("/api/bridges", async (_req, res) => {
    try {
      const bridges = await storage.getBridges();
      res.json(bridges);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bridges" });
    }
  });

  app.get("/api/bridges/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const bridge = await storage.getBridge(id);
      if (!bridge) {
        return res.status(404).json({ message: "Bridge not found" });
      }
      res.json(bridge);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bridge" });
    }
  });

  app.post("/api/bridges", async (req, res) => {
    try {
      const validatedData = insertBridgeSchema.parse(req.body);
      const bridge = await storage.createBridge(validatedData);
      res.status(201).json(bridge);
    } catch (error) {
      res.status(400).json({ message: "Invalid bridge data", error });
    }
  });

  app.patch("/api/bridges/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const bridge = await storage.updateBridge(id, req.body);
      if (!bridge) {
        return res.status(404).json({ message: "Bridge not found" });
      }
      res.json(bridge);
    } catch (error) {
      res.status(500).json({ message: "Failed to update bridge" });
    }
  });

  // Activities endpoints
  app.get("/api/activities", async (_req, res) => {
    try {
      const activities = await storage.getActivities();
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch activities" });
    }
  });

  app.post("/api/activities", async (req, res) => {
    try {
      const validatedData = insertActivitySchema.parse(req.body);
      const activity = await storage.createActivity(validatedData);
      res.status(201).json(activity);
    } catch (error) {
      res.status(400).json({ message: "Invalid activity data", error });
    }
  });

  // Market data endpoints
  app.get("/api/market-data", async (_req, res) => {
    try {
      const marketData = await storage.getMarketData();
      res.json(marketData);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch market data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
