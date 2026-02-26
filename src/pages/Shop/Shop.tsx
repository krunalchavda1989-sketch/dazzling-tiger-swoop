import React, { useState } from 'react';
import ProductCard from '@/components/shop/ProductCard';
import { Product } from '@/types/mlm';
import { Input } from "@/components/ui/input";
import { Search, Filter, ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';

// Mock data for now
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium Health Supplement',
    description: 'Boost your immunity with our natural formula.',
    retail_price: 1200,
    distributor_price: 950,
    image_url: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=800',
    stock: 50,
    category: 'Wellness'
  },
  {
    id: '2',
    name: 'Organic Green Tea',
    description: 'Pure Himalayan green tea leaves.',
    retail_price: 450,
    distributor_price: 350,
    image_url: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&q=80&w=800',
    stock: 100,
    category: 'Beverages'
  },
  {
    id: '3',
    name: 'Smart Fitness Tracker',
    description: 'Track your steps and heart rate.',
    retail_price: 3500,
    distributor_price: 2800,
    image_url: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&q=80&w=800',
    stock: 25,
    category: 'Electronics'
  },
  {
    id: '4',
    name: 'Essential Oils Set',
    description: 'Aromatherapy for relaxation.',
    retail_price: 1800,
    distributor_price: 1400,
    image_url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=800',
    stock: 40,
    category: 'Wellness'
  }
];

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartCount, setCartCount] = useState(0);

  const categories = ['All', 'Wellness', 'Beverages', 'Electronics'];

  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product: Product) => {
    setCartCount(prev => prev + 1);
    // In a real app, we'd use a cart context or state management
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Shop Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Search products..." 
                className="pl-10 h-11 rounded-xl border-gray-200 bg-gray-50 focus:bg-white transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" className="relative rounded-full w-12 h-12 p-0">
              <Link to="/cart">
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-indigo-600 text-white border-2 border-white w-6 h-6 flex items-center justify-center p-0 rounded-full">
                    {cartCount}
                  </Badge>
                )}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
            <p className="text-gray-500 mt-1">Exclusive distributor pricing for NexGen members.</p>
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-6 ${selectedCategory === category ? 'bg-indigo-600' : 'bg-white border-gray-200 text-gray-600'}`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-gray-400 w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;