"use client";

import React from 'react';
import { 
  Bell, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  Package,
  Clock
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';

const NotificationDropdown = () => {
  const notifications = [
    {
      id: 1,
      title: "New Commission Earned",
      description: "You earned ₹140 from Level 2 referral.",
      time: new Date(),
      icon: <TrendingUp className="text-emerald-600" />,
      unread: true
    },
    {
      id: 2,
      title: "New Team Member",
      description: "John Doe joined your Level 1 downline.",
      time: new Date(Date.now() - 3600000),
      icon: <Users className="text-indigo-600" />,
      unread: true
    },
    {
      id: 3,
      title: "Order Shipped",
      description: "Your order ORD-7A2B is on its way.",
      time: new Date(Date.now() - 86400000),
      icon: <Package className="text-amber-600" />,
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-xl text-gray-400 hover:text-indigo-600 hover:bg-indigo-50">
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 rounded-2xl border-gray-100 shadow-xl p-2">
        <div className="flex items-center justify-between px-4 py-2">
          <DropdownMenuLabel className="text-base font-bold p-0">Notifications</DropdownMenuLabel>
          <Button variant="ghost" size="sm" className="text-xs text-indigo-600 hover:text-indigo-700 h-auto p-0">
            Mark all as read
          </Button>
        </div>
        <DropdownMenuSeparator className="my-2" />
        <div className="max-h-[400px] overflow-y-auto">
          {notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} className="flex items-start gap-4 p-3 rounded-xl cursor-pointer focus:bg-gray-50">
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                {notification.icon}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className={`text-sm font-bold ${notification.unread ? 'text-gray-900' : 'text-gray-600'}`}>
                    {notification.title}
                  </p>
                  {notification.unread && (
                    <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                  )}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {notification.description}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-gray-400">
                  <Clock size={10} />
                  {format(notification.time, 'h:mm a')}
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </div>
        <DropdownMenuSeparator className="my-2" />
        <Button variant="ghost" className="w-full text-sm font-bold text-gray-500 hover:text-indigo-600 rounded-xl">
          View All Notifications
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;