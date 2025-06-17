import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, ArrowRightLeft, Home, Receipt } from "lucide-react";
import type { Stats } from "@/lib/types";

export default function StatsBar() {
  const { data: stats, isLoading } = useQuery<Stats>({
    queryKey: ["/api/stats"],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-16 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
      <Card className="shadow-lg border border-gray-100">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Value Locked</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.tvl || '$0'}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-green-600" size={20} />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <span className="text-green-600 text-sm font-medium">+12.5%</span>
            <span className="text-gray-500 text-sm ml-1">24h</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg border border-gray-100">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Bridges</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.totalBridges || 0}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ArrowRightLeft className="text-blue-600" size={20} />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <span className="text-blue-600 text-sm font-medium">+3 new</span>
            <span className="text-gray-500 text-sm ml-1">today</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg border border-gray-100">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">RWA Assets</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.totalAssets || 0}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Home className="text-purple-600" size={20} />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <span className="text-purple-600 text-sm font-medium">+8 new</span>
            <span className="text-gray-500 text-sm ml-1">this week</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg border border-gray-100">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Transactions</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.totalTransactions.toLocaleString() || '0'}K</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Receipt className="text-orange-600" size={20} />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <span className="text-orange-600 text-sm font-medium">+234</span>
            <span className="text-gray-500 text-sm ml-1">24h</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
