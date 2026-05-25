import React, { useState } from 'react';
import { X, Save, Package } from 'lucide-react';

const MobileAddPart = ({ categories, suppliers, onClose, onSave, editItem }) => {
  const [formData, setFormData] = useState(editItem || {
    partNumber: '',
    name: '',
    category: '',
    brand: '',
    purchasePrice: '',
    sellingPrice: '',
    stock: '',
    reorderLevel: '10',
    supplier: '',
    location: ''
  });

  const profitPerUnit = formData.sellingPrice && formData.purchasePrice 
    ? (parseFloat(formData.sellingPrice) - parseFloat(formData.purchasePrice)).toFixed(0)
    : '0';

  const handleSubmit = () => {
    // Validation
    if (!formData.partNumber || !formData.name || !formData.category || 
        !formData.purchasePrice || !formData.sellingPrice || !formData.stock) {
      alert(' Please fill in all required fields!');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <Package className="w-6 h-6" />
          <h2 className="text-lg font-bold">
            {editItem ? 'Edit Material' : 'Add New Material'}
          </h2>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Scrollable Form */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* Material Code */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Material Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.partNumber}
            onChange={(e) => setFormData({...formData, partNumber: e.target.value})}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
            placeholder="e.g., F-01"
          />
        </div>

        {/* Material Name */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Material Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
            placeholder="e.g., Fender Shield"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Grade */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Grade</label>
          <input
            type="text"
            value={formData.brand}
            onChange={(e) => setFormData({...formData, brand: e.target.value})}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
            placeholder="e.g., Crop / Quality Grade"
          />
        </div>

        {/* Prices Row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Purchase Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.purchasePrice}
              onChange={(e) => setFormData({...formData, purchasePrice: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
              placeholder="Cost"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Selling Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.sellingPrice}
              onChange={(e) => setFormData({...formData, sellingPrice: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
              placeholder="Price"
            />
          </div>
        </div>

        {/* Commission Banner */}
        {formData.purchasePrice && formData.sellingPrice && (
          <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
            <p className="text-center text-green-700 font-bold">
               Commission per Unit: <span className="text-xl">Rs.{profitPerUnit}</span>
            </p>
          </div>
        )}

        {/* Quantity Row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Quantity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({...formData, stock: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
              placeholder="Quantity"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Minimum Quantity Alert</label>
            <input
              type="number"
              value={formData.reorderLevel}
              onChange={(e) => setFormData({...formData, reorderLevel: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
              placeholder="Min"
            />
          </div>
        </div>

        {/* Party */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Party</label>
          <select
            value={formData.supplier}
            onChange={(e) => setFormData({...formData, supplier: e.target.value})}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
          >
            <option value="">Select Party</option>
            {suppliers.map(sup => (
              <option key={sup.id} value={sup.name}>{sup.name}</option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
            placeholder="e.g., Shelf A-12"
          />
        </div>

        {/* Bottom Padding for Button */}
        <div className="h-24"></div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="p-4 border-t bg-white">
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 shadow-lg active:scale-95 transition"
        >
          <Save className="w-5 h-5" />
          {editItem ? 'Update Material' : 'Add Material'}
        </button>
      </div>
    </div>
  );
};

export default MobileAddPart;
