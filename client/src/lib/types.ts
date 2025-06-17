export interface Stats {
  tvl: string;
  totalBridges: number;
  totalAssets: number;
  totalTransactions: number;
}

export interface AssetFormData {
  name: string;
  type: string;
  description: string;
  value: string;
  tokenSymbol: string;
  totalSupply: string;
  decimals: number;
  owner: string;
  status: string;
}

export interface BridgeFormData {
  name: string;
  sourceChain: string;
  targetChain: string;
  bridgeType: string;
  owner: string;
  status: string;
}
