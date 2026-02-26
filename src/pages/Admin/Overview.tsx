"use client";

import React, { useEffect, useState } from 'react';
import { 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Clock,
  Loader2,
  PieChart as PieChartIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { supabase } from '@/lib/supabase';

const AdminOverview = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      
      // Fetch Total Users
      const { count: userCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Fetch Total Sales
      const { data: orders } = await supabase
        .from('orders')
        .select('total_amount')
        .eq('payment_status', 'paid');
      
      const totalSales = orders?.reduce((sum, order) => sum + order.total_amount, 0) || 0;

      // Fetch Commissions Paid
      const { data: commissions } = await supabase
        .from('commissions')
        .select('amount')
        .eq('status', 'paid');
      
      const totalCommissions = commissions?.reduce((sum, comm) => sum + comm.amount, 0) || 0;

      // Fetch Active Subscriptions
      const { count: activeSubs } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('subscription_status', 'active');

      setStats({
        userCount: userCount || 0,
        totalSales: totalSales,
        totalCommissions: totalCommissions,
        activeSubs: activeSubs || 0
      });
      
      setLoading(false);
    };

    fetchStats();
  }, []);

  const chartData = [
    { name: 'Mon', sales: 2400 },
    { name: 'Tue', sales: 1398 },
    { name: 'Wed', sales: 9800 },
    { name: 'Thu', sales: 3908 },
    { name: 'Fri', sales: 4800 },
    { name: 'Sat', sales: 3800 },
    { name: 'Sun', sales: 4300 },
  ];

  const categoryData = [
    { name: 'Wellness', value: 45, color: '#6366f1' },
    { name: 'Nutrition', value: 30, color: '#818cf8' },
    { name: 'Personal Care', value: 15, color: '#a5b4fc' },
    { name: 'Health', value: 10, color: '#c7d2fe' },
  ];

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  const statCards = [
    { label: 'Total Users', value: stats.userCount.toLocaleString(), icon: <Users />, trend: '+12%', up: true },
    { label: 'Total Sales', value: `₹${stats.totalSales.toLocaleString()}`, icon: <ShoppingBag />, trend: '+8%', up: true },
    { label: 'Commissions Paid', value: `₹${stats.totalCommissions.toLocaleString()}`, icon: <DollarSign />, trend: '+14%', up: true },
    { label: 'Active Subscriptions', value: stats.activeSubs.toLocaleString(), icon: <Activity />, trend: '+5%', up: true },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Platform Overview</h1>
          <p className="text-slate-500">Real-time analytics for NexGen MLM & eCommerce.</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-slate-500 bg-white px-4 py-2 rounded-xl border border-slate-100">
          <Clock size={16} className="text-indigo-600" />
          Last updated: Just now
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm rounded-3xl">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600">
                  {stat.icon}
                </div>
                <div className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${stat.up ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                  {stat.up ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
                  {stat.trend}
                </div>
              </div>
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-none shadow-sm rounded-3xl p-6">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-lg font-bold">Revenue Growth</CardTitle>
            </CardHeader>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  />
                  <Area type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="border-none shadow-sm rounded-3xl p-6">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <PieChartIcon className="text-indigo-600" size={20} />
                Sales by Category
              </CardTitle>
            </CardHeader>
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {categoryData.map((cat, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{backgroundColor: cat.color}}></div>
                    <span className="text-slate-500 font-medium">{cat.name}</span>
                  </div>
                  <span className="font-bold text-slate-900">{cat.value}%</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-none shadow-sm rounded-3xl bg-indigo-600 text-white">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-2">System Health</h3>
              <p className="text-indigo-100 text-sm mb-6">All systems are operational and performing optimally.</p>
              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span>Database</span>
                  <span className="font-bold">99.9%</span>
                </div>
                <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-[99.9%]"></div>
                </div>
                <div className="flex justify-between text-xs">
                  <span>API Latency</span>
                  <span className="font-bold">24ms</span>
                </div>
                <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-[85%]"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;