// supabaseHelpers.js
import { supabase } from './supabaseClient';

// ============================================
// CATEGORIES
// ============================================
export const fetchCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  return data;
};

// ============================================
// PARTS (INVENTORY)
// ============================================
export const fetchParts = async () => {
  const { data, error } = await supabase
    .from('parts')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching parts:', error);
    return [];
  }
  
  // Transform snake_case to camelCase for consistency with your app
  return data.map(part => ({
    id: part.id,
    partNumber: part.part_number,
    name: part.name,
    category: part.category,
    brand: part.brand,
    purchasePrice: parseFloat(part.purchase_price),
    sellingPrice: parseFloat(part.selling_price),
    stock: part.stock,
    reorderLevel: part.reorder_level,
    supplier: part.supplier,
    location: part.location
  }));
};

export const addPart = async (partData) => {
  console.log(' Received partData:', partData);
  console.log(' Formatted for Supabase:', {
    part_number: partData.partNumber,
    name: partData.name,
    category: partData.category,
    brand: partData.brand,
    purchase_price: partData.purchasePrice,
    selling_price: partData.sellingPrice,
    stock: partData.stock,
    reorder_level: partData.reorderLevel,
    supplier: partData.supplier,
    location: partData.location
  });

  const { data, error } = await supabase
    .from('parts')
    .insert([{
      part_number: partData.partNumber,
      name: partData.name,
      category: partData.category,
      brand: partData.brand || '',
      purchase_price: partData.purchasePrice,
      selling_price: partData.sellingPrice,
      stock: partData.stock,
      reorder_level: partData.reorderLevel,
      supplier: partData.supplier || '',
      location: partData.location || ''
    }])
    .select()
    .single();
  
  if (error) {
    console.error(' Supabase error:', error);
    throw error;
  }
  
  console.log(' Supabase returned:', data);
  
  return {
    id: data.id,
    partNumber: data.part_number,
    name: data.name,
    category: data.category,
    brand: data.brand,
    purchasePrice: parseFloat(data.purchase_price),
    sellingPrice: parseFloat(data.selling_price),
    stock: data.stock,
    reorderLevel: data.reorder_level,
    supplier: data.supplier,
    location: data.location
  };
};

export const updatePart = async (id, partData) => {
  console.log(' updatePart called with:', { id, partData });
  
  const updatePayload = {
    part_number: partData.partNumber,
    name: partData.name,
    category: partData.category,
    brand: partData.brand || '',
    purchase_price: parseFloat(partData.purchasePrice),
    selling_price: parseFloat(partData.sellingPrice),
    stock: parseInt(partData.stock), //  ENSURE INTEGER
    reorder_level: parseInt(partData.reorderLevel),
    supplier: partData.supplier || '',
    location: partData.location || ''
  };
  
  console.log(' Sending to Supabase:', updatePayload);
  
  const { data, error } = await supabase
    .from('parts')
    .update(updatePayload)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error(' Supabase update failed:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    console.error('Error details:', error.details);
    throw error;
  }
  
  console.log(' Supabase returned updated data:', data);
  
  const transformedData = {
    id: data.id,
    partNumber: data.part_number,
    name: data.name,
    category: data.category,
    brand: data.brand,
    purchasePrice: parseFloat(data.purchase_price),
    sellingPrice: parseFloat(data.selling_price),
    stock: parseInt(data.stock), //  ENSURE INTEGER
    reorderLevel: parseInt(data.reorder_level),
    supplier: data.supplier,
    location: data.location
  };
  
  console.log(' Transformed data being returned:', transformedData);
  return transformedData;
};

export const deletePart = async (id) => {
  const { error } = await supabase
    .from('parts')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting part:', error);
    throw error;
  }
};

// ============================================
// SALES
// ============================================
export const fetchSales = async () => {
  const { data, error } = await supabase
    .from('sales')
    .select('*')
    .order('date', { ascending: false })
    .order('time', { ascending: false });
  
  if (error) {
    console.error('Error fetching sales:', error);
    return [];
  }
  
  return data.map(sale => ({
    id: sale.id,
    date: sale.date,
    time: sale.time,
    partNumber: sale.part_number,
    partName: sale.part_name,
    quantity: sale.quantity,
    purchasePrice: parseFloat(sale.purchase_price),
    sellingPrice: parseFloat(sale.selling_price),
    total: parseFloat(sale.total),
    profit: parseFloat(sale.profit),
    customer: sale.customer,
    soldBy: sale.sold_by
  }));
};

export const addSale = async (saleData) => {
  const { data, error } = await supabase
    .from('sales')
    .insert([{
      date: saleData.date,
      time: saleData.time,
      part_number: saleData.partNumber,
      part_name: saleData.partName,
      quantity: saleData.quantity,
      purchase_price: saleData.purchasePrice,
      selling_price: saleData.sellingPrice,
      total: saleData.total,
      profit: saleData.profit,
      customer: saleData.customer,
      sold_by: saleData.soldBy
    }])
    .select()
    .single();
  
  if (error) {
    console.error('Error adding sale:', error);
    throw error;
  }
  
  return {
    id: data.id,
    date: data.date,
    time: data.time,
    partNumber: data.part_number,
    partName: data.part_name,
    quantity: data.quantity,
    purchasePrice: parseFloat(data.purchase_price),
    sellingPrice: parseFloat(data.selling_price),
    total: parseFloat(data.total),
    profit: parseFloat(data.profit),
    customer: data.customer,
    soldBy: data.sold_by
  };
};

export const deleteSale = async (id) => {
  const { error } = await supabase
    .from('sales')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting sale:', error);
    throw error;
  }
};

// ============================================
// SUPPLIERS
// ============================================
export const fetchSuppliers = async () => {
  const { data, error } = await supabase
    .from('suppliers')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching suppliers:', error);
    return [];
  }
  return data;
};

export const addSupplier = async (supplierData) => {
  const { data, error } = await supabase
    .from('suppliers')
    .insert([supplierData])
    .select()
    .single();
  
  if (error) {
    console.error('Error adding supplier:', error);
    throw error;
  }
  return data;
};

export const updateSupplier = async (id, supplierData) => {
  const { data, error } = await supabase
    .from('suppliers')
    .update(supplierData)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating supplier:', error);
    throw error;
  }
  return data;
};

export const deleteSupplier = async (id) => {
  const { error } = await supabase
    .from('suppliers')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting supplier:', error);
    throw error;
  }
};