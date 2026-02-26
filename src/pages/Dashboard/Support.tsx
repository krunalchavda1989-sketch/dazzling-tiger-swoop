"use client";

import React from 'react';
import { 
  MessageSquare, 
  HelpCircle, 
  Mail, 
  Phone, 
  FileText,
  ChevronRight,
  Search
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Support = () => {
  const faqs = [
    {
      question: "How do I earn referral commissions?",
      answer: "You earn commissions when someone joins NexGen using your referral link and pays the subscription fee. Commissions are distributed up to 9 levels deep in your organization."
    },
    {
      question: "What is the minimum withdrawal amount?",
      answer: "The minimum withdrawal amount is ₹500. Withdrawals are processed within 24-48 hours to your registered bank account."
    },
    {
      question: "How does repurchase income work?",
      answer: "Repurchase income is earned when members in your downline (up to 3 levels) purchase products from the NexGen marketplace."
    },
    {
      question: "How do I upgrade my rank?",
      answer: "Ranks are upgraded based on your direct referrals and total team size. For example, Silver rank requires 3 direct referrals."
    }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900">How can we help?</h1>
        <p className="text-gray-500 text-lg">Search our knowledge base or contact our support team.</p>
        <div className="relative max-w-2xl mx-auto mt-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input 
            placeholder="Search for help articles..." 
            className="pl-12 h-14 rounded-2xl border-gray-200 shadow-sm text-lg focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Card className="border-none shadow-sm rounded-[2.5rem] bg-white overflow-hidden">
            <CardHeader className="p-8 border-b border-gray-50">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <HelpCircle className="text-indigo-600" /> Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-gray-100">
                    <AccordionTrigger className="text-left font-bold text-gray-900 hover:text-indigo-600 hover:no-underline py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <div className="grid sm:grid-cols-2 gap-6">
            <Card className="border-none shadow-sm rounded-3xl bg-indigo-50 border border-indigo-100">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 mb-4 shadow-sm">
                  <FileText size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">User Manual</h3>
                <p className="text-sm text-gray-600 mb-4">Download our comprehensive guide to mastering the NexGen platform.</p>
                <Button variant="link" className="p-0 text-indigo-600 font-bold h-auto">
                  Download PDF <ChevronRight size={16} className="ml-1" />
                </Button>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm rounded-3xl bg-emerald-50 border border-emerald-100">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 mb-4 shadow-sm">
                  <MessageSquare size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Live Chat</h3>
                <p className="text-sm text-gray-600 mb-4">Chat with our support agents in real-time for immediate assistance.</p>
                <Button variant="link" className="p-0 text-emerald-600 font-bold h-auto">
                  Start Chat <ChevronRight size={16} className="ml-1" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-8">
          <Card className="border-none shadow-sm rounded-[2.5rem] bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 flex-shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Email Support</p>
                  <p className="text-sm font-bold text-gray-900">support@nexgen.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 flex-shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Phone Support</p>
                  <p className="text-sm font-bold text-gray-900">+91 1800-NEX-GEN</p>
                </div>
              </div>
              <Separator />
              <div className="pt-2">
                <h4 className="font-bold text-gray-900 mb-4">Send a Message</h4>
                <form className="space-y-4">
                  <Input placeholder="Subject" className="rounded-xl h-11" />
                  <textarea 
                    placeholder="How can we help?" 
                    className="w-full rounded-xl border border-gray-200 p-3 min-h-[120px] text-sm focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  ></textarea>
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 rounded-xl h-11 font-bold">
                    Send Message
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Support;