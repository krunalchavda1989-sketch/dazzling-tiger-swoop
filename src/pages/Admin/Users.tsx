"use client";

import React from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  UserCheck, 
  UserX, 
  Mail,
  Download,
  Eye,
  TrendingUp,
  Wallet,
  Users as UsersIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

const UserManagement = () => {
  const users = [
    { id: 1, name: "Alex Johnson", email: "alex@example.com", role: "Distributor", status: "Active", joined: "2024-01-10", earnings: "₹45,200", referrals: 24, level: 1 },
    { id: 2, name: "Sarah Miller", email: "sarah@example.com", role: "Distributor", status: "Pending", joined: "2024-03-15", earnings: "₹0", referrals: 0, level: 1 },
    { id: 3, name: "Mike Ross", email: "mike@example.com", role: "Admin", status: "Active", joined: "2023-12-01", earnings: "N/A", referrals: 0, level: 0 },
    { id: 4, name: "Emma Wilson", email: "emma@example.com", role: "Distributor", status: "Active", joined: "2024-02-20", earnings: "₹12,800", referrals: 8, level: 2 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
          <p className="text-slate-500">Manage all platform users and their subscription status.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-xl h-11">
          <Download className="mr-2 w-4 h-4" /> Export Users
        </Button>
      </div>

      <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
        <CardHeader className="border-b border-slate-50 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input placeholder="Search by name, email or ID..." className="pl-10 h-11 rounded-xl border-slate-200" />
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="h-11 rounded-xl border-slate-200">
                <Filter className="mr-2 w-4 h-4" /> Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Earnings</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{user.name}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-slate-700">{user.role}</span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={`rounded-full border-none font-bold ${
                        user.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{user.joined}</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900">{user.earnings}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-indigo-600">
                              <Eye size={18} />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px] rounded-[2.5rem]">
                            <DialogHeader>
                              <DialogTitle className="text-2xl font-bold">User Details</DialogTitle>
                              <DialogDescription>Comprehensive overview of {user.name}'s account.</DialogDescription>
                            </DialogHeader>
                            <div className="py-6 space-y-6">
                              <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 text-2xl font-bold">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                  <h3 className="text-xl font-bold text-slate-900">{user.name}</h3>
                                  <p className="text-sm text-slate-500">{user.email}</p>
                                  <Badge className="mt-2 bg-indigo-50 text-indigo-600 border-none">{user.role}</Badge>
                                </div>
                              </div>
                              
                              <Separator />
                              
                              <div className="grid grid-cols-3 gap-4">
                                <div className="text-center p-4 bg-slate-50 rounded-2xl">
                                  <TrendingUp className="w-5 h-5 text-indigo-600 mx-auto mb-2" />
                                  <p className="text-[10px] text-slate-500 uppercase font-bold">Earnings</p>
                                  <p className="text-sm font-bold text-slate-900">{user.earnings}</p>
                                </div>
                                <div className="text-center p-4 bg-slate-50 rounded-2xl">
                                  <UsersIcon className="w-5 h-5 text-emerald-600 mx-auto mb-2" />
                                  <p className="text-[10px] text-slate-500 uppercase font-bold">Referrals</p>
                                  <p className="text-sm font-bold text-slate-900">{user.referrals}</p>
                                </div>
                                <div className="text-center p-4 bg-slate-50 rounded-2xl">
                                  <Wallet className="w-5 h-5 text-amber-600 mx-auto mb-2" />
                                  <p className="text-[10px] text-slate-500 uppercase font-bold">Level</p>
                                  <p className="text-sm font-bold text-slate-900">{user.level}</p>
                                </div>
                              </div>

                              <div className="space-y-3">
                                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 rounded-xl h-12 font-bold">
                                  <Mail className="w-4 h-4 mr-2" /> Send Message
                                </Button>
                                <div className="grid grid-cols-2 gap-3">
                                  <Button variant="outline" className="rounded-xl h-12 border-slate-200 text-emerald-600 hover:bg-emerald-50">
                                    <UserCheck className="w-4 h-4 mr-2" /> Activate
                                  </Button>
                                  <Button variant="outline" className="rounded-xl h-12 border-slate-200 text-red-600 hover:bg-red-50">
                                    <UserX className="w-4 h-4 mr-2" /> Suspend
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400">
                              <MoreVertical size={18} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-xl border-slate-100 shadow-xl">
                            <DropdownMenuItem className="gap-2 cursor-pointer">
                              <UserCheck size={16} className="text-emerald-600" /> Activate User
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 cursor-pointer">
                              <Mail size={16} className="text-indigo-600" /> Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 cursor-pointer text-red-600">
                              <UserX size={16} /> Suspend User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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

export default UserManagement;