import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, ArrowLeft, UserPlus } from 'lucide-react';

const Register = () => {
  const [searchParams] = useSearchParams();
  const referralId = searchParams.get('ref') || '';

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
        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="referral">Referral ID (Optional)</Label>
              <Input 
                id="referral" 
                type="text" 
                defaultValue={referralId}
                placeholder="Enter referral code" 
                className="h-12 rounded-xl border-gray-200 bg-gray-50 focus:ring-indigo-500" 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" type="text" placeholder="John" className="h-12 rounded-xl border-gray-200 focus:ring-indigo-500" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" type="text" placeholder="Doe" className="h-12 rounded-xl border-gray-200 focus:ring-indigo-500" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" placeholder="name@example.com" className="h-12 rounded-xl border-gray-200 focus:ring-indigo-500" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" className="h-12 rounded-xl border-gray-200 focus:ring-indigo-500" required />
            </div>
          </div>

          <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Subscription Fee</span>
              <span className="font-bold text-indigo-600">₹2800.00</span>
            </div>
          </div>

          <Button type="submit" className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-lg font-semibold">
            Pay & Register
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