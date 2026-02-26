"use client";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Shop Pages
import Shop from "./pages/Shop/Shop";
import ProductDetail from "./pages/Shop/ProductDetail";
import Cart from "./pages/Shop/Cart";
import Checkout from "./pages/Shop/Checkout";

// Auth Pages
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// Dashboard Pages
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardOverview from "./pages/Dashboard/Overview";
import TeamView from "./pages/Dashboard/Team";
import WalletView from "./pages/Dashboard/Wallet";
import Settings from "./pages/Dashboard/Settings";
import UserOrders from "./pages/Dashboard/Orders";
import Support from "./pages/Dashboard/Support";
import MarketingTools from "./pages/Dashboard/Marketing";

// Admin Pages
import AdminLayout from "./components/layout/AdminLayout";
import AdminOverview from "./pages/Admin/Overview";
import UserManagement from "./pages/Admin/Users";
import ProductManagement from "./pages/Admin/Products";
import AdminSettings from "./pages/Admin/Settings";
import AdminOrders from "./pages/Admin/Orders";
import WithdrawalManagement from "./pages/Admin/Withdrawals";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Shop Routes */}
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />

            {/* User Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardOverview />} />
              <Route path="team" element={<TeamView />} />
              <Route path="wallet" element={<WalletView />} />
              <Route path="orders" element={<UserOrders />} />
              <Route path="marketing" element={<MarketingTools />} />
              <Route path="support" element={<Support />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminOverview />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="products" element={<ProductManagement />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="withdrawals" element={<WithdrawalManagement />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;