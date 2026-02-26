import React from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Eye,
  MoreHorizontal
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const ProductManagement = () => {
  const products = [
    { id: 1, name: "Premium Wellness Pack", category: "Wellness", price: "₹1,499", stock: 124, status: "In Stock" },
    { id: 2, name: "Organic Protein Blend", category: "Nutrition", price: "₹2,499", stock: 89, status: "In Stock" },
    { id: 3, name: "Essential Oils Set", category: "Personal Care", price: "₹899", stock: 12, status: "Low Stock" },
    { id: 4, name: "Smart Fitness Tracker", category: "Health", price: "₹3,999", stock: 0, status: "Out of Stock" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Product Inventory</h1>
          <p className="text-slate-500">Manage your eCommerce catalog and pricing.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-xl h-11">
          <Plus className="mr-2 w-4 h-4" /> Add New Product
        </Button>
      </div>

      <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
        <CardHeader className="border-b border-slate-50 p-6">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input placeholder="Search products..." className="pl-10 h-11 rounded-xl border-slate-200" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden">
                          <img src={`https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=100`} alt="" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-sm font-bold text-slate-900">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{product.category}</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900">{product.price}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{product.stock} units</td>
                    <td className="px-6 py-4">
                      <Badge className={`rounded-full border-none font-bold ${
                        product.status === 'In Stock' ? 'bg-emerald-100 text-emerald-700' : 
                        product.status === 'Low Stock' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {product.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-indigo-600">
                          <Edit2 size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-red-600">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductManagement;