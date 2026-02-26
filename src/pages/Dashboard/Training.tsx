"use client";

import React from 'react';
import { 
  Play, 
  BookOpen, 
  Download, 
  CheckCircle2, 
  Clock, 
  Star,
  ChevronRight,
  Search
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const TrainingAcademy = () => {
  const courses = [
    {
      title: "NexGen Fundamentals",
      description: "Master the basics of our 9-level compensation plan and marketplace.",
      duration: "45 mins",
      lessons: 5,
      progress: 100,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "Advanced Sales Techniques",
      description: "Learn how to effectively pitch products and close high-ticket deals.",
      duration: "1.5 hours",
      lessons: 8,
      progress: 45,
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "Team Leadership 101",
      description: "Strategies for managing and motivating your downline organization.",
      duration: "2 hours",
      lessons: 12,
      progress: 0,
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400"
    }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Training Academy</h1>
          <p className="text-gray-500 mt-1">Level up your skills and maximize your earnings.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input placeholder="Search courses..." className="pl-10 h-11 rounded-xl border-gray-200" />
        </div>
      </div>

      {/* Featured Course */}
      <Card className="border-none shadow-xl rounded-[2.5rem] bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 hidden lg:block">
          <img 
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800" 
            alt="Featured" 
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="p-10 lg:p-16 relative z-10 lg:w-2/3">
          <Badge className="bg-indigo-500 text-white border-none mb-6 px-4 py-1 rounded-full">New Course</Badge>
          <h2 className="text-4xl font-bold mb-4">Digital Marketing for Networkers</h2>
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
            Learn how to leverage social media to build a global team without ever leaving your home.
          </p>
          <div className="flex flex-wrap gap-6 mb-10">
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-indigo-400" />
              <span className="text-sm font-medium">3.5 Hours</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen size={20} className="text-indigo-400" />
              <span className="text-sm font-medium">15 Lessons</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={20} className="text-amber-400" />
              <span className="text-sm font-medium">4.9 Rating</span>
            </div>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-2xl h-14 px-8 text-lg font-bold">
            <Play className="mr-2 fill-white" size={20} /> Start Learning
          </Button>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-8">
        {courses.map((course, i) => (
          <Card key={i} className="group border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-[2rem] overflow-hidden bg-white">
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-lg">
                  <Play size={24} className="ml-1 fill-indigo-600" />
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{course.title}</h3>
              <p className="text-sm text-gray-500 mb-6 line-clamp-2">{course.description}</p>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                  <span className="text-gray-400">Progress</span>
                  <span className={course.progress === 100 ? "text-emerald-600" : "text-indigo-600"}>
                    {course.progress}%
                  </span>
                </div>
                <Progress value={course.progress} className="h-2 rounded-full" />
              </div>
            </CardContent>
            <div className="px-6 pb-6">
              <Button variant="outline" className="w-full rounded-xl border-gray-100 hover:bg-gray-50 font-bold">
                {course.progress === 100 ? "Review Course" : course.progress > 0 ? "Continue" : "Enroll Now"}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Resources Section */}
      <div className="pt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Downloadable Resources</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: "Success Roadmap", type: "PDF" },
            { name: "Pitch Deck 2024", type: "PPTX" },
            { name: "Product Catalog", type: "PDF" },
            { name: "Earnings Calculator", type: "XLSX" }
          ].map((res, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between hover:border-indigo-200 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                  <Download size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{res.name}</p>
                  <p className="text-[10px] text-gray-400 font-bold">{res.type}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-gray-300 group-hover:text-indigo-600">
                <ChevronRight size={18} />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainingAcademy;