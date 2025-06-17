import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Home, Coins, Palette, BarChart3 } from "lucide-react";
import type { MarketData } from "@shared/schema";

export default function MarketOverview() {
  const { data: marketData, isLoading } = useQuery<MarketData[]>({
    queryKey: ["/api/market-data"],
  });

  if (isLoading) {
    return (
      <Card className="mt-12 rounded-2xl p-8 shadow-xl border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Market Overview</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse p-6 bg-gray-50 rounded-xl">
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  const getCategoryInfo = (category: string) => {
    switch (category) {
      case 'real_estate':
        return { name: 'Real Estate', icon: Home, color: 'green' };
      case 'commodities':
        return { name: 'Commodities', icon: Coins, color: 'yellow' };
      case 'art':
        return { name: 'Art & Collectibles', icon: Palette, color: 'purple' };
      case 'bonds':
        return { name: 'Bonds', icon: BarChart3, color: 'blue' };
      default:
        return { name: category, icon: BarChart3, color: 'gray' };
    }
  };

  return (
    <Card className="mt-12 rounded-2xl p-8 shadow-xl border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Market Overview</h2>
        <div className="flex space-x-2">
          <Button size="sm" className="vara-gradient text-white">24H</Button>
          <Button size="sm" variant="ghost" className="text-gray-600 hover:bg-gray-100">7D</Button>
          <Button size="sm" variant="ghost" className="text-gray-600 hover:bg-gray-100">30D</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {marketData?.map((market) => {
          const { name, icon: IconComponent, color } = getCategoryInfo(market.category);
          const isPositive = parseFloat(market.changePercent) >= 0;
          const TrendIcon = isPositive ? TrendingUp : TrendingDown;
          
          return (
            <div key={market.category} className={`p-6 bg-gradient-to-br from-${color}-50 to-${color}-100 rounded-xl`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{name}</h3>
                <IconComponent className={`text-${color}-600`} size={20} />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-2">
                ${(parseFloat(market.totalValue) / 1000).toFixed(0)}K
              </p>
              <div className="flex items-center">
                <TrendIcon className={`${isPositive ? 'text-green-600' : 'text-red-500'} mr-1`} size={16} />
                <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
                  {isPositive ? '+' : ''}{market.changePercent}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
