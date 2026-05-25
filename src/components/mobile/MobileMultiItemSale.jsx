import React, { useState, useRef, useEffect } from 'react';
import { X, Save, ShoppingCart, Search, Package, Trash2, Plus } from 'lucide-react';

const MobileMultiItemSale = ({ parts, onClose, onSave }) => {
  const [cartItems, setCartItems] = useState([]);
  const [partSearch, setPartSearch] = useState('');
  const [showPartDropdown, setShowPartDropdown] = useState(false);
  const [customer, setCustomer] = useState('');
  const [soldBy, setSoldBy] = useState('Shop Manager');
  const dropdownRef = useRef(null);

  const filteredMaterials = parts.filter(p => 
    p.stock > 0 && 
    !cartItems.find(item => item.partNumber === p.partNumber) &&
    (p.name?.toLowerCase().includes(partSearch.toLowerCase()) ||
     p.partNumber?.toLowerCase().includes(partSearch.toLowerCase()))
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowPartDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const addToCart = (part) => {
    setCartItems([...cartItems, {
      partNumber: part.partNumber,
      partName: part.name,
      purchasePrice: part.purchasePrice,
      sellingPrice: part.sellingPrice,
      quantity: 1,
      maxQuantity: part.stock
    }]);
    setPartSearch('');
    setShowPartDropdown(false);
  };

  const updateQuantity = (index, quantity) => {
    const updated = [...cartItems];
    const qty = parseInt(quantity) || 0;
    if (qty > updated[index].maxQuantity) {
      alert(`Max quantity: ${updated[index].maxQuantity}`);
      return;
    }
    updated[index].quantity = qty;
    setCartItems(updated);
  };

  const updatePrice = (index, price) => {
    const updated = [...cartItems];
    updated[index].sellingPrice = parseFloat(price) || 0;
    setCartItems(updated);
  };

  const removeItem = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const getTotals = () => {
    const total = cartItems.reduce((sum, item) => 
      sum + (item.quantity * item.sellingPrice), 0
    );
    const profit = cartItems.reduce((sum, item) => 
      sum + (item.quantity * (item.sellingPrice - item.purchasePrice)), 0
    );
    return { total, profit };
  };

  const handleSubmit = () => {
    if (cartItems.length === 0) {
      alert(' Add at least one item!');
      return;
    }
    if (cartItems.some(item => item.quantity <= 0)) {
      alert(' All items need quantity > 0');
      return;
    }
    if (!customer) {
      alert(' Enter party name!');
      return;
    }
    
    onSave({ items: cartItems, customer, soldBy });
  };

  const { total, profit } = getTotals();

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 flex items-center justify-between shadow-lg flex-shrink-0">
        <div className="flex items-center gap-3">
          <ShoppingCart className="w-6 h-6" />
          <div>
            <h2 className="text-lg font-bold">New Material Sale</h2>
            <p className="text-xs text-green-100">Add multiple materials</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* Search Materials */}
        <div className="relative" ref={dropdownRef}>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Add Materials <Plus className="w-4 h-4 inline" />
          </label>
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none z-10" />
            <input
              type="text"
              value={partSearch}
              onChange={(e) => {
                setPartSearch(e.target.value);
                setShowPartDropdown(true);
              }}
              onFocus={() => setShowPartDropdown(true)}
              placeholder="Search materials..."
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              autoComplete="off"
            />
          </div>

          {showPartDropdown && (
            <div className="absolute z-50 w-full mt-2 bg-white border-2 border-green-300 rounded-lg shadow-2xl max-h-60 overflow-y-auto">
              {filteredMaterials.length > 0 ? (
                filteredMaterials.map(part => (
                  <button
                    key={part.id}
                    onClick={() => addToCart(part)}
                    className="w-full text-left px-4 py-3 hover:bg-green-50 border-b last:border-0"
                  >
                    <div className="flex justify-between">
                      <div className="flex-1">
                        <p className="font-bold text-gray-800 text-sm">{part.name}</p>
                        <p className="text-xs text-gray-500">#{part.partNumber}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-green-600">Quantity: {part.stock}</p>
                        <p className="text-xs text-gray-600">Rs.{part.sellingPrice.toFixed(0)}</p>
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-8 text-center text-gray-400">
                  <Package className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No materials found</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Cart Items */}
        {cartItems.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
            </h3>
            
            {cartItems.map((item, index) => (
              <div key={index} className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">{item.partName}</p>
                    <p className="text-xs text-gray-500">#{item.partNumber}</p>
                  </div>
                  <button
                    onClick={() => removeItem(index)}
                    className="text-red-600 p-2 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="text-xs text-gray-600 font-semibold block mb-1">Qty</label>
                      <input
  type="text"
  inputMode="numeric"
  pattern="[0-9]*"
  value={item.quantity}
  onChange={(e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value === '' || parseInt(value) <= item.maxQuantity) {
      updateQuantity(index, value || '0');
    }
  }}
  onBlur={(e) => {
    if (e.target.value === '' || e.target.value === '0') {
      updateQuantity(index, '1');
    }
  }}
  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center font-bold text-lg"
/>
                      <p className="text-xs text-gray-500 mt-1">Max: {item.maxQuantity}</p>
                    </div>
                    
                    <div className="flex-1">
                      <label className="text-xs text-gray-600 font-semibold block mb-1">Price</label>
                      <input
  type="text"
  inputMode="decimal"
  value={item.sellingPrice}
  onChange={(e) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    const parts = value.split('.');
    if (parts.length <= 2) {
      updatePrice(index, value);
    }
  }}
  onBlur={(e) => {
    const val = e.target.value;
    if (val === '' || val === '0' || val === '.') {
      updatePrice(index, '0');
    } else if (!val.includes('.')) {
      // If no decimal, leave as is
      updatePrice(index, val);
    }
  }}
  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center font-bold"
/>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-2 flex justify-between">
                    <span className="text-sm text-gray-600">Subtotal:</span>
                    <span className="font-bold text-blue-600">Rs.{(item.quantity * item.sellingPrice).toFixed(0)}</span>
                  </div>
                  
                  <div className="text-xs text-green-600 text-center">
                    Commission: Rs.{(item.quantity * (item.sellingPrice - item.purchasePrice)).toFixed(0)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Party */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Party Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Enter party name"
          />
        </div>

        {/* Handled By */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Handled By <span className="text-red-500">*</span>
          </label>
          <select
            value={soldBy}
            onChange={(e) => setSoldBy(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
          >
            <option value="Shop Manager">Shop Manager</option>
            <option value="Cashier">Cashier</option>
            <option value="Accountant">Accountant</option>
          </select>
        </div>

        {/* Summary */}
        {cartItems.length > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-green-300 rounded-lg p-4 sticky top-0">
            <h4 className="font-bold text-gray-800 mb-3 text-center"> Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-700">Total Units:</span>
                <span className="font-bold">{cartItems.reduce((s, i) => s + i.quantity, 0)}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="text-gray-700 font-bold">Deposit / Credit Amount:</span>
                <span className="font-bold text-blue-600">Rs.{total.toFixed(0)}</span>
              </div>
              <div className="flex justify-between bg-green-200 px-3 py-2 rounded-lg">
                <span className="text-green-800 font-bold">Commission:</span>
                <span className="text-lg font-bold text-green-700">Rs.{profit.toFixed(0)}</span>
              </div>
            </div>
          </div>
        )}

        <div className="h-24"></div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="p-4 border-t bg-white flex-shrink-0">
        <button
          onClick={handleSubmit}
          disabled={cartItems.length === 0}
          className={`w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 shadow-lg ${
            cartItems.length > 0
              ? 'bg-gradient-to-r from-green-600 to-green-700 text-white active:scale-95'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Save className="w-5 h-5" />
          Record Deal ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
        </button>
      </div>
    </div>
  );
};

export default MobileMultiItemSale;
