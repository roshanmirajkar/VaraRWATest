import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Zap, Shield, Coins } from "lucide-react";
import type { BridgeFormData } from "@/lib/types";

export default function BridgeWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<BridgeFormData>({
    name: "",
    sourceChain: "Vara Network",
    targetChain: "Ethereum",
    bridgeType: "fast",
    owner: "user1",
    status: "configured"
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createBridgeMutation = useMutation({
    mutationFn: async (data: BridgeFormData) => {
      const response = await apiRequest("POST", "/api/bridges", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Bridge Created Successfully",
        description: "Your bridge is now being deployed.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/bridges"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
      setStep(1);
      setFormData({
        name: "",
        sourceChain: "Vara Network",
        targetChain: "Ethereum",
        bridgeType: "fast",
        owner: "user1",
        status: "configured"
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create bridge. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = () => {
    if (!formData.name) {
      toast({
        title: "Validation Error",
        description: "Please enter a bridge name.",
        variant: "destructive",
      });
      return;
    }
    createBridgeMutation.mutate(formData);
  };

  const bridgeTypes = [
    { id: "fast", name: "Fast Bridge", icon: Zap, description: "Quick transfers" },
    { id: "secure", name: "Secure Bridge", icon: Shield, description: "Maximum security" },
    { id: "economic", name: "Economic Bridge", icon: Coins, description: "Low fees" }
  ];

  return (
    <Card className="rounded-2xl p-8 shadow-xl border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Deploy New Bridge</h2>
        <div className="flex items-center space-x-2">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= stepNumber ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {stepNumber}
              </div>
              {stepNumber < 3 && <div className="w-8 h-1 bg-gray-200 rounded mx-2"></div>}
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-6">
        {step === 1 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-2">Source Chain</Label>
                <Select value={formData.sourceChain} onValueChange={(value) => setFormData({...formData, sourceChain: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Vara Network">Vara Network</SelectItem>
                    <SelectItem value="Ethereum">Ethereum</SelectItem>
                    <SelectItem value="Polygon">Polygon</SelectItem>
                    <SelectItem value="Binance Smart Chain">Binance Smart Chain</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-2">Target Chain</Label>
                <Select value={formData.targetChain} onValueChange={(value) => setFormData({...formData, targetChain: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ethereum">Ethereum</SelectItem>
                    <SelectItem value="Polygon">Polygon</SelectItem>
                    <SelectItem value="Vara Network">Vara Network</SelectItem>
                    <SelectItem value="Arbitrum">Arbitrum</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2">Bridge Name</Label>
              <Input 
                placeholder="Enter bridge name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </>
        )}

        {step === 2 && (
          <div>
            <Label className="block text-sm font-semibold text-gray-700 mb-4">Bridge Type</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {bridgeTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <div
                    key={type.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                      formData.bridgeType === type.id
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-primary'
                    }`}
                    onClick={() => setFormData({...formData, bridgeType: type.id})}
                  >
                    <div className="text-center">
                      <IconComponent className={`mx-auto mb-2 ${
                        formData.bridgeType === type.id ? 'text-primary' : 'text-gray-400'
                      }`} size={24} />
                      <p className="font-medium text-gray-900">{type.name}</p>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 vara-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Deploy</h3>
            <p className="text-gray-600 mb-4">
              Your {formData.bridgeType} bridge from {formData.sourceChain} to {formData.targetChain} is ready for deployment.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 text-left">
              <h4 className="font-semibold mb-2">Bridge Summary:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Name: {formData.name}</li>
                <li>• Type: {bridgeTypes.find(t => t.id === formData.bridgeType)?.name}</li>
                <li>• Route: {formData.sourceChain} → {formData.targetChain}</li>
                <li>• Deployment Fee: $50</li>
              </ul>
            </div>
          </div>
        )}
        
        <div className="flex justify-between pt-4">
          <Button 
            variant="outline"
            onClick={() => step > 1 ? setStep(step - 1) : null}
            disabled={step === 1}
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </Button>
          {step < 3 ? (
            <Button 
              className="vara-gradient"
              onClick={() => setStep(step + 1)}
              disabled={step === 1 && !formData.name}
            >
              Continue Setup
            </Button>
          ) : (
            <Button 
              className="vara-gradient"
              onClick={handleSubmit}
              disabled={createBridgeMutation.isPending}
            >
              {createBridgeMutation.isPending ? "Deploying..." : "Deploy Bridge"}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
