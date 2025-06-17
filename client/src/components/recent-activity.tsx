import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowRightLeft, Coins } from "lucide-react";
import { formatDistance } from "date-fns";
import type { Activity } from "@shared/schema";

export default function RecentActivity() {
  const { data: activities, isLoading } = useQuery<Activity[]>({
    queryKey: ["/api/activities"],
  });

  if (isLoading) {
    return (
      <Card className="rounded-2xl p-6 shadow-xl border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse p-3 bg-gray-50 rounded-lg">
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'asset_created':
        return ArrowUp;
      case 'bridge_deployed':
        return ArrowRightLeft;
      case 'token_minted':
        return Coins;
      default:
        return ArrowUp;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'asset_created':
        return 'green';
      case 'bridge_deployed':
        return 'blue';
      case 'token_minted':
        return 'purple';
      default:
        return 'green';
    }
  };

  return (
    <Card className="rounded-2xl p-6 shadow-xl border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities?.slice(0, 3).map((activity) => {
          const ActivityIcon = getActivityIcon(activity.type);
          const color = getActivityColor(activity.type);
          
          return (
            <div key={activity.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className={`w-8 h-8 bg-${color}-100 rounded-full flex items-center justify-center`}>
                <ActivityIcon className={`text-${color}-600`} size={14} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                <p className="text-xs text-gray-500">
                  {formatDistance(new Date(activity.createdAt), new Date(), { addSuffix: true })}
                </p>
              </div>
              <p className="text-sm font-medium text-gray-900">{activity.amount}</p>
            </div>
          );
        })}
      </div>
      
      <Button variant="ghost" className="w-full mt-4 text-primary hover:bg-primary/5 transition-colors">
        View All Activity
      </Button>
    </Card>
  );
}
