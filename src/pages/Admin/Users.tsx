"use client";

import React, { useEffect, useState } from 'react';
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
  Users as UsersIcon,
  Loader2
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
import { supabase } from '@/lib/supabase';
import { format } from 'date-fns';

const UserManagement = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setUsers(data);
    }
    setLoading(false);
  };

  const filteredUsers = users.filter(user => 
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <Input 
                placeholder="Search by name or email..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11 rounded-xl border-slate-200" 
              />
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="h-11 rounded-xl border-slate-200">
                <Filter className="mr-2 w-4 h-4" /> Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center p-20">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Joined</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                            {user.first_name[0]}{user.last_name[0]}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{user.first_name} {user.last_name}</p>
                            <p className="text-xs text-slate-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-slate-700 capitalize">{user.role}</span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={`rounded-full border-none font-bold ${
                          user.subscription_status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {user.subscription_status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {format(new Date(user.created_at), 'MMM d, yyyy')}
                      </td>
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
                                <DialogDescription>Comprehensive overview of {user.first_name}'s account.</DialogDescription>
                              </DialogHeader>
                              <div className="py-6 space-y-6">
                                <div className="flex items-center gap-4">
                                  <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 text-2xl font-bold">
                                    {user.first_name[0]}{user.last_name[0]}
                                  </div>
                                  <div>
                                    <h3 className="text-xl font-bold text-slate-900">{user.first_name} {user.last_name}</h3>
                                    <p className="text-sm text-slate-500">{user.email}</p>
                                    <Badge className="mt-2 bg-indigo-50 text-indigo-600 border-none capitalize">{user.role}</Badge>
                                  </div>
                                </div>
                                
                                <Separator />
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="text-center p-4 bg-slate-50 rounded-2xl">
                                    <UsersIcon className="w-5 h-5 text-emerald-600 mx-auto mb-2" />
                                    <p className="text-[10px] text-slate-500 uppercase font-bold">Referrer ID</p>
                                    <p className="text-sm font-bold text-slate-900 truncate">{user.referrer_id || 'None'}</p>
                                  </div>
                                  <div className="text-center p-4 bg-slate-50 rounded-2xl">
                                    <Wallet className="w-5 h-5 text-amber-600 mx-auto mb-2" />
                                    <p className="text-[10px] text-slate-500 uppercase font-bold">Status</p>
                                    <p className="text-sm font-bold text-slate-900 capitalize">{user.subscription_status}</p>
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
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;