"use client";

import React from 'react';
import { 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const AdminOverview = () => {
  const data = [
    { name: 'Mon', users: 40, sales: 2400 },
    { name: 'Tue', users: 30, sales: 1398 },
    { name: 'Wed', users: 20, sales: 9800 },
    { name: 'Thu', users: 27, sales: 3908 },
    { name: 'Fri', users: 18, sales: 4800 },
    { name: 'Sat', users: 23, sales: 3800 },
    { name: 'Sun', users: 34, sales: 4300 },
  ];

  const stats = [
    { label: 'Total Users', value: '1,284', icon: <Users />, trend: '+12%', up: true },
    { label: 'Total Sales', value: '₹4,52,000', icon: <ShoppingBag />, trend: '+8%', up: true },
    { label: 'Commissions Paid', value: '₹1,12,000', icon: <DollarSign />, trend: '+14%', up: true },
    { label: 'Active Subscriptions', value: '842', icon: <Activity />, trend: '-2%', up: false },
  ];

  const recentActivity = [
    { id: 1, user: "John Doe", action: "New Registration", time: "2 mins ago", amount: "₹2,800" },
    { id: 2, user: "Sarah Miller", action: "Product Purchase", time: "15 mins ago", amount: "₹1,499" },
    { id: 3, user: "Mike Ross", action: "Withdrawal Request", time: "1 hour ago", amount: "₹5,000" },
    { id: 4, user: "Emma Wilson", action: "Rank Upgrade", time: "3 hours ago", amount: "Silver" },
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
        {stats.map((stat, i) => (
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
                <AreaChart data={data}>
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

          <Card className="border-none shadow-sm rounded-3xl p-6">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-lg font-bold">New User Registrations</CardTitle>
            </CardHeader>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  />
                  <Line type="monotone" dataKey="users" stroke="#f43f5e" strokeWidth={3} dot={{r: 4, fill: '#f43f5e', strokeWidth: 2, stroke: '#fff'}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="border-none shadow-sm rounded-3xl bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-50">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-bold text-slate-900">{activity.user}</p>
                      <span className="text-xs text-slate-400">{activity.time}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-slate-500">{activity.action}</p>
                      <p className="text-xs font-bold text-indigo-600">{activity.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-slate-50">
                <Button variant="ghost" className="w-full text-indigo-600 text-sm font-bold">View All Activity</Button>
              </div>
            </CardContent>
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