import React from 'react';
import { Home, Package, ShoppingCart, TrendingUp, Users, Plus } from 'lucide-react';

const MobileLayout = ({ currentView, setCurrentView, onAddClick, children }) => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Mobile Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white sticky top-0 z-40 shadow-lg">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Commission Shop</h1>
              <p className="text-xs text-blue-100 mt-0.5">Commission Accounts</p>
            </div>
            {currentView === 'inventory' || currentView === 'sales' ? (
              <button
                onClick={onAddClick}
                className="bg-white text-blue-600 rounded-full p-3 shadow-lg hover:bg-blue-50 transition"
              >
                <Plus className="w-6 h-6" />
              </button>
            ) : null}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-4">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex justify-around py-2">
          <NavButton
            icon={<Home className="w-5 h-5" />}
            label="Home"
            active={currentView === 'dashboard'}
            onClick={() => setCurrentView('dashboard')}
          />
          <NavButton
            icon={<Package className="w-5 h-5" />}
            label="Materials"
            active={currentView === 'inventory'}
            onClick={() => setCurrentView('inventory')}
          />
          <NavButton
            icon={<ShoppingCart className="w-5 h-5" />}
            label="Sales"
            active={currentView === 'sales'}
            onClick={() => setCurrentView('sales')}
          />
          <NavButton
            icon={<TrendingUp className="w-5 h-5" />}
            label="Commission"
            active={currentView === 'profit'}
            onClick={() => setCurrentView('profit')}
          />
          <NavButton
            icon={<Users className="w-5 h-5" />}
            label="More"
            active={currentView === 'suppliers' || currentView === 'reports'}
            onClick={() => setCurrentView('suppliers')}
          />
        </div>
      </nav>
    </div>
  );
};

const NavButton = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center px-4 py-2 transition ${
      active 
        ? 'text-blue-600' 
        : 'text-gray-400 hover:text-gray-600'
    }`}
  >
    {icon}
    <span className="text-xs font-semibold mt-1">{label}</span>
  </button>
);

export default MobileLayout;