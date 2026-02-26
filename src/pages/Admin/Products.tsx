"use client";

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Eye,
  MoreHorizontal,
  Loader2,
  Image as ImageIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showSuccess } from '@/utils/toast';

const ProductManagement = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const products = [
    { id: 1, name: "Premium Wellness Pack", category: "Wellness", price: "₹1,499", stock: 124, status: "In Stock" },
    { id: 2, name: "Organic Protein Blend", category: "Nutrition", price: "₹2,499", stock: 89, status: "In Stock" },
    { id: 3, name: "Essential Oils Set", category: "Personal Care", price: "₹899", stock: 12, status: "Low Stock" },
    { id: 4, name: "Smart Fitness Tracker", category: "Health", price: "₹3,999", stock: 0, status: "Out of Stock" },
  ];

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsAdding(false);
    showSuccess("Product added to catalog successfully!");
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Product Inventory</h1>
          <p className="text-slate-500">Manage your eCommerce catalog and pricing.</p>
        </div>
        
        <Dialog open={isAdding} onOpenChange={setIsAdding}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-xl h-11">
              <Plus className="mr-2 w-4 h-4" /> Add New Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] rounded-[2rem]">
            <form onSubmit={handleAddProduct}>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">Add New Product</DialogTitle>
                <DialogDescription>
                  Fill in the details to add a new product to the marketplace.
                </DialogDescription>
              </DialogHeader>
              <div className="py-6 grid grid-cols-2 gap-6">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input id="name" placeholder="e.g. Premium Wellness Pack" className="h-12 rounded-xl" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select defaultValue="wellness">
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="wellness">Wellness</SelectItem>
                      <SelectItem value="nutrition">Nutrition</SelectItem>
                      <SelectItem value="personal-care">Personal Care</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Initial Stock</Label>
                  <Input id="stock" type="number" placeholder="100" className="h-12 rounded-xl" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="retailPrice">Retail Price (₹)</Label>
                  <Input id="retailPrice" type="number" placeholder="1499" className="h-12 rounded-xl" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="distributorPrice">Distributor Price (₹)</Label>
                  <Input id="distributorPrice" type="number" placeholder="1199" className="h-12 rounded-xl" required />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe the product benefits..." className="rounded-xl min-h-[100px]" required />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Product Image</Label>
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-indigo-300 transition-colors cursor-pointer">
                    <ImageIcon className="mx-auto w-10 h-10 text-slate-300 mb-2" />
                    <p className="text-sm text-slate-500">Click to upload or drag and drop</p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold"
                >
                  {isLoading ? <Loader2 className="animate-spin mr-2" /> : "Create Product"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
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