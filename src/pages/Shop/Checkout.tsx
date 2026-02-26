import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/lib/supabase';
import { mlmService } from '@/services/mlmService';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, CreditCard, Truck, ShieldCheck, CheckCircle2, Loader2 } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';
import { Separator } from "@/components/ui/separator";

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();
  const isSubscription = searchParams.get('type') === 'subscription';
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    zip: '',
    paymentMethod: 'card'
  });

  const finalAmount = isSubscription ? 2800 : totalPrice;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      // 1. Simulate Payment Gateway Success
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (isSubscription) {
        // 2. Update Profile Status
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .update({ subscription_status: 'active' })
          .eq('id', user.id)
          .select('referrer_id')
          .single();

        if (profileError) throw profileError;

        // 3. Distribute Referral Commissions (9 levels)
        if (profile.referrer_id) {
          await mlmService.distributeReferralCommission(user.id, profile.referrer_id);
        }
        
        showSuccess("Subscription activated! Welcome to NexGen.");
      } else {
        // 4. Create Order
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .insert({
            user_id: user.id,
            total_amount: finalAmount,
            status: 'processing',
            payment_status: 'paid'
          })
          .select()
          .single();

        if (orderError) throw orderError;

        // 5. Distribute Repurchase Commissions (3 levels)
        await mlmService.distributeRepurchaseCommission(order.id, user.id, finalAmount);
        
        clearCart();
        showSuccess("Order placed successfully!");
      }

      setIsSuccess(true);
    } catch (error: any) {
      showError(error.message || "Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="text-emerald-600 w-12 h-12" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {isSubscription ? "Welcome Aboard!" : "Order Confirmed!"}
          </h1>
          <p className="text-gray-600 mb-10">
            {isSubscription 
              ? "Your distributor account is now active. You can start building your team and earning commissions."
              : "Your order has been successfully placed. You can track its status in your dashboard."}
          </p>
          <div className="space-y-4">
            <Button asChild className="w-full h-12 rounded-xl bg-indigo-600">
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
            {!isSubscription && (
              <Button asChild variant="outline" className="w-full h-12 rounded-xl">
                <Link to="/shop">Continue Shopping</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to={isSubscription ? "/register" : "/cart"} className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 mb-8 transition-colors">
          <ArrowLeft className="mr-2 w-4 h-4" /> Back
        </Link>

        <form onSubmit={handlePayment} className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Info (Only for products) */}
            {!isSubscription && (
              <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                    <Truck size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Shipping Information</h2>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="address">Full Address</Label>
                    <Input 
                      id="address" 
                      required 
                      value={formData.address}
                      onChange={e => setFormData({...formData, address: e.target.value})}
                      placeholder="123 Main St, Apt 4B" 
                      className="h-12 rounded-xl" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city" 
                      required 
                      value={formData.city}
                      onChange={e => setFormData({...formData, city: e.target.value})}
                      placeholder="New York" 
                      className="h-12 rounded-xl" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input 
                      id="zip" 
                      required 
                      value={formData.zip}
                      onChange={e => setFormData({...formData, zip: e.target.value})}
                      placeholder="10001" 
                      className="h-12 rounded-xl" 
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Payment Method */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                  <CreditCard size={20} />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
              </div>
              <RadioGroup 
                defaultValue="card" 
                onValueChange={v => setFormData({...formData, paymentMethod: v})}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-3 border border-gray-100 p-4 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex-1 cursor-pointer font-bold">Credit / Debit Card</Label>
                </div>
                <div className="flex items-center space-x-3 border border-gray-100 p-4 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi" className="flex-1 cursor-pointer font-bold">UPI / Net Banking</Label>
                </div>
              </RadioGroup>
              
              <div className="mt-8 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="0000 0000 0000 0000" className="h-12 rounded-xl" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" className="h-12 rounded-xl" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" className="h-12 rounded-xl" required />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Summary</h2>
              <div className="space-y-4 mb-6">
                {isSubscription ? (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Distributor Subscription</span>
                    <span className="font-bold">₹2800</span>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-500 truncate max-w-[150px]">{item.name} x{item.quantity}</span>
                      <span className="font-bold">₹{item.distributor_price * item.quantity}</span>
                    </div>
                  ))
                )}
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total Amount</span>
                  <span className="text-2xl font-bold text-indigo-600">₹{finalAmount}</span>
                </div>
              </div>
              <Button 
                type="submit" 
                disabled={isProcessing}
                className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-lg font-bold shadow-lg shadow-indigo-100"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Pay ₹${finalAmount}`
                )}
              </Button>
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
                <ShieldCheck size={14} />
                <span>Secure SSL Encrypted Payment</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;