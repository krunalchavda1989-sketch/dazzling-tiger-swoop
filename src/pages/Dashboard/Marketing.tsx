"use client";

import React from 'react';
import { 
  Share2, 
  Copy, 
  Download, 
  Image as ImageIcon, 
  FileText, 
  Video,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { showSuccess } from '@/utils/toast';

const MarketingTools = () => {
  const referralLink = `${window.location.origin}/register?ref=USER_ID_123`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    showSuccess("Referral link copied to clipboard!");
  };

  const assets = [
    { title: "NexGen Brand Kit", type: "PDF", size: "4.2 MB", icon: <FileText className="text-indigo-600" /> },
    { title: "Social Media Banners", type: "ZIP", size: "12.8 MB", icon: <ImageIcon className="text-emerald-600" /> },
    { title: "Platform Walkthrough", type: "MP4", size: "24.5 MB", icon: <Video className="text-amber-600" /> },
    { title: "Compensation Plan", type: "PDF", size: "1.5 MB", icon: <FileText className="text-indigo-600" /> },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Marketing Tools</h1>
        <p className="text-gray-500">Everything you need to promote NexGen and grow your team.</p>
      </div>

      {/* Referral Link Section */}
      <Card className="border-none shadow-xl rounded-[2.5rem] bg-indigo-600 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <CardContent className="p-10 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold mb-4">Your Referral Link</h2>
              <p className="text-indigo-100 mb-8 max-w-md">
                Share this link with your network. Anyone who joins through this link will be added to your Level 1 downline.
              </p>
              <div className="flex items-center gap-2 bg-white/10 p-2 rounded-2xl">
                <code className="px-4 py-2 text-sm font-mono truncate flex-1">
                  {referralLink}
                </code>
                <Button onClick={copyToClipboard} className="bg-white text-indigo-600 hover:bg-indigo-50 rounded-xl font-bold">
                  <Copy size={18} className="mr-2" /> Copy
                </Button>
              </div>
            </div>
            <div className="w-48 h-48 bg-white p-4 rounded-3xl shadow-2xl flex items-center justify-center">
              {/* Placeholder for QR Code */}
              <div className="w-full h-full bg-gray-50 rounded-2xl flex flex-col items-center justify-center text-gray-400">
                <Share2 size={48} className="mb-2" />
                <span className="text-[10px] font-bold uppercase">Scan to Join</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Promotional Assets */}
        <Card className="border-none shadow-sm rounded-[2.5rem] bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Promotional Assets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {assets.map((asset, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-gray-50 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
                    {asset.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{asset.title}</h4>
                    <p className="text-xs text-gray-500">{asset.type} • {asset.size}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-indigo-600">
                  <Download size={18} />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Tips */}
        <Card className="border-none shadow-sm rounded-[2.5rem] bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Success Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              "Personalize your outreach messages for better conversion.",
              "Focus on the benefits of the eCommerce marketplace.",
              "Follow up with pending referrals within 24 hours.",
              "Share your own success stories and earnings."
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-6 h-6 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 flex-shrink-0 mt-0.5">
                  <CheckCircle2 size={14} />
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{tip}</p>
              </div>
            ))}
            <div className="pt-4">
              <Button variant="outline" className="w-full rounded-xl h-12 border-gray-200 font-bold">
                View Training Academy <ExternalLink size={16} className="ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketingTools;