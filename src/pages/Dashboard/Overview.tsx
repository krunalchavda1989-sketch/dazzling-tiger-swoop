import React from 'react';
import { useDashboardData } from '@/hooks/useDashboardData';
import { 
  Wallet, 
  Users, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Award,
  Loader2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';

const DashboardOverview = () => {
  const { data, loading } = useDashboardData();

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  const stats = [
    { 
      label: 'Wallet Balance', 
      value: `₹${data.wallet.balance.toLocaleString()}`, 
      icon: <Wallet className="text-indigo-600" />, 
      trend: '+12%', 
      trendUp: true,
      color: 'bg-indigo-50'
    },
    { 
      label: 'Total Earnings', 
      value: `₹${data.wallet.total_earned.toLocaleString()}`, 
      icon: <TrendingUp className="text-emerald-600" />, 
      trend: '+8%', 
      trendUp: true,
      color: 'bg-emerald-50'
    },
    { 
      label: 'Direct Referrals', 
      value: data.directCount.toString(), 
      icon: <Users className="text-blue-600" />, 
      trend: '+2', 
      trendUp: true,
      color: 'bg-blue-50'
    },
    { 
      label: 'Current Rank', 
      value: 'Distributor', 
      icon: <Award className="text-amber-600" />, 
      trend: 'Active', 
      trendUp: true,
      color: 'bg-amber-50'
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Business Overview</h1>
        <p className="text-gray-500">Track your growth and earnings in real-time.</p>
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
              {data.commissions.length > 0 ? (
                data.commissions.map((comm: any) => (
                  <div key={comm.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold">
                        {comm.from_user.first_name[0]}{comm.from_user.last_name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {comm.from_user.first_name} {comm.from_user.last_name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Level {comm.level} {comm.type} • {format(new Date(comm.created_at), 'MMM d, h:mm a')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-emerald-600">+₹{comm.amount.toFixed(2)}</p>
                      <p className="text-xs text-gray-400 capitalize">{comm.status}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-gray-500">
                  No commissions earned yet. Start referring to earn!
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Milestone */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm rounded-3xl bg-indigo-600 text-white">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-2">Refer & Earn</h3>
              <p className="text-indigo-100 text-sm mb-6">Share your referral link and earn up to 9 levels deep.</p>
              <div className="bg-white/10 p-3 rounded-xl flex items-center justify-between mb-6">
                <code className="text-xs font-mono truncate mr-2">
                  {window.location.origin}/register?ref=USER_ID
                </code>
                <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 h-8 flex-shrink-0">Copy</Button>
              </div>
              <Button className="w-full bg-white text-indigo-600 hover:bg-indigo-50 rounded-xl font-bold">
                Invite Friends
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-3xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Next Milestone</CardTitle>
            </CardHeader>
            <CardContent className="text-center pb-8">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-amber-600 w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-gray-900">Silver Rank</h4>
              <p className="text-sm text-gray-500 mt-1">Need 3 direct referrals</p>
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span>Progress</span>
                  <span>{Math.min((data.directCount / 3) * 100, 100).toFixed(0)}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600 rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min((data.directCount / 3) * 100, 100)}%` }}
                  ></div>
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