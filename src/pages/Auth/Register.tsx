import React, { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, ArrowLeft, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { showSuccess, showError } from '@/utils/toast';

const Register = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const referralId = searchParams.get('ref') || '';
  
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    referralCode: referralId
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Sign up the user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // 2. Create the profile with referral info
        // Note: In a real app, this would be handled by a Supabase trigger or a more secure edge function
        const { error: profileError } = await supabase.from('profiles').insert({
          id: authData.user.id,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          referrer_id: formData.referralCode || null,
          subscription_status: 'pending',
          role: 'distributor'
        });

        if (profileError) throw profileError;

        showSuccess("Account created! Please complete your subscription payment.");
        navigate('/checkout?type=subscription');
      }
    } catch (error: any) {
      showError(error.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 mb-8 transition-colors">
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to home
          </Link>
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center">
              <UserPlus className="text-white w-7 h-7" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Join NexGen</h2>
          <p className="mt-2 text-gray-600">Start your journey for just ₹2800</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="referral">Referral ID (Optional)</Label>
              <Input 
                id="referral" 
                type="text" 
                value={formData.referralCode}
                onChange={(e) => setFormData({...formData, referralCode: e.target.value})}
                placeholder="Enter referral code" 
                className="h-12 rounded-xl border-gray-200 bg-gray-50 focus:ring-indigo-500" 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  type="text" 
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  placeholder="John" 
                  className="h-12 rounded-xl border-gray-200 focus:ring-indigo-500" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  type="text" 
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  placeholder="Doe" 
                  className="h-12 rounded-xl border-gray-200 focus:ring-indigo-500" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input 
                id="email" 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="name@example.com" 
                className="h-12 rounded-xl border-gray-200 focus:ring-indigo-500" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="••••••••" 
                className="h-12 rounded-xl border-gray-200 focus:ring-indigo-500" 
              />
            </div>
          </div>

          <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Subscription Fee</span>
              <span className="font-bold text-indigo-600">₹2800.00</span>
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-lg font-semibold"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Pay & Register"}
          </Button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-indigo-600 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;