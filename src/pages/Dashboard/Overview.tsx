import React from 'react';
import { useDashboardData } from '@/hooks/useDashboardData';
import { 
  Wallet, 
  Users, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Award,
  Loader2,
  Trophy,
  BookOpen,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

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

  const leaderboard = [
    { name: "Sarah Miller", earnings: "₹1,24,500", rank: "Diamond", avatar: "SM" },
    { name: "David Chen", earnings: "₹98,200", rank: "Platinum", avatar: "DC" },
    { name: "Emma Wilson", earnings: "₹85,400", rank: "Gold", avatar: "EW" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Business Overview</h1>
          <p className="text-gray-500">Track your growth and earnings in real-time.</p>
        </div>
        <Button asChild className="bg-indigo-600 hover:bg-indigo-700 rounded-xl h-11">
          <Link to="/dashboard/training">
            <BookOpen className="mr-2 w-4 h-4" /> Training Academy
          </Link>
        </Button>
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

        {/* Leaderboard */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm rounded-3xl bg-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Trophy className="text-amber-500" size={20} />
                Top Earners
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {leaderboard.map((user, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 font-bold text-sm">
                      {user.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{user.name}</p>
                      <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider">{user.rank}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">{user.earnings}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full rounded-xl border-gray-100 text-gray-500 h-10 text-xs font-bold">
                View Full Leaderboard <ChevronRight size={14} className="ml-1" />
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-3xl bg-indigo-600 text-white">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-2">Refer & Earn</h3>
              <p className="text-indigo-100 text-sm mb-6">Share your referral link and earn up to 9 levels deep.</p>
              <Button className="w-full bg-white text-indigo-600 hover:bg-indigo-50 rounded-xl font-bold">
                Invite Friends
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;