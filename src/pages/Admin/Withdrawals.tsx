"use client";

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Download,
  MoreVertical,
  Wallet,
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { showSuccess } from '@/utils/toast';

const WithdrawalManagement = () => {
  const [isLoading, setIsLoading] = useState(false);

  const requests = [
    { id: "WTH-9021", user: "Alex Johnson", amount: "₹5,000", date: "2024-03-15", status: "Pending", bank: "HDFC Bank (****4290)" },
    { id: "WTH-8842", user: "Sarah Miller", amount: "₹12,400", date: "2024-03-14", status: "Approved", bank: "ICICI Bank (****1102)" },
    { id: "WTH-8731", user: "Mike Ross", amount: "₹2,500", date: "2024-03-14", status: "Rejected", bank: "SBI Bank (****9931)" },
    { id: "WTH-8620", user: "Emma Wilson", amount: "₹8,000", date: "2024-03-13", status: "Pending", bank: "Axis Bank (****5542)" },
  ];

  const handleAction = (id: string, action: string) => {
    showSuccess(`Withdrawal ${id} has been ${action} successfully.`);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Withdrawal Requests</h1>
          <p className="text-slate-500">Review and process payout requests from distributors.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-xl h-11">
          <Download className="mr-2 w-4 h-4" /> Export Requests
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm rounded-3xl bg-white">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Pending Requests</p>
              <h3 className="text-2xl font-bold text-slate-900">12</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm rounded-3xl bg-white">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Processed Today</p>
              <h3 className="text-2xl font-bold text-slate-900">₹45,200</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm rounded-3xl bg-white">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
              <Wallet size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Payouts</p>
              <h3 className="text-2xl font-bold text-slate-900">₹8,12,000</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
        <CardHeader className="border-b border-slate-50 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input placeholder="Search by ID or User..." className="pl-10 h-11 rounded-xl border-slate-200" />
            </div>
            <Button variant="outline" className="h-11 rounded-xl border-slate-200">
              <Filter className="mr-2 w-4 h-4" /> Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Request ID</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Bank Details</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {requests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-slate-900">{req.id}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{req.user}</td>
                    <td className="px-6 py-4 text-sm font-bold text-indigo-600">{req.amount}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{req.bank}</td>
                    <td className="px-6 py-4">
                      <Badge className={`rounded-full border-none font-bold ${
                        req.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 
                        req.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {req.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {req.status === 'Pending' ? (
                          <>
                            <Button 
                              onClick={() => handleAction(req.id, 'approved')}
                              variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-emerald-600 hover:bg-emerald-50"
                            >
                              <CheckCircle2 size={18} />
                            </Button>
                            <Button 
                              onClick={() => handleAction(req.id, 'rejected')}
                              variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-red-600 hover:bg-red-50"
                            >
                              <XCircle size={18} />
                            </Button>
                          </>
                        ) : (
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400">
                            <ExternalLink size={18} />
                          </Button>
                        )}
                      </div>
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

export default WithdrawalManagement;