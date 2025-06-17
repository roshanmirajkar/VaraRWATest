import { Button } from "@/components/ui/button";
import { Box, Wallet } from "lucide-react";

export default function Navigation() {
  return (
    <nav className="bg-white/90 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 vara-gradient rounded-lg flex items-center justify-center">
                <Box className="text-white" size={16} />
              </div>
              <span className="text-xl font-bold vara-gradient-text">Vara Network</span>
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-700 hover:text-vara-purple transition-colors font-medium">Dashboard</a>
              <a href="#" className="text-gray-700 hover:text-vara-purple transition-colors font-medium">Bridge</a>
              <a href="#" className="text-gray-700 hover:text-vara-purple transition-colors font-medium">Assets</a>
              <a href="#" className="text-gray-700 hover:text-vara-purple transition-colors font-medium">Portfolio</a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Mainnet</span>
            </div>
            <Button className="vara-gradient text-white hover:shadow-lg transition-all duration-300 font-medium">
              <Wallet className="mr-2" size={16} />
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
