import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  ShoppingBag,
  ChevronRight
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  const subtotal = totalPrice;
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
          <Link to="/shop" className="text-indigo-600 font-medium flex items-center hover:underline">
            <ArrowLeft className="mr-2 w-4 h-4" /> Continue Shopping
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-3xl border border-gray-100 flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0">
                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                    <p className="text-indigo-600 font-bold mt-1">₹{item.distributor_price}</p>
                  </div>
                  <div className="flex items-center border border-gray-100 rounded-xl p-1">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-indigo-600"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-10 text-center font-bold">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-indigo-600"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="font-bold text-gray-900">₹{item.distributor_price * item.quantity}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            ) : (
              <div className="bg-white p-12 rounded-3xl border border-gray-100 text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag className="text-gray-300 w-10 h-10" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
                <Button asChild className="rounded-xl bg-indigo-600 px-8">
                  <Link to="/shop">Start Shopping</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-emerald-600 font-bold">Free</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-indigo-600">₹{total}</span>
                </div>
              </div>
              <Button asChild disabled={cart.length === 0} className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-lg font-bold shadow-lg shadow-indigo-100">
                <Link to="/checkout">
                  Checkout <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
                <ShoppingBag size={14} />
                <span>Secure checkout powered by NexGen</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;