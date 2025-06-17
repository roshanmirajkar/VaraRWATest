import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Asset } from "@shared/schema";

export default function PortfolioOverview() {
  const { data: assets, isLoading } = useQuery<Asset[]>({
    queryKey: ["/api/assets"],
  });

  if (isLoading) {
    return (
      <Card className="rounded-2xl p-6 shadow-xl border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Your Portfolio</h3>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse p-4 bg-gray-50 rounded-lg">
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  const getAssetImage = (type: string) => {
    switch (type) {
      case 'real_estate':
        return "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60";
      case 'commodities':
        return "https://images.unsplash.com/photo-1610375461246-83df859d849d?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60";
      case 'art':
        return "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60";
      default:
        return "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60";
    }
  };

  const getAssetTypeLabel = (type: string) => {
    switch (type) {
      case 'real_estate':
        return 'Real Estate';
      case 'commodities':
        return 'Commodities';
      case 'art':
        return 'Art & Collectibles';
      case 'bonds':
        return 'Bonds';
      default:
        return 'Other';
    }
  };

  const getRandomChange = () => {
    const changes = ['+5.2%', '-2.1%', '+12.8%', '+3.4%', '-1.8%', '+7.3%'];
    return changes[Math.floor(Math.random() * changes.length)];
  };

  return (
    <Card className="rounded-2xl p-6 shadow-xl border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Your Portfolio</h3>
      <div className="space-y-4">
        {assets?.slice(0, 3).map((asset) => {
          const change = getRandomChange();
          const isPositive = change.startsWith('+');
          
          return (
            <div key={asset.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <img 
                  src={getAssetImage(asset.type)} 
                  alt={asset.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900">{asset.name}</p>
                  <p className="text-sm text-gray-600">{getAssetTypeLabel(asset.type)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">${parseFloat(asset.value).toLocaleString()}</p>
                <p className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
                  {change}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      <Button variant="outline" className="w-full mt-4 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300">
        View All Assets
      </Button>
    </Card>
  );
}
