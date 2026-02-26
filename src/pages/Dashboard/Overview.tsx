import React from 'react';
import { 
  Wallet, 
  Users, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  ShoppingBag,
  Award
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DashboardOverview = () => {
  const stats = [
    { 
      label: 'Wallet Balance', 
      value: '₹12,450.00', 
      icon: <Wallet className="text-indigo-600" />, 
      trend: '+12%', 
      trendUp: true,
      color: 'bg-indigo-50'
    },
    { 
      label: 'Total Earnings', 
      value: '₹45,200.00', 
      icon: <TrendingUp className="text-emerald-600" />, 
      trend: '+8%', 
      trendUp: true,
      color: 'bg-emerald-50'
    },
    { 
      label: 'Direct Referrals', 
      value: '24', 
      icon: <Users className="text-blue-600" />, 
      trend: '+2', 
      trendUp: true,
      color: 'bg-blue-50'
    },
    { 
      label: 'Total Team', 
      value: '156', 
      icon: <Award className="text-amber-600" />, 
      trend: '+14', 
      trendUp: true,
      color: 'bg-amber-50'
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, Alex!</h1>
        <p className="text-gray-500">Here's what's happening with your business today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm rounded-3xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${stat.trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                  {stat.trendUp ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
                  {stat.trend}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 border-none shadow-sm rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold">Recent Commissions</CardTitle>
            <Button variant="ghost" size="sm" className="text-indigo-600">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold">
                      {['JD', 'AS', 'MK', 'RL'][i]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {['John Doe', 'Alice Smith', 'Mike Kane', 'Rose Lee'][i]}
                      </p>
                      <p className="text-xs text-gray-500">Level {i + 1} Referral • 2 hours ago</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-emerald-600">+₹{[280, 140, 70, 35][i]}</p>
                    <p className="text-xs text-gray-400">Completed</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm rounded-3xl bg-indigo-600 text-white">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-2">Refer & Earn</h3>
              <p className="text-indigo-100 text-sm mb-6">Share your referral link and earn up to 9 levels deep.</p>
              <div className="bg-white/10 p-3 rounded-xl flex items-center justify-between mb-6">
                <code className="text-xs font-mono">NEX-ALEX-2024</code>
                <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 h-8">Copy</Button>
              </div>
              <Button className="w-full bg-white text-indigo-600 hover:bg-indigo-50 rounded-xl font-bold">
                Invite Friends
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-3xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Current Rank</CardTitle>
            </CardHeader>
            <CardContent className="text-center pb-8">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-amber-600 w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-gray-900">Gold Distributor</h4>
              <p className="text-sm text-gray-500 mt-1">Next Rank: Platinum</p>
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span>Progress</span>
                  <span>75%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;