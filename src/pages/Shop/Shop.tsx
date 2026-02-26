"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  ShoppingBag, 
  Star, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCart } from '@/context/CartContext';
import { showSuccess } from '@/utils/toast';
import { Product } from '@/types/mlm';

const Shop = () => {
  const { addToCart, totalItems } = useCart();
  const categories = ["All", "Health", "Wellness", "Personal Care", "Home", "Nutrition"];
  
  const products: Product[] = [
    {
      id: "1",
      name: "Premium Wellness Pack",
      category: "Wellness",
      retail_price: 1499,
      distributor_price: 1199,
      description: "Complete wellness solution.",
      image_url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400",
      stock: 124
    },
    {
      id: "2",
      name: "Organic Protein Blend",
      category: "Nutrition",
      retail_price: 2499,
      distributor_price: 1999,
      description: "High quality protein.",
      image_url: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=400",
      stock: 89
    },
    {
      id: "3",
      name: "Essential Oils Set",
      category: "Personal Care",
      retail_price: 899,
      distributor_price: 699,
      description: "Pure essential oils.",
      image_url: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=400",
      stock: 56
    },
    {
      id: "4",
      name: "Smart Fitness Tracker",
      category: "Health",
      retail_price: 3999,
      distributor_price: 3199,
      description: "Track your health.",
      image_url: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&q=80&w=400",
      stock: 210
    }
  ];

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    showSuccess(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Shop Header */}
      <div className="bg-white border-b border-gray-100 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">NexGen Marketplace</h1>
              <p className="text-gray-500 mt-2">Exclusive products with distributor-only pricing.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="Search products..." 
                  className="pl-10 h-11 rounded-xl border-gray-200 focus:ring-indigo-500"
                />
              </div>
              <Button variant="outline" className="h-11 rounded-xl border-gray-200">
                <Filter className="w-4 h-4 mr-2" /> Filter
              </Button>
              <Link to="/cart">
                <Button className="h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 relative">
                  <ShoppingBag className="w-4 h-4 mr-2" /> Cart
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div className="flex items-center gap-2 mt-8 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button 
                key={cat}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
                  ${cat === "All" ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="group border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-[2rem] overflow-hidden bg-white">
              <Link to={`/shop/${product.id}`}>
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-indigo-600 border-none font-bold">
                    {product.category}
                  </Badge>
                </div>
              </Link>
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-bold text-gray-900">4.8</span>
                  <span className="text-xs text-gray-400">(124)</span>
                </div>
                <Link to={`/shop/${product.id}`}>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                </Link>
                <div className="mt-4 flex items-end gap-2">
                  <span className="text-xl font-bold text-indigo-600">₹{product.distributor_price}</span>
                  <span className="text-sm text-gray-400 line-through mb-1">₹{product.retail_price}</span>
                </div>
                <p className="text-[10px] text-emerald-600 font-bold mt-1 uppercase tracking-wider">Distributor Price</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button 
                  onClick={() => handleAddToCart(product)}
                  className="w-full rounded-xl bg-gray-900 hover:bg-indigo-600 transition-colors h-11 font-bold"
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;