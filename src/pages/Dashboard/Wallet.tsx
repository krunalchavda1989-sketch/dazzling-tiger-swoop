"use client";

import React, { useState } from 'react';
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
  CheckCircle2
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

const WalletView = () => {
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const transactions = [
    { id: 1, type: 'Commission', amount: '+₹280.00', date: '2024-03-15', status: 'Completed', description: 'Level 1 Referral Commission' },
    { id: 2, type: 'Withdrawal', amount: '-₹5,000.00', date: '2024-03-12', status: 'Pending', description: 'Bank Transfer' },
    { id: 3, type: 'Repurchase', amount: '+₹45.00', date: '2024-03-10', status: 'Completed', description: 'Level 2 Repurchase Income' },
    { id: 4, type: 'Commission', amount: '+₹140.00', date: '2024-03-08', status: 'Completed', description: 'Level 2 Referral Commission' },
  ];

  const handleWithdraw = async () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) < 500) {
      showError("Minimum withdrawal amount is ₹500");
      return;
    }

    setIsWithdrawing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsWithdrawing(false);
    setIsSuccess(true);
    showSuccess("Withdrawal request submitted successfully!");
  };

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
                      <span className="text-lg font-bold text-indigo-700">₹12,450.00</span>
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

      {/* Wallet Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-xl rounded-[2.5rem] bg-indigo-600 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>
          
          <CardContent className="p-10 relative z-10">
            <div className="flex justify-between items-start mb-12">
              <div>
                <p className="text-indigo-100 text-sm font-medium mb-1">Available Balance</p>
                <h2 className="text-5xl font-bold">₹12,450.00</h2>
              </div>
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                <Wallet className="text-white w-8 h-8" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-indigo-100 text-xs font-medium mb-1 uppercase tracking-wider">Total Earned</p>
                <p className="text-2xl font-bold">₹45,200.00</p>
              </div>
              <div>
                <p className="text-indigo-100 text-xs font-medium mb-1 uppercase tracking-wider">Total Withdrawn</p>
                <p className="text-2xl font-bold">₹32,750.00</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm rounded-[2.5rem] bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full h-14 rounded-2xl border-gray-100 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 justify-start px-6 group">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center mr-4 group-hover:bg-white transition-colors">
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="font-bold">Bank Details</span>
            </Button>
            <Button variant="outline" className="w-full h-14 rounded-2xl border-gray-100 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 justify-start px-6 group">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center mr-4 group-hover:bg-white transition-colors">
                <History className="w-5 h-5" />
              </div>
              <span className="font-bold">Income Reports</span>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
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
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          tx.amount.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                        }`}>
                          {tx.amount.startsWith('+') ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{tx.description}</p>
                          <p className="text-xs text-gray-500">{tx.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{tx.date}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-bold ${
                        tx.amount.startsWith('+') ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        {tx.amount}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={`rounded-full border-none font-bold ${
                        tx.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
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