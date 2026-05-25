import React from 'react';
import { Receipt, ShoppingCart, TrendingUp, DollarSign, Trash2 } from 'lucide-react';
import MobileCard from './MobileCard';

const MobileSales = ({ 
  sales, 
  totalRevenue, 
  totalCommission,
  todayRevenue,
  todayCommission,
  onViewReceipt,
  onDeleteSale  //  NEW PROP
}) => {
  const todaySales = sales.filter(s => s.date === new Date().toISOString().split('T')[0]);

  return (
    <div className="space-y-4">
      {/* Today's Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          icon={<ShoppingCart className="w-5 h-5" />}
          label="Today's Deals"
          value={todaySales.length}
          color="blue"
        />
        <StatCard
          icon={<DollarSign className="w-5 h-5" />}
          label="Today's Cash Book Amount"
          value={`Rs.${(todayRevenue / 1000).toFixed(1)}k`}
          color="green"
        />
        <StatCard
          icon={<TrendingUp className="w-5 h-5" />}
          label="Today's Commission"
          value={`Rs.${(todayCommission / 1000).toFixed(1)}k`}
          color="purple"
        />
        <StatCard
          icon={<Receipt className="w-5 h-5" />}
          label="Total Deals"
          value={sales.length}
          color="orange"
        />
      </div>

      {/* All Time Summary */}
      <MobileCard className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
        <h3 className="font-bold text-gray-800 mb-3">All Time Performance</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Cash Book Deposit / Credit Amount:</span>
            <span className="font-bold text-blue-600">Rs.{totalRevenue.toFixed(0)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Commission:</span>
            <span className="font-bold text-green-600">Rs.{totalCommission.toFixed(0)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Commission Margin:</span>
            <span className="font-bold text-purple-600">
              {totalRevenue > 0 ? ((totalCommission / totalRevenue) * 100).toFixed(1) : '0'}%
            </span>
          </div>
        </div>
      </MobileCard>

      {/* Sales List Header */}
      <div className="flex justify-between items-center px-1">
        <h3 className="font-bold text-gray-800">Recent Material Sales</h3>
        <span className="text-sm text-gray-500">{sales.length} total</span>
      </div>

      {/* Sales List */}
      <div className="space-y-3">
        {sales.slice().reverse().map(sale => (
          <SaleCard 
            key={sale.id} 
            sale={sale} 
            onViewReceipt={onViewReceipt}
            onDeleteSale={onDeleteSale}  //  PASS DELETE HANDLER
          />
        ))}
        {sales.length === 0 && (
          <div className="text-center py-16">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400 font-semibold">No sales yet</p>
            <p className="text-sm text-gray-400 mt-1">Record your first sale!</p>
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200'
  };

  return (
    <MobileCard className={`${colorClasses[color]} border`}>
      <div className="flex flex-col items-center text-center">
        {icon}
        <p className="text-2xl font-bold mt-2">{value}</p>
        <p className="text-xs font-semibold mt-1">{label}</p>
      </div>
    </MobileCard>
  );
};

const SaleCard = ({ sale, onViewReceipt, onDeleteSale }) => {
  const isToday = sale.date === new Date().toISOString().split('T')[0];

  const handleDelete = () => {
    if (window.confirm(`Delete this sale?\n\nParty: ${sale.customer}\nMaterial: ${sale.partName}\nDeposit / Credit Amount: Rs.${sale.total.toFixed(0)}\n\n This cannot be undone!`)) {
      onDeleteSale(sale.id);
    }
  };

  return (
    <MobileCard className={isToday ? 'border-2 border-green-200 bg-green-50' : ''}>
      {/* Date & Time Badge */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-sm font-semibold text-gray-800">{sale.date}</p>
          <p className="text-xs text-gray-500">{sale.time}</p>
        </div>
        {isToday && (
          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            Today
          </span>
        )}
      </div>

      {/* Part Info */}
      <div className="mb-3 pb-3 border-b border-gray-100">
        <h4 className="font-bold text-gray-800">{sale.partName}</h4>
        <p className="text-sm text-gray-500">#{sale.partNumber}</p>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <p className="text-xs text-gray-500">Party</p>
          <p className="text-sm font-semibold text-gray-800">{sale.customer}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Handled By</p>
          <p className="text-sm font-semibold text-gray-800">{sale.soldBy.split(' ')[0]}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Quantity</p>
          <p className="text-sm font-semibold text-gray-800">{sale.quantity} units</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Unit Price</p>
          <p className="text-sm font-semibold text-gray-800">Rs.{sale.sellingPrice.toFixed(0)}</p>
        </div>
      </div>

      {/* Total & Commission */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-3 mb-3">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-600">Total Deposit / Credit</p>
            <p className="text-xl font-bold text-blue-600">Rs.{sale.total.toFixed(0)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-600">Commission</p>
            <p className="text-xl font-bold text-green-600">Rs.{sale.profit.toFixed(0)}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onViewReceipt(sale)}
          className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-purple-700 transition active:scale-95"
        >
          <Receipt className="w-5 h-5" />
          Receipt
        </button>
        
        {/*  NEW DELETE BUTTON */}
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-red-700 transition active:scale-95"
          title="Delete Sale"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </MobileCard>
  );
};

export default MobileSales;

