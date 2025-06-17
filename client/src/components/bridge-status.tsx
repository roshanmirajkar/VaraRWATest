import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, Settings } from "lucide-react";
import type { Bridge } from "@shared/schema";

export default function BridgeStatus() {
  const { data: bridges, isLoading } = useQuery<Bridge[]>({
    queryKey: ["/api/bridges"],
  });

  if (isLoading) {
    return (
      <Card className="rounded-2xl p-6 shadow-xl border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Bridge Status</h3>
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'green';
      case 'deploying':
        return 'yellow';
      default:
        return 'blue';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return CheckCircle;
      case 'deploying':
        return Clock;
      default:
        return Settings;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'deploying':
        return 'Deploying';
      case 'configured':
        return 'Configured';
      default:
        return status;
    }
  };

  return (
    <Card className="rounded-2xl p-6 shadow-xl border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Bridge Status</h3>
      <div className="space-y-4">
        {bridges?.slice(0, 3).map((bridge) => {
          const color = getStatusColor(bridge.status);
          const StatusIcon = getStatusIcon(bridge.status);
          
          return (
            <div key={bridge.id} className={`flex items-center justify-between p-4 bg-${color}-50 border border-${color}-200 rounded-lg`}>
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 bg-${color}-500 rounded-full ${bridge.status === 'deploying' ? 'animate-pulse' : ''}`}></div>
                <div>
                  <p className="font-medium text-gray-900">{bridge.name}</p>
                  <p className="text-sm text-gray-600">{getStatusLabel(bridge.status)}</p>
                </div>
              </div>
              <StatusIcon className={`text-${color}-500`} size={20} />
            </div>
          );
        })}
      </div>
    </Card>
  );
}
