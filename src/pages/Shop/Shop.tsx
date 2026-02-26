"use client";

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  ShoppingBag, 
  Star, 
  Loader2
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCart } from '@/context/CartContext';
import { showSuccess } from '@/utils/toast';
import { Product } from '@/types/mlm';
import { supabase } from '@/lib/supabase';

const Shop = () => {
  const { addToCart, totalItems } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const categories = ["All", "Health", "Wellness", "Personal Care", "Home", "Nutrition"];
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    showSuccess(`${product.name} added to cart!`);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
                  ${activeCategory === cat ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
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
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
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
        )}
        
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or category filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;