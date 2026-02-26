"use client";

import React from 'react';
import { 
  Settings as SettingsIcon, 
  Shield, 
  Globe, 
  Mail, 
  Database,
  Save,
  Lock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { showSuccess } from '@/utils/toast';

const AdminSettings = () => {
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("Platform settings updated successfully!");
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Platform Settings</h1>
        <p className="text-slate-500">Configure global parameters for the NexGen MLM & eCommerce engine.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* General Settings */}
          <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                  <Globe size={20} />
                </div>
                <div>
                  <CardTitle>General Configuration</CardTitle>
                  <CardDescription>Basic platform identity and regional settings.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Platform Name</Label>
                  <Input id="siteName" defaultValue="NexGen MLM" className="h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input id="supportEmail" defaultValue="support@nexgen.com" className="h-12 rounded-xl" />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <div className="space-y-0.5">
                  <Label className="text-base">Maintenance Mode</Label>
                  <p className="text-sm text-slate-500">Disable public access to the platform.</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* MLM Parameters */}
          <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                  <Shield size={20} />
                </div>
                <div>
                  <CardTitle>MLM Engine Rules</CardTitle>
                  <CardDescription>Define subscription fees and commission structures.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="subFee">Subscription Fee (₹)</Label>
                  <Input id="subFee" type="number" defaultValue="2800" className="h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minWithdraw">Min. Withdrawal (₹)</Label>
                  <Input id="minWithdraw" type="number" defaultValue="500" className="h-12 rounded-xl" />
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <Label className="text-base font-bold">Level 1 Commission (%)</Label>
                <Input type="number" defaultValue="5" className="h-12 rounded-xl" />
                <p className="text-xs text-slate-400">This percentage is applied to the subscription fee for direct referrals.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          {/* Quick Actions */}
          <Card className="border-none shadow-sm rounded-3xl bg-slate-900 text-white">
            <CardContent className="p-8">
              <h3 className="text-lg font-bold mb-4">System Health</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Database Status</span>
                  <span className="text-emerald-400 font-bold">Healthy</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">API Latency</span>
                  <span className="text-emerald-400 font-bold">24ms</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Storage Used</span>
                  <span className="text-slate-200 font-bold">12.4 GB</span>
                </div>
              </div>
              <Button className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold">
                <Database className="w-4 h-4 mr-2" /> Run Backup
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-3xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Admin Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full h-12 rounded-xl border-slate-200 justify-start px-4">
                <Lock className="w-4 h-4 mr-3 text-slate-400" /> Change Admin Password
              </Button>
              <Button variant="outline" className="w-full h-12 rounded-xl border-slate-200 justify-start px-4">
                <Shield className="w-4 h-4 mr-3 text-slate-400" /> 2FA Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" className="h-12 rounded-xl px-8">Cancel</Button>
        <Button onClick={handleSave} className="h-12 rounded-xl px-8 bg-indigo-600 hover:bg-indigo-700 font-bold">
          <Save className="w-4 h-4 mr-2" /> Save All Settings
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;