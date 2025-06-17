import Navigation from "@/components/navigation";
import StatsBar from "@/components/stats-bar";
import BridgeWizard from "@/components/bridge-wizard";
import AssetCreator from "@/components/asset-creator";
import PortfolioOverview from "@/components/portfolio-overview";
import BridgeStatus from "@/components/bridge-status";
import RecentActivity from "@/components/recent-activity";
import MarketOverview from "@/components/market-overview";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-vara-light via-blue-50 to-purple-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="vara-gradient-text">RWA Bridge Maker</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tokenize real-world assets and deploy cross-chain bridges with ease. Build the future of decentralized finance on Vara Network.
          </p>
        </div>

        <StatsBar />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Actions */}
          <div className="lg:col-span-2 space-y-8">
            <BridgeWizard />
            <AssetCreator />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <PortfolioOverview />
            <BridgeStatus />
            <RecentActivity />
          </div>
        </div>

        <MarketOverview />

        {/* Footer */}
        <footer className="bg-gray-800 text-white mt-16 rounded-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 vara-gradient rounded-lg flex items-center justify-center">
                    <i className="fas fa-cube text-white text-sm"></i>
                  </div>
                  <span className="text-xl font-bold">Vara Network</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Building the future of decentralized real-world asset tokenization on the Vara blockchain.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Platform</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Dashboard</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Bridge Maker</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Asset Tokenization</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Portfolio</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Resources</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Community</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
              <p>&copy; 2024 Vara Network. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
