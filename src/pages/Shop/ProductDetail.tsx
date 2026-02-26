import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  ArrowLeft,
  Plus,
  Minus,
  Award,
  Loader2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { supabase } from '@/lib/supabase';
import { useCart } from '@/context/CartContext';
import { showSuccess } from '@/utils/toast';
import { Product } from '@/types/mlm';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      
      if (!error && data) {
        setProduct(data);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      showSuccess(`${product.name} added to cart!`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Button asChild>
          <Link to="/shop">Back to Shop</Link>
        </Button>
      </div>
    );
  }

  const repurchaseIncome = [
    { level: 1, percentage: "3%", amount: `₹${(product.distributor_price * 0.03).toFixed(2)}` },
    { level: 2, percentage: "2%", amount: `₹${(product.distributor_price * 0.02).toFixed(2)}` },
    { level: 3, percentage: "1%", amount: `₹${(product.distributor_price * 0.01).toFixed(2)}` }
  ];

  return (
    <div className="min-h-screen bg-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/shop" className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 mb-8 transition-colors">
          <ArrowLeft className="mr-2 w-4 h-4" /> Back to Shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square rounded-[3rem] overflow-hidden bg-gray-50 border border-gray-100">
              <img 
                src={product.image_url} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-6 left-6">
              <Badge className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-sm font-bold border-none">
                Best Seller
              </Badge>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-6">
              <Badge variant="outline" className="text-indigo-600 border-indigo-100 bg-indigo-50 mb-4">
                {product.category}
              </Badge>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`w-5 h-5 ${star <= 4 ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-500">124 Customer Reviews</span>
              </div>
            </div>

            <div className="mb-8 p-6 bg-gray-50 rounded-3xl border border-gray-100">
              <div className="flex items-end gap-3 mb-2">
                <span className="text-3xl font-bold text-indigo-600">₹{product.distributor_price}</span>
                <span className="text-lg text-gray-400 line-through mb-1">₹{product.retail_price}</span>
                <Badge className="bg-emerald-100 text-emerald-700 border-none mb-1 ml-2">Save {Math.round((1 - product.distributor_price / product.retail_price) * 100)}%</Badge>
              </div>
              <p className="text-xs text-gray-500 font-medium">Exclusive Distributor Price</p>
            </div>

            <p className="text-gray-600 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Repurchase Income Info */}
            <div className="mb-8 p-6 bg-indigo-50 rounded-3xl border border-indigo-100">
              <div className="flex items-center gap-2 mb-4">
                <Award className="text-indigo-600 w-5 h-5" />
                <h3 className="font-bold text-indigo-900">Repurchase Income</h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {repurchaseIncome.map((item) => (
                  <div key={item.level} className="text-center">
                    <p className="text-[10px] text-indigo-400 font-bold uppercase">Level {item.level}</p>
                    <p className="text-lg font-bold text-indigo-700">{item.percentage}</p>
                    <p className="text-xs text-indigo-500">{item.amount}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-6 mb-10">
              <div className="flex items-center border border-gray-200 rounded-2xl p-1">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="w-12 text-center font-bold text-gray-900">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
              <Button 
                onClick={handleAddToCart}
                className="flex-1 h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-lg font-bold shadow-lg shadow-indigo-100"
              >
                <ShoppingBag className="mr-2 w-5 h-5" /> Add to Cart
              </Button>
            </div>

            <Separator className="mb-8" />

            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600">
                  <Truck size={20} />
                </div>
                <span className="text-xs font-medium text-gray-500">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600">
                  <RotateCcw size={20} />
                </div>
                <span className="text-xs font-medium text-gray-500">30-Day Returns</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600">
                  <ShieldCheck size={20} />
                </div>
                <span className="text-xs font-medium text-gray-500">Secure Payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;