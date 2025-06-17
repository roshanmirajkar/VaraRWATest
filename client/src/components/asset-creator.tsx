import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { CloudUpload, Plus } from "lucide-react";
import type { AssetFormData } from "@/lib/types";

export default function AssetCreator() {
  const [formData, setFormData] = useState<AssetFormData>({
    name: "",
    type: "real_estate",
    description: "",
    value: "",
    tokenSymbol: "",
    totalSupply: "",
    decimals: 18,
    owner: "user1",
    status: "active"
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createAssetMutation = useMutation({
    mutationFn: async (data: AssetFormData) => {
      const response = await apiRequest("POST", "/api/assets", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Asset Created Successfully",
        description: "Your RWA token has been created and is ready for trading.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/assets"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
      queryClient.invalidateQueries({ queryKey: ["/api/activities"] });
      setFormData({
        name: "",
        type: "real_estate",
        description: "",
        value: "",
        tokenSymbol: "",
        totalSupply: "",
        decimals: 18,
        owner: "user1",
        status: "active"
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create asset. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.value || !formData.tokenSymbol || !formData.totalSupply) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    createAssetMutation.mutate(formData);
  };

  return (
    <Card className="rounded-2xl p-8 shadow-xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Deploy Program on Vara Network</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Program Upload Zone */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center mb-6 hover:border-primary transition-colors cursor-pointer">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <CloudUpload className="text-gray-400" size={24} />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900">Upload program binary (.wasm)</p>
              <p className="text-gray-600">or drag and drop your compiled program</p>
              <p className="text-sm text-gray-500 mt-2">Supports .wasm files up to 10MB</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label className="text-sm font-semibold text-gray-700 mb-2">Program Type</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="real_estate">RWA - Real Estate</SelectItem>
                <SelectItem value="commodities">RWA - Commodities</SelectItem>
                <SelectItem value="art">RWA - Art & Collectibles</SelectItem>
                <SelectItem value="bonds">RWA - Bonds</SelectItem>
                <SelectItem value="other">Smart Contract</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm font-semibold text-gray-700 mb-2">Gas Limit</Label>
            <Input 
              type="number" 
              placeholder="1000000"
              value={formData.value}
              onChange={(e) => setFormData({...formData, value: e.target.value})}
              required
            />
          </div>
        </div>
        
        <div className="mb-6">
          <Label className="text-sm font-semibold text-gray-700 mb-2">Program Name</Label>
          <Input 
            placeholder="Enter program name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>
        
        <div className="mb-6">
          <Label className="text-sm font-semibold text-gray-700 mb-2">Program Description</Label>
          <Textarea 
            rows={3} 
            placeholder="Describe your program functionality..."
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <Label className="text-sm font-semibold text-gray-700 mb-2">Program ID</Label>
            <Input 
              placeholder="Auto-generated"
              value={formData.tokenSymbol}
              onChange={(e) => setFormData({...formData, tokenSymbol: e.target.value.toUpperCase()})}
              disabled
            />
          </div>
          <div>
            <Label className="text-sm font-semibold text-gray-700 mb-2">Initial Value</Label>
            <Input 
              type="number"
              placeholder="0"
              value={formData.totalSupply}
              onChange={(e) => setFormData({...formData, totalSupply: e.target.value})}
            />
          </div>
          <div>
            <Label className="text-sm font-semibold text-gray-700 mb-2">Network</Label>
            <Select value="vara" disabled>
              <SelectTrigger>
                <SelectValue placeholder="Vara Network" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vara">Vara Network</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button 
          type="submit"
          className="w-full vara-gradient text-white py-4 font-medium hover:shadow-lg transition-all duration-300"
          disabled={createAssetMutation.isPending}
        >
          <Plus className="mr-2" size={16} />
          {createAssetMutation.isPending ? "Creating..." : "Create RWA Token"}
        </Button>
      </form>
    </Card>
  );
}
