import { users, assets, bridges, activities, marketData, type User, type InsertUser, type Asset, type InsertAsset, type Bridge, type InsertBridge, type Activity, type InsertActivity, type MarketData, type InsertMarketData } from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Assets
  getAssets(): Promise<Asset[]>;
  getAsset(id: number): Promise<Asset | undefined>;
  getAssetsByOwner(owner: string): Promise<Asset[]>;
  createAsset(asset: InsertAsset): Promise<Asset>;
  updateAsset(id: number, updates: Partial<Asset>): Promise<Asset | undefined>;

  // Bridges
  getBridges(): Promise<Bridge[]>;
  getBridge(id: number): Promise<Bridge | undefined>;
  getBridgesByOwner(owner: string): Promise<Bridge[]>;
  createBridge(bridge: InsertBridge): Promise<Bridge>;
  updateBridge(id: number, updates: Partial<Bridge>): Promise<Bridge | undefined>;

  // Activities
  getActivities(): Promise<Activity[]>;
  getActivitiesByOwner(owner: string): Promise<Activity[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;

  // Market Data
  getMarketData(): Promise<MarketData[]>;
  getMarketDataByCategory(category: string): Promise<MarketData | undefined>;
  updateMarketData(category: string, data: InsertMarketData): Promise<MarketData>;

  // Stats
  getStats(): Promise<{
    tvl: string;
    totalBridges: number;
    totalAssets: number;
    totalTransactions: number;
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private assets: Map<number, Asset>;
  private bridges: Map<number, Bridge>;
  private activities: Map<number, Activity>;
  private marketData: Map<string, MarketData>;
  private currentUserId: number;
  private currentAssetId: number;
  private currentBridgeId: number;
  private currentActivityId: number;

  constructor() {
    this.users = new Map();
    this.assets = new Map();
    this.bridges = new Map();
    this.activities = new Map();
    this.marketData = new Map();
    this.currentUserId = 1;
    this.currentAssetId = 1;
    this.currentBridgeId = 1;
    this.currentActivityId = 1;

    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample assets
    const sampleAssets: InsertAsset[] = [
      {
        name: "NYC Apartment",
        type: "real_estate",
        description: "Luxury apartment in Manhattan",
        value: "125000.00",
        tokenSymbol: "NYCA",
        totalSupply: "1000000",
        decimals: 18,
        owner: "user1",
        status: "active"
      },
      {
        name: "Gold Reserve",
        type: "commodities",
        description: "Physical gold reserves",
        value: "85000.00",
        tokenSymbol: "GOLD",
        totalSupply: "500000",
        decimals: 18,
        owner: "user1",
        status: "active"
      },
      {
        name: "Art Collection",
        type: "art",
        description: "Contemporary art pieces",
        value: "45000.00",
        tokenSymbol: "ART",
        totalSupply: "100000",
        decimals: 18,
        owner: "user1",
        status: "active"
      }
    ];

    sampleAssets.forEach(asset => {
      const id = this.currentAssetId++;
      this.assets.set(id, { 
        ...asset, 
        id, 
        createdAt: new Date(),
        description: asset.description || null,
        decimals: asset.decimals || 18,
        status: asset.status || "active"
      });
    });

    // Sample bridges
    const sampleBridges: InsertBridge[] = [
      {
        name: "ETH-VARA Bridge",
        sourceChain: "Ethereum",
        targetChain: "Vara Network",
        bridgeType: "fast",
        status: "active",
        owner: "user1"
      },
      {
        name: "POLY-VARA Bridge",
        sourceChain: "Polygon",
        targetChain: "Vara Network",
        bridgeType: "secure",
        status: "deploying",
        owner: "user1"
      },
      {
        name: "BSC-VARA Bridge",
        sourceChain: "Binance Smart Chain",
        targetChain: "Vara Network",
        bridgeType: "economic",
        status: "configured",
        owner: "user1"
      }
    ];

    sampleBridges.forEach(bridge => {
      const id = this.currentBridgeId++;
      this.bridges.set(id, { 
        ...bridge, 
        id, 
        deploymentFee: "50.00", 
        createdAt: new Date(),
        status: bridge.status || "configured"
      });
    });

    // Sample activities
    const sampleActivities: InsertActivity[] = [
      {
        type: "asset_created",
        description: "Asset tokenized",
        amount: "+$15,000",
        owner: "user1"
      },
      {
        type: "bridge_deployed",
        description: "Bridge deployed",
        amount: "-$50",
        owner: "user1"
      },
      {
        type: "token_minted",
        description: "Token minted",
        amount: "1,000 RWA",
        owner: "user1"
      }
    ];

    sampleActivities.forEach(activity => {
      const id = this.currentActivityId++;
      this.activities.set(id, { ...activity, id, createdAt: new Date() });
    });

    // Sample market data
    const sampleMarketData: { category: string; data: InsertMarketData }[] = [
      {
        category: "real_estate",
        data: { category: "real_estate", totalValue: "1200000.00", changePercent: "8.5" }
      },
      {
        category: "commodities",
        data: { category: "commodities", totalValue: "850000.00", changePercent: "-2.3" }
      },
      {
        category: "art",
        data: { category: "art", totalValue: "320000.00", changePercent: "15.2" }
      },
      {
        category: "bonds",
        data: { category: "bonds", totalValue: "125000.00", changePercent: "3.1" }
      }
    ];

    sampleMarketData.forEach(({ category, data }) => {
      this.marketData.set(category, { ...data, id: 0, updatedAt: new Date() });
    });
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Assets
  async getAssets(): Promise<Asset[]> {
    return Array.from(this.assets.values());
  }

  async getAsset(id: number): Promise<Asset | undefined> {
    return this.assets.get(id);
  }

  async getAssetsByOwner(owner: string): Promise<Asset[]> {
    return Array.from(this.assets.values()).filter(asset => asset.owner === owner);
  }

  async createAsset(insertAsset: InsertAsset): Promise<Asset> {
    const id = this.currentAssetId++;
    const asset: Asset = { ...insertAsset, id, createdAt: new Date() };
    this.assets.set(id, asset);
    
    // Create activity
    await this.createActivity({
      type: "asset_created",
      description: `Asset ${asset.name} tokenized`,
      amount: `+$${asset.value}`,
      owner: asset.owner
    });
    
    return asset;
  }

  async updateAsset(id: number, updates: Partial<Asset>): Promise<Asset | undefined> {
    const asset = this.assets.get(id);
    if (!asset) return undefined;
    
    const updatedAsset = { ...asset, ...updates };
    this.assets.set(id, updatedAsset);
    return updatedAsset;
  }

  // Bridges
  async getBridges(): Promise<Bridge[]> {
    return Array.from(this.bridges.values());
  }

  async getBridge(id: number): Promise<Bridge | undefined> {
    return this.bridges.get(id);
  }

  async getBridgesByOwner(owner: string): Promise<Bridge[]> {
    return Array.from(this.bridges.values()).filter(bridge => bridge.owner === owner);
  }

  async createBridge(insertBridge: InsertBridge): Promise<Bridge> {
    const id = this.currentBridgeId++;
    const bridge: Bridge = { 
      ...insertBridge, 
      id, 
      deploymentFee: "50.00",
      createdAt: new Date() 
    };
    this.bridges.set(id, bridge);
    
    // Create activity
    await this.createActivity({
      type: "bridge_deployed",
      description: `Bridge ${bridge.name} deployed`,
      amount: `-$${bridge.deploymentFee}`,
      owner: bridge.owner
    });
    
    return bridge;
  }

  async updateBridge(id: number, updates: Partial<Bridge>): Promise<Bridge | undefined> {
    const bridge = this.bridges.get(id);
    if (!bridge) return undefined;
    
    const updatedBridge = { ...bridge, ...updates };
    this.bridges.set(id, updatedBridge);
    return updatedBridge;
  }

  // Activities
  async getActivities(): Promise<Activity[]> {
    return Array.from(this.activities.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getActivitiesByOwner(owner: string): Promise<Activity[]> {
    return Array.from(this.activities.values())
      .filter(activity => activity.owner === owner)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
    const id = this.currentActivityId++;
    const activity: Activity = { ...insertActivity, id, createdAt: new Date() };
    this.activities.set(id, activity);
    return activity;
  }

  // Market Data
  async getMarketData(): Promise<MarketData[]> {
    return Array.from(this.marketData.values());
  }

  async getMarketDataByCategory(category: string): Promise<MarketData | undefined> {
    return this.marketData.get(category);
  }

  async updateMarketData(category: string, data: InsertMarketData): Promise<MarketData> {
    const marketData: MarketData = { ...data, id: 0, updatedAt: new Date() };
    this.marketData.set(category, marketData);
    return marketData;
  }

  // Stats
  async getStats(): Promise<{
    tvl: string;
    totalBridges: number;
    totalAssets: number;
    totalTransactions: number;
  }> {
    const totalValue = Array.from(this.assets.values())
      .reduce((sum, asset) => sum + parseFloat(asset.value), 0);
    
    return {
      tvl: `$${(totalValue / 1000000).toFixed(1)}M`,
      totalBridges: this.bridges.size,
      totalAssets: this.assets.size,
      totalTransactions: this.activities.size * 100 // Mock multiplier
    };
  }
}

export const storage = new MemStorage();
