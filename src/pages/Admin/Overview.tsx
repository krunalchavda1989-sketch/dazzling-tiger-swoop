import React from 'react';
import { 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Activity
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Platform Overview</h1>
        <p className="text-slate-500">Real-time analytics for NexGen MLM & eCommerce.</p>
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

      <div className="grid lg:grid-cols-2 gap-8">
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
    </div>
  );
};

export default AdminOverview;