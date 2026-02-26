import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  ShieldCheck,
  Zap,
  Award
} from 'lucide-react';
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  return (
    <div className="min-h-screen bg-white selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">NexGen MLM</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link to="/shop" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">Shop</Link>
              <Link to="#benefits" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">Benefits</Link>
              <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">Login</Link>
              <Button asChild className="rounded-full px-6 bg-indigo-600 hover:bg-indigo-700">
                <Link to="/register">Join Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium mb-6">
                <Zap size={16} />
                <span>The Future of Network Marketing</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-6">
                Build Your Empire with <span className="text-indigo-600">NexGen</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg leading-relaxed">
                A revolutionary 9-level referral system combined with a premium eCommerce marketplace. Start your journey for just ₹2800.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="rounded-full px-8 h-14 text-lg bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200">
                  <Link to="/register">Get Started <ArrowRight className="ml-2 w-5 h-5" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-14 text-lg border-gray-200 hover:bg-gray-50">
                  <Link to="/shop">Browse Products</Link>
                </Button>
              </div>
              <div className="mt-10 flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="text-green-500 w-5 h-5" />
                  <span>Secure Payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="text-amber-500 w-5 h-5" />
                  <span>9-Level Income</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-20 -right-20 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
              <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 p-4 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" 
                  alt="Dashboard Preview" 
                  className="rounded-2xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="benefits" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose NexGen?</h2>
            <p className="text-lg text-gray-600">We've combined the power of direct selling with a high-demand eCommerce platform to create a sustainable income model.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-8 h-8 text-indigo-600" />,
                title: "9-Level Referral Tree",
                description: "Earn commissions from your direct referrals and up to 9 levels deep in your organization."
              },
              {
                icon: <ShoppingBag className="w-8 h-8 text-indigo-600" />,
                title: "Premium Shop",
                description: "Access exclusive distributor pricing on high-quality products with 3-level repurchase income."
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-indigo-600" />,
                title: "Real-time Analytics",
                description: "Track your team growth, wallet balance, and earnings with our advanced dashboard."
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo-600 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-10 left-10 w-64 h-64 border-4 border-white rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-96 h-96 border-4 border-white rounded-full"></div>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 relative z-10">Ready to start your journey?</h2>
            <p className="text-indigo-100 text-lg mb-10 max-w-2xl mx-auto relative z-10">
              Join thousands of successful distributors and start building your financial freedom today.
            </p>
            <Button asChild size="lg" className="rounded-full px-10 h-16 text-xl bg-white text-indigo-600 hover:bg-indigo-50 relative z-10">
              <Link to="/register">Join NexGen Now</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-white w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-gray-900">NexGen MLM</span>
          </div>
          <p className="text-gray-500 text-sm mb-4">© 2024 NexGen MLM Platform. All rights reserved.</p>
          <MadeWithDyad />
        </div>
      </footer>
    </div>
  );
};

export default Index;