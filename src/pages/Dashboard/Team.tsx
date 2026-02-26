"use client";

import React, { useEffect, useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  ChevronRight, 
  Filter,
  Mail,
  Phone,
  Award,
  Copy,
  Share2,
  Network,
  BarChart3,
  Loader2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { showSuccess } from '@/utils/toast';
import GenealogyTree from '@/components/team/GenealogyTree';
import { supabase } from '@/lib/supabase';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { format } from 'date-fns';

const TeamView = () => {
  const [loading, setLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, direct: 0, levels: 0 });
  const [userId, setUserId] = useState("");

  useEffect(() => {
    fetchTeamData();
  }, []);

  async function fetchTeamData() {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    setUserId(user.id);

    // Fetch Direct Referrals
    const { data: directs } = await supabase
      .from('profiles')
      .select('*')
      .eq('referrer_id', user.id);

    setTeamMembers(directs || []);
    setStats({
      total: directs?.length || 0,
      direct: directs?.length || 0,
      levels: 1
    });
    setLoading(false);
  }

  const referralLink = `${window.location.origin}/register?ref=${userId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    showSuccess("Referral link copied to clipboard!");
  };

  const levelData = [
    { level: 'L1', count: stats.direct, color: '#6366f1' },
    { level: 'L2', count: 0, color: '#818cf8' },
    { level: 'L3', count: 0, color: '#a5b4fc' },
    { level: 'L4', count: 0, color: '#c7d2fe' },
    { level: 'L5', count: 0, color: '#e0e7ff' },
    { level: 'L6', count: 0, color: '#f5f3ff' },
    { level: 'L7', count: 0, color: '#f5f3ff' },
    { level: 'L8', count: 0, color: '#f5f3ff' },
    { level: 'L9', count: 0, color: '#f5f3ff' },
  ];

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
          <h1 className="text-2xl font-bold text-gray-900">My Network</h1>
          <p className="text-gray-500">Manage and track your 9-level referral organization.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-xl h-11" onClick={copyToClipboard}>
          <Share2 className="mr-2 w-4 h-4" /> Share Referral Link
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-none shadow-sm rounded-3xl bg-indigo-600 text-white overflow-hidden">
            <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Grow Your Empire</h3>
                <p className="text-indigo-100 text-sm">Share your unique referral link with friends and earn commissions up to 9 levels deep.</p>
              </div>
              <div className="flex items-center gap-2 bg-white/10 p-2 rounded-2xl w-full md:w-auto">
                <code className="px-4 py-2 text-sm font-mono truncate max-w-[200px] md:max-w-xs">
                  {referralLink}
                </code>
                <Button onClick={copyToClipboard} size="icon" variant="ghost" className="text-white hover:bg-white/20 rounded-xl">
                  <Copy size={18} />
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-none shadow-sm rounded-3xl bg-white">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                  <Users size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Total Team Size</p>
                  <h3 className="text-2xl font-bold text-gray-900">{stats.total}</h3>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm rounded-3xl bg-white">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                  <UserPlus size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Direct Referrals</p>
                  <h3 className="text-2xl font-bold text-gray-900">{stats.direct}</h3>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm rounded-3xl bg-white">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
                  <Award size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Active Levels</p>
                  <h3 className="text-2xl font-bold text-gray-900">{stats.levels} / 9</h3>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="border-none shadow-sm rounded-3xl bg-white p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <BarChart3 className="text-indigo-600" size={20} />
              Level Breakdown
            </CardTitle>
          </CardHeader>
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={levelData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="level" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {levelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="directory" className="w-full space-y-6">
        <TabsList className="bg-white p-1 rounded-2xl border border-gray-100 h-14 w-full md:w-auto">
          <TabsTrigger value="directory" className="rounded-xl px-8 h-full font-bold data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            <Users className="w-4 h-4 mr-2" /> Directory
          </TabsTrigger>
          <TabsTrigger value="tree" className="rounded-xl px-8 h-full font-bold data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            <Network className="w-4 h-4 mr-2" /> Genealogy Tree
          </TabsTrigger>
        </TabsList>

        <TabsContent value="directory" className="m-0">
          <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
            <CardHeader className="border-b border-gray-50 p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <CardTitle className="text-lg font-bold">Team Directory</CardTitle>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input placeholder="Search members..." className="pl-10 h-10 rounded-xl border-gray-200 w-full md:w-64" />
                  </div>
                  <Button variant="outline" size="icon" className="rounded-xl border-gray-200">
                    <Filter size={18} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50/50">
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Member</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Level</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Rank</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {teamMembers.map((member) => (
                      <tr key={member.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                              {member.first_name[0]}{member.last_name[0]}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-900">{member.first_name} {member.last_name}</p>
                              <p className="text-xs text-gray-500">Joined {format(new Date(member.created_at), 'MMM d, yyyy')}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className="rounded-full border-gray-200 text-gray-600">
                            Level 1
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-gray-700 capitalize">{member.role}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5">
                            <div className={`w-2 h-2 rounded-full ${member.subscription_status === 'active' ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
                            <span className={`text-sm font-medium ${member.subscription_status === 'active' ? 'text-emerald-600' : 'text-gray-500'} capitalize`}>
                              {member.subscription_status}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-gray-400 hover:text-indigo-600">
                              <Mail size={16} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-gray-400 hover:text-indigo-600">
                              <Phone size={16} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-gray-400 hover:text-indigo-600">
                              <ChevronRight size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {teamMembers.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                          No team members found. Start referring to grow your network!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tree" className="m-0">
          <GenealogyTree />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamView;