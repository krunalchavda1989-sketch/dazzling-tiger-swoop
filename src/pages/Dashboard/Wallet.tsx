"use client";

import React, { useState, useEffect } from 'react';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Download, 
  Filter,
  CreditCard,
  History,
  Plus,
  Loader2,
  CheckCircle2,
  Building2,
  User,
  Hash
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { showSuccess, showError } from '@/utils/toast';
import { supabase } from '@/lib/supabase';
import { format } from 'date-fns';

const WalletView = () => {
  const [loading, setLoading] = useState(true);
  const [wallet, setWallet] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isEditingBank, setIsEditingBank] = useState(false);

  useEffect(() => {
    async function fetchWalletData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: walletData } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      const { data: txData } = await supabase
        .from('commissions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      setWallet(walletData || { balance: 0, total_earned: 0, withdrawable_amount: 0 });
      setTransactions(txData || []);
      setLoading(false);
    }
    fetchWalletData();
  }, []);

  const handleWithdraw = async () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) < 500) {
      showError("Minimum withdrawal amount is ₹500");
      return;
    }

    if (parseFloat(withdrawAmount) > wallet.balance) {
      showError("Insufficient balance");
      return;
    }

    setIsWithdrawing(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase.from('withdrawals').insert({
        user_id: user?.id,
        amount: parseFloat(withdrawAmount),
        status: 'pending'
      });

      if (error) throw error;

      setIsSuccess(true);
      showSuccess("Withdrawal request submitted successfully!");
    } catch (error: any) {
      showError(error.message);
    } finally {
      setIsWithdrawing(false);
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Wallet</h1>
          <p className="text-gray-500">Manage your earnings and withdrawal requests.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl h-11 border-gray-200">
            <Download className="mr-2 w-4 h-4" /> Export
          </Button>
          
          <Dialog open={isSuccess || undefined} onOpenChange={(open) => !open && setIsSuccess(false)}>
            <DialogTrigger asChild>
              <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-xl h-11">
                <Plus className="mr-2 w-4 h-4" /> Withdraw Funds
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-[2rem]">
              {isSuccess ? (
                <div className="py-10 text-center">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="text-emerald-600 w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Sent!</h3>
                  <p className="text-gray-500 mb-8">Your withdrawal request for ₹{withdrawAmount} is being processed. It usually takes 24-48 hours.</p>
                  <Button onClick={() => setIsSuccess(false)} className="w-full rounded-xl bg-indigo-600">Got it</Button>
                </div>
              ) : (
                <>
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Withdraw Funds</DialogTitle>
                    <DialogDescription>
                      Enter the amount you'd like to withdraw to your registered bank account.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-6 space-y-4">
                    <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 flex justify-between items-center">
                      <span className="text-sm text-indigo-600 font-medium">Available Balance</span>
                      <span className="text-lg font-bold text-indigo-700">₹{wallet.balance.toLocaleString()}</span>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount (₹)</Label>
                      <Input 
                        id="amount" 
                        type="number" 
                        placeholder="Min. ₹500" 
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className="h-12 rounded-xl" 
                      />
                    </div>
                    <p className="text-[10px] text-gray-400">
                      * A 5% processing fee will be deducted from the total amount.
                    </p>
                  </div>
                  <DialogFooter>
                    <Button 
                      onClick={handleWithdraw} 
                      disabled={isWithdrawing}
                      className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold"
                    >
                      {isWithdrawing ? <Loader2 className="animate-spin mr-2" /> : "Confirm Withdrawal"}
                    </Button>
                  </DialogFooter>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-xl rounded-[2.5rem] bg-indigo-600 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>
          
          <CardContent className="p-10 relative z-10">
            <div className="flex justify-between items-start mb-12">
              <div>
                <p className="text-indigo-100 text-sm font-medium mb-1">Available Balance</p>
                <h2 className="text-5xl font-bold">₹{wallet.balance.toLocaleString()}</h2>
              </div>
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                <Wallet className="text-white w-8 h-8" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-indigo-100 text-xs font-medium mb-1 uppercase tracking-wider">Total Earned</p>
                <p className="text-2xl font-bold">₹{wallet.total_earned.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-indigo-100 text-xs font-medium mb-1 uppercase tracking-wider">Withdrawable</p>
                <p className="text-2xl font-bold">₹{wallet.withdrawable_amount.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm rounded-[2.5rem] bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold">Bank Details</CardTitle>
            <Button variant="ghost" size="sm" className="text-indigo-600" onClick={() => setIsEditingBank(!isEditingBank)}>
              {isEditingBank ? "Cancel" : "Edit"}
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {isEditingBank ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs">Account Holder</Label>
                  <Input placeholder="Full Name" className="h-10 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Bank Name</Label>
                  <Input placeholder="e.g. HDFC Bank" className="h-10 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Account Number</Label>
                  <Input placeholder="0000 0000 0000" className="h-10 rounded-xl" />
                </div>
                <Button className="w-full bg-indigo-600 rounded-xl h-10" onClick={() => {
                  setIsEditingBank(false);
                  showSuccess("Bank details updated!");
                }}>Save Details</Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                    <User size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Account Holder</p>
                    <p className="text-sm font-bold text-gray-900">Alex Johnson</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                    <Building2 size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Bank Name</p>
                    <p className="text-sm font-bold text-gray-900">HDFC Bank</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                    <Hash size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Account Number</p>
                    <p className="text-sm font-bold text-gray-900">**** **** 4290</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
        <CardHeader className="border-b border-gray-50 p-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold">Transaction History</CardTitle>
            <Button variant="ghost" size="sm" className="text-indigo-600">
              <Filter className="mr-2 w-4 h-4" /> Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Transaction</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-50 text-emerald-600`}>
                          <ArrowDownLeft size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">Level {tx.level} {tx.type} Commission</p>
                          <p className="text-xs text-gray-500 capitalize">{tx.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{format(new Date(tx.created_at), 'MMM d, yyyy')}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-bold text-emerald-600`}>
                        +₹{tx.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={`rounded-full border-none font-bold ${
                        tx.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {tx.status}
                      </Badge>
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

export default WalletView;