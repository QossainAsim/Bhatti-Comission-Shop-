import React from 'react';
import { Home, Package, ShoppingCart, TrendingUp, Users, Plus } from 'lucide-react';

const MobileLayout = ({ currentView, setCurrentView, onAddClick, children }) => {
  return (
    <div className="app-shell min-h-screen pb-24">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 bg-slate-950 text-white shadow-xl shadow-slate-950/20">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Commission Shop</h1>
              <p className="text-xs text-slate-300 mt-0.5">Commission Accounts</p>
            </div>
            {currentView === 'inventory' || currentView === 'sales' ? (
              <button
                onClick={onAddClick}
                className="rounded-2xl bg-emerald-400 p-3 text-slate-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-300"
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
      <nav className="fixed bottom-3 left-3 right-3 z-50 rounded-3xl border border-slate-200/80 bg-white/95 shadow-2xl shadow-slate-950/15 backdrop-blur">
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
        ? 'text-slate-950'
        : 'text-slate-400 hover:text-slate-600'
    }`}
  >
    {icon}
    <span className="text-xs font-semibold mt-1">{label}</span>
  </button>
);

export default MobileLayout;
