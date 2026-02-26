"use client";

import React from 'react';
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
  Share2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { showSuccess } from '@/utils/toast';

const TeamView = () => {
  const referralLink = `${window.location.origin}/register?ref=USER_ID_123`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    showSuccess("Referral link copied to clipboard!");
  };

  const teamMembers = [
    { id: 1, name: "John Doe", level: 1, joinDate: "2024-01-15", status: "Active", earnings: "₹4,500", referrals: 12, rank: "Gold" },
    { id: 2, name: "Alice Smith", level: 1, joinDate: "2024-01-20", status: "Active", earnings: "₹2,800", referrals: 8, rank: "Silver" },
    { id: 3, name: "Mike Kane", level: 2, joinDate: "2024-02-05", status: "Inactive", earnings: "₹0", referrals: 0, rank: "Distributor" },
    { id: 4, name: "Rose Lee", level: 2, joinDate: "2024-02-10", status: "Active", earnings: "₹1,200", referrals: 4, rank: "Silver" },
  ];

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

      {/* Referral Link Card */}
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

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm rounded-3xl bg-white">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Team Size</p>
              <h3 className="text-2xl font-bold text-gray-900">156</h3>
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
              <h3 className="text-2xl font-bold text-gray-900">24</h3>
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
              <h3 className="text-2xl font-bold text-gray-900">5 / 9</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Management */}
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
          <Tabs defaultValue="all" className="w-full">
            <div className="px-6 border-b border-gray-50">
              <TabsList className="bg-transparent h-14 gap-8">
                <TabsTrigger value="all" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-indigo-600 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none px-0 h-14 font-bold">All Members</TabsTrigger>
                <TabsTrigger value="direct" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-indigo-600 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none px-0 h-14 font-bold">Direct (Level 1)</TabsTrigger>
                <TabsTrigger value="inactive" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-indigo-600 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none px-0 h-14 font-bold">Inactive</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="m-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50/50">
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Member</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Level</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Rank</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Earnings</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {teamMembers.map((member) => (
                      <tr key={member.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-900">{member.name}</p>
                              <p className="text-xs text-gray-500">Joined {member.joinDate}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className="rounded-full border-gray-200 text-gray-600">
                            Level {member.level}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-gray-700">{member.rank}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5">
                            <div className={`w-2 h-2 rounded-full ${member.status === 'Active' ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
                            <span className={`text-sm font-medium ${member.status === 'Active' ? 'text-emerald-600' : 'text-gray-500'}`}>
                              {member.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-bold text-gray-900">{member.earnings}</span>
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
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamView;