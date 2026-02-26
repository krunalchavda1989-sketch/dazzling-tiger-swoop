"use client";

import React, { useEffect, useState } from 'react';
import { 
  ShoppingBag, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock,
  ChevronRight,
  Search,
  Filter,
  Loader2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/lib/supabase';
import { format } from 'date-fns';

const UserOrders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    async function fetchOrders() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      setOrders(data || []);
      setLoading(false);
    }
    fetchOrders();
  }, []);

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
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-500">Track and manage your marketplace purchases.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Search orders..." className="pl-10 h-11 rounded-xl border-gray-200" />
          </div>
          <Button variant="outline" className="h-11 rounded-xl border-gray-200">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {orders.length > 0 ? (
          orders.map((order) => (
            <Card key={order.id} className="border-none shadow-sm rounded-[2rem] overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row items-center p-6 gap-6">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <ShoppingBag className="text-indigo-600 w-8 h-8" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900">ORD-{order.id.slice(0, 8).toUpperCase()}</h3>
                      <span className="hidden md:block text-gray-300">•</span>
                      <p className="text-sm text-gray-500">{format(new Date(order.created_at), 'MMM d, yyyy')}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-700">Marketplace Purchase</p>
                  </div>
                  <div className="text-center md:text-right">
                    <p className="text-lg font-bold text-indigo-600">₹{order.total_amount.toLocaleString()}</p>
                    <div className="flex items-center justify-center md:justify-end gap-2 mt-1">
                      {order.status === 'delivered' ? <CheckCircle2 className="text-emerald-500 w-4 h-4" /> : <Clock className="text-amber-500 w-4 h-4" />}
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{order.status}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-xl h-12 w-12 text-gray-400 hover:text-indigo-600">
                    <ChevronRight size={20} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-[2rem] border border-gray-100">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900">No orders yet</h3>
            <p className="text-gray-500">Start shopping in our marketplace to see your orders here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrders;