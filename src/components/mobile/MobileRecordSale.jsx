import React, { useState, useRef, useEffect } from 'react';
import { X, Save, ShoppingCart, Search, Package } from 'lucide-react';

const MobileRecordSale = ({ parts, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    partNumber: '',
    quantity: '',
    sellingPrice: '',
    customer: '',
    soldBy: 'Shop Manager'
  });
  const [selectedPart, setSelectedPart] = useState(null);
  const [partSearch, setPartSearch] = useState('');
  const [showPartDropdown, setShowPartDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Filter parts
  const filteredMaterials = parts.filter(p => 
    p.stock > 0 && (
      p.name?.toLowerCase().includes(partSearch.toLowerCase()) ||
      p.partNumber?.toLowerCase().includes(partSearch.toLowerCase())
    )
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowPartDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePartSelect = (part) => {
    setSelectedPart(part);
    setPartSearch(`${part.partNumber} - ${part.name}`);
    setFormData({
      ...formData, 
      partNumber: part.partNumber, 
      sellingPrice: part.sellingPrice
    });
    setShowPartDropdown(false);
  };

  const profitPerUnit = selectedPart && formData.sellingPrice 
    ? parseFloat(formData.sellingPrice) - selectedPart.purchasePrice 
    : 0;
  const totalCommission = profitPerUnit * (parseInt(formData.quantity) || 0);
  const totalAmount = (parseFloat(formData.sellingPrice) || 0) * (parseInt(formData.quantity) || 0);

  const handleSubmit = () => {
    if (!selectedPart) {
      alert(' Please select a part!');
      return;
    }
    if (!formData.quantity || formData.quantity <= 0) {
      alert(' Please enter quantity!');
      return;
    }
    if (parseInt(formData.quantity) > selectedPart.stock) {
      alert(` Insufficient quantity! Available: ${selectedPart.stock}`);
      return;
    }
    if (!formData.customer) {
      alert(' Please enter customer name!');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <ShoppingCart className="w-6 h-6" />
          <h2 className="text-lg font-bold">Record New Material Sale</h2>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Scrollable Form */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* Search Part */}
        <div className="relative" ref={dropdownRef}>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Select Part <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none z-10" />
            <input
              type="text"
              value={partSearch}
              onChange={(e) => {
                setPartSearch(e.target.value);
                setShowPartDropdown(true);
                setSelectedPart(null);
              }}
              onFocus={() => setShowPartDropdown(true)}
              placeholder="Search by name or material code..."
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none"
              autoComplete="off"
            />
          </div>

          {/* Dropdown */}
          {showPartDropdown && (
            <div 
              className="absolute z-50 w-full mt-2 bg-white border-2 border-green-300 rounded-lg shadow-2xl max-h-60 overflow-y-auto"
            >
              {filteredMaterials.length > 0 ? (
                filteredMaterials.map(part => (
                  <button
                    key={part.id}
                    type="button"
                    onClick={() => handlePartSelect(part)}
                    className="w-full text-left px-4 py-3 hover:bg-green-50 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-800 truncate">{part.name}</p>
                        <p className="text-sm text-gray-500 truncate">#{part.partNumber}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-bold text-green-600">Quantity: {part.stock}</p>
                        <p className="text-xs text-gray-600">Rs.{part.sellingPrice.toFixed(0)}</p>
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-gray-400">
                  <Package className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p className="font-semibold">No materials found</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Selected Part Card */}
        {selectedPart && (
          <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-xs text-green-700 font-semibold mb-1"> Selected:</p>
                <p className="font-bold text-gray-800 text-lg">{selectedPart.name}</p>
                <p className="text-sm text-gray-600">#{selectedPart.partNumber}</p>
              </div>
              <button
                onClick={() => {
                  setSelectedPart(null);
                  setPartSearch('');
                  setFormData({...formData, partNumber: '', sellingPrice: ''});
                }}
                className="text-red-600 p-2 hover:bg-red-50 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-white/70 p-2 rounded">
                <p className="text-xs text-gray-600">Available:</p>
                <p className="font-bold text-lg">{selectedPart.stock}</p>
              </div>
              <div className="bg-white/70 p-2 rounded">
                <p className="text-xs text-gray-600">Price:</p>
                <p className="font-bold text-green-600">Rs.{selectedPart.sellingPrice.toFixed(0)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Quantity */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Quantity <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min="1"
            max={selectedPart?.stock || 999}
            value={formData.quantity}
            onChange={(e) => setFormData({...formData, quantity: e.target.value})}
            disabled={!selectedPart}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none disabled:bg-gray-100"
            placeholder="Enter quantity"
          />
          {selectedPart && (
            <p className="text-xs text-gray-500 mt-1">Max: {selectedPart.stock} units</p>
          )}
        </div>

        {/* Selling Price */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Selling Rate (Rs.) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.sellingPrice}
            onChange={(e) => setFormData({...formData, sellingPrice: e.target.value})}
            disabled={!selectedPart}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none disabled:bg-gray-100"
            placeholder="Price per unit"
          />
          <p className="text-xs text-gray-500 mt-1">
            Default: Rs.{selectedPart?.sellingPrice.toFixed(0) || '0'}
          </p>
        </div>

        {/* Party */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Party Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.customer}
            onChange={(e) => setFormData({...formData, customer: e.target.value})}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none"
            placeholder="Enter party name"
          />
        </div>

        {/* Handled By */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Handled By <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.soldBy}
            onChange={(e) => setFormData({...formData, soldBy: e.target.value})}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none"
          >
            <option value="Shop Manager">Shop Manager</option>
            <option value="Cashier">Cashier</option>
            <option value="Accountant">Accountant</option>
          </select>
        </div>

        {/* Summary */}
        {formData.quantity && selectedPart && formData.sellingPrice && (
          <div className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-green-300 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-3 text-center"> Deal Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Total Deposit / Credit Amount:</span>
                <span className="text-xl font-bold text-blue-600">Rs.{totalAmount.toFixed(0)}</span>
              </div>
              <div className="flex justify-between bg-green-200 px-3 py-2 rounded-lg">
                <span className="text-green-800 font-bold">Total Commission:</span>
                <span className="text-xl font-bold text-green-700">Rs.{totalCommission.toFixed(0)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Padding */}
        <div className="h-24"></div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="p-4 border-t bg-white">
        <button
          onClick={handleSubmit}
          disabled={!selectedPart}
          className={`w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 shadow-lg active:scale-95 transition ${
            selectedPart
              ? 'bg-gradient-to-r from-green-600 to-green-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Save className="w-5 h-5" />
          Record Deal
        </button>
      </div>
    </div>
  );
};

export default MobileRecordSale;
