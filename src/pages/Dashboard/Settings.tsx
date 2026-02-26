"use client";

import React from 'react';
import { User, Lock, CreditCard, Bell, Shield, Save } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { showSuccess } from '@/utils/toast';

const Settings = () => {
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("Settings updated successfully!");
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-500">Manage your profile, security, and payout preferences.</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-white p-1 rounded-2xl border border-gray-100 h-14 mb-8">
          <TabsTrigger value="profile" className="rounded-xl px-6 font-bold data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600">
            <User className="w-4 h-4 mr-2" /> Profile
          </TabsTrigger>
          <TabsTrigger value="payout" className="rounded-xl px-6 font-bold data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600">
            <CreditCard className="w-4 h-4 mr-2" /> Payouts
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-xl px-6 font-bold data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600">
            <Lock className="w-4 h-4 mr-2" /> Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="border-none shadow-sm rounded-[2rem] overflow-hidden">
            <CardHeader className="bg-gray-50/50 border-b border-gray-100 p-8">
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your public profile and contact details.</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Alex" className="h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Johnson" className="h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="alex.j@example.com" className="h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="+91 98765 43210" className="h-12 rounded-xl" />
                  </div>
                </div>
                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 rounded-xl px-8 h-12 font-bold">
                  <Save className="w-4 h-4 mr-2" /> Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payout">
          <Card className="border-none shadow-sm rounded-[2rem] overflow-hidden">
            <CardHeader className="bg-gray-50/50 border-b border-gray-100 p-8">
              <CardTitle>Bank Details</CardTitle>
              <CardDescription>Where you'll receive your commissions and earnings.</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSave} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input id="bankName" placeholder="e.g. HDFC Bank" className="h-12 rounded-xl" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input id="accountNumber" placeholder="0000 0000 0000" className="h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ifsc">IFSC Code</Label>
                      <Input id="ifsc" placeholder="HDFC0001234" className="h-12 rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="upi">UPI ID (Optional)</Label>
                    <Input id="upi" placeholder="alex@okaxis" className="h-12 rounded-xl" />
                  </div>
                </div>
                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 rounded-xl px-8 h-12 font-bold">
                  <Save className="w-4 h-4 mr-2" /> Update Payout Info
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="border-none shadow-sm rounded-[2rem] overflow-hidden">
            <CardHeader className="bg-gray-50/50 border-b border-gray-100 p-8">
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your password and account protection.</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSave} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPass">Current Password</Label>
                    <Input id="currentPass" type="password" placeholder="••••••••" className="h-12 rounded-xl" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="newPass">New Password</Label>
                      <Input id="newPass" type="password" placeholder="••••••••" className="h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPass">Confirm New Password</Label>
                      <Input id="confirmPass" type="password" placeholder="••••••••" className="h-12 rounded-xl" />
                    </div>
                  </div>
                </div>
                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 rounded-xl px-8 h-12 font-bold">
                  Update Password
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;