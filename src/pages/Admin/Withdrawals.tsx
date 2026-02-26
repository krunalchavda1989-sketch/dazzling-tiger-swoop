"use client";

import React, { useEffect, useState } from 'react';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Download,
  Wallet,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/lib/supabase';
import { format } from 'date-fns';
import { showSuccess, showError } from '@/utils/toast';

const WithdrawalManagement = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('withdrawals')
      .select('*, profiles(first_name, last_name, email)')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setRequests(data);
    }
    setLoading(false);
  };

  const handleAction = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('withdrawals')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
      showSuccess(`Withdrawal request ${status} successfully.`);
      fetchRequests();
    } catch (error: any) {
      showError(error.message);
    }
  };

  const filteredRequests = requests.filter(req => 
    req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${req.profiles?.first_name} ${req.profiles?.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
        <CardHeader className="border-b border-slate-50 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input 
                placeholder="Search by ID or User..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11 rounded-xl border-slate-200" 
              />
            </div>
            <Button variant="outline" className="h-11 rounded-xl border-slate-200">
              <Filter className="mr-2 w-4 h-4" /> Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center p-20">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Request ID</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-bold text-slate-900">WTH-{req.id.slice(0, 8).toUpperCase()}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {req.profiles?.first_name} {req.profiles?.last_name}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-indigo-600">₹{req.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {format(new Date(req.created_at), 'MMM d, yyyy')}
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={`rounded-full border-none font-bold capitalize ${
                          req.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 
                          req.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {req.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {req.status === 'pending' ? (
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
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WithdrawalManagement;