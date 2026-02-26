"use client";

import React from 'react';
import { 
  ShoppingBag, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock,
  ChevronRight,
  Search,
  Filter
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const UserOrders = () => {
  const orders = [
    { 
      id: "ORD-7429", 
      date: "2024-03-14", 
      total: "₹1,199", 
      status: "Delivered", 
      items: ["Premium Wellness Pack"],
      icon: <CheckCircle2 className="text-emerald-500" />
    },
    { 
      id: "ORD-8102", 
      date: "2024-03-10", 
      total: "₹3,199", 
      status: "In Transit", 
      items: ["Smart Fitness Tracker"],
      icon: <Truck className="text-blue-500" />
    },
    { 
      id: "ORD-6531", 
      date: "2024-03-05", 
      total: "₹1,999", 
      status: "Processing", 
      items: ["Organic Protein Blend"],
      icon: <Clock className="text-amber-500" />
    }
  ];

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
        {orders.map((order) => (
          <Card key={order.id} className="border-none shadow-sm rounded-[2rem] overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row items-center p-6 gap-6">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <ShoppingBag className="text-indigo-600 w-8 h-8" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">{order.id}</h3>
                    <span className="hidden md:block text-gray-300">•</span>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-700">{order.items.join(", ")}</p>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-lg font-bold text-indigo-600">{order.total}</p>
                  <div className="flex items-center justify-center md:justify-end gap-2 mt-1">
                    {order.icon}
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{order.status}</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="rounded-xl h-12 w-12 text-gray-400 hover:text-indigo-600">
                  <ChevronRight size={20} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserOrders;