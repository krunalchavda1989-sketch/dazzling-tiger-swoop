"use client";

import React, { useEffect, useState } from 'react';
import { 
  Trophy, 
  Medal, 
  TrendingUp, 
  Users, 
  Search,
  Loader2,
  ArrowUpRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/lib/supabase';

const Leaderboard = () => {
  const [loading, setLoading] = useState(true);
  const [topEarners, setTopEarners] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      // In a real app, we would have a view or a complex query to get total earnings per user
      // For now, we'll simulate with some data from wallets
      const { data, error } = await supabase
        .from('wallets')
        .select('*, profiles(first_name, last_name, email, title)')
        .order('total_earned', { ascending: false })
        .limit(20);

      if (!error && data) {
        setTopEarners(data);
      }
      setLoading(false);
    };

    fetchLeaderboard();
  }, []);

  const filteredEarners = topEarners.filter(earner => 
    `${earner.profiles?.first_name} ${earner.profiles?.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
          <p className="text-gray-500 mt-1">Celebrating our top performers and network builders.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input 
            placeholder="Search performers..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-11 rounded-xl border-gray-200" 
          />
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end pt-10">
        {/* 2nd Place */}
        {topEarners[1] && (
          <div className="order-2 md:order-1">
            <Card className="border-none shadow-lg rounded-[2.5rem] bg-white text-center p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-slate-300"></div>
              <div className="mb-6 relative inline-block">
                <Avatar className="h-24 w-24 border-4 border-slate-100">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${topEarners[1].profiles?.email}`} />
                  <AvatarFallback>2nd</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-slate-300 rounded-full flex items-center justify-center text-white border-4 border-white">
                  <Medal size={20} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900">{topEarners[1].profiles?.first_name} {topEarners[1].profiles?.last_name}</h3>
              <p className="text-indigo-600 font-bold text-lg mt-2">₹{topEarners[1].total_earned.toLocaleString()}</p>
              <Badge className="mt-4 bg-slate-50 text-slate-600 border-none px-4 py-1">2nd Place</Badge>
            </Card>
          </div>
        )}

        {/* 1st Place */}
        {topEarners[0] && (
          <div className="order-1 md:order-2">
            <Card className="border-none shadow-2xl rounded-[3rem] bg-indigo-600 text-white text-center p-10 relative overflow-hidden scale-110 z-10">
              <div className="absolute top-0 left-0 w-full h-3 bg-amber-400"></div>
              <div className="mb-6 relative inline-block">
                <Avatar className="h-32 w-32 border-4 border-white/20">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${topEarners[0].profiles?.email}`} />
                  <AvatarFallback>1st</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center text-white border-4 border-indigo-600">
                  <Trophy size={24} />
                </div>
              </div>
              <h3 className="text-2xl font-bold">{topEarners[0].profiles?.first_name} {topEarners[0].profiles?.last_name}</h3>
              <p className="text-amber-300 font-bold text-2xl mt-2">₹{topEarners[0].total_earned.toLocaleString()}</p>
              <Badge className="mt-4 bg-white/20 text-white border-none px-6 py-1.5 text-sm">Top Performer</Badge>
            </Card>
          </div>
        )}

        {/* 3rd Place */}
        {topEarners[2] && (
          <div className="order-3">
            <Card className="border-none shadow-lg rounded-[2.5rem] bg-white text-center p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-amber-600/40"></div>
              <div className="mb-6 relative inline-block">
                <Avatar className="h-24 w-24 border-4 border-amber-50">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${topEarners[2].profiles?.email}`} />
                  <AvatarFallback>3rd</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-amber-600/40 rounded-full flex items-center justify-center text-white border-4 border-white">
                  <Medal size={20} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900">{topEarners[2].profiles?.first_name} {topEarners[2].profiles?.last_name}</h3>
              <p className="text-indigo-600 font-bold text-lg mt-2">₹{topEarners[2].total_earned.toLocaleString()}</p>
              <Badge className="mt-4 bg-amber-50 text-amber-700 border-none px-4 py-1">3rd Place</Badge>
            </Card>
          </div>
        )}
      </div>

      {/* Full List */}
      <Card className="border-none shadow-sm rounded-[2.5rem] bg-white overflow-hidden mt-12">
        <CardHeader className="p-8 border-b border-gray-50">
          <CardTitle className="text-xl font-bold">Global Rankings</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Rank</th>
                  <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Distributor</th>
                  <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Total Earnings</th>
                  <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Growth</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredEarners.slice(3).map((earner, index) => (
                  <tr key={earner.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <span className="text-sm font-bold text-gray-400">#{index + 4}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${earner.profiles?.email}`} />
                          <AvatarFallback>{earner.profiles?.first_name?.[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{earner.profiles?.first_name} {earner.profiles?.last_name}</p>
                          <p className="text-xs text-gray-500">{earner.profiles?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <Badge variant="outline" className="rounded-full border-indigo-100 text-indigo-600 bg-indigo-50/30 capitalize">
                        {earner.profiles?.title || 'Distributor'}
                      </Badge>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm font-bold text-gray-900">₹{earner.total_earned.toLocaleString()}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-1 text-emerald-600 font-bold text-sm">
                        <ArrowUpRight size={16} />
                        <span>12%</span>
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

export default Leaderboard;