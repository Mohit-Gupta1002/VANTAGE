"use client";

import React, { useState } from "react";
import { UserProfile } from "@/types";
import {
  Compass,
  LayoutDashboard,
  Radio,
  History,
  Layers,
  Sparkles,
  GitFork,
  Bookmark,
  Kanban,
  User,
  Search,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Shield,
  Zap,
} from "lucide-react";

export type NavTab =
  | "overview"
  | "feed"
  | "historical"
  | "intersections"
  | "discover"
  | "scenarios"
  | "saved"
  | "tracker"
  | "profile";

interface AppShellProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  profile: UserProfile;
  savedCount: number;
  onOpenSearch: () => void;
  children: React.ReactNode;
}

export function AppShell({
  currentTab,
  onSelectTab,
  profile,
  savedCount,
  onOpenSearch,
  children,
}: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLiveMode, setIsLiveMode] = useState(false);

  const navItems: Array<{
    id: NavTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string | number;
  }> = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "feed", label: "Intelligence Feed", icon: Radio },
    { id: "historical", label: "Historical Intelligence", icon: History },
    { id: "intersections", label: "Intersection Lab", icon: Layers },
    { id: "discover", label: "Discover Opportunities", icon: Compass },
    { id: "scenarios", label: "Future Scenarios", icon: GitFork },
    { id: "saved", label: "My Opportunities", icon: Bookmark, badge: savedCount },
    { id: "tracker", label: "Action Tracker", icon: Kanban },
    { id: "profile", label: "Profile & Settings", icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Telemetry Header */}
      <header className="sticky top-0 z-40 h-14 bg-[#090d14]/90 backdrop-blur-md border-b border-slate-800/80 px-4 flex items-center justify-between">
        {/* Left branding */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg bg-slate-800 text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div
            onClick={() => onSelectTab("overview")}
            className="cursor-pointer flex items-center gap-2 group"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-black text-sm shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              V
            </div>
            <span className="font-extrabold tracking-wider text-base sm:text-lg text-white">
              VANTAGE
            </span>
            <span className="hidden sm:inline-block text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
              Intelligence OS
            </span>
          </div>
        </div>

        {/* Center: Global Search trigger */}
        <div className="flex-1 max-w-md mx-4 hidden sm:block">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-lg bg-[#0c1017] border border-slate-800 text-xs text-slate-400 hover:border-slate-700 hover:text-slate-300 transition"
          >
            <span className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-cyan-400" /> Ask VANTAGE or search signals, opportunities...
            </span>
            <kbd className="font-mono text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Right Telemetry Controls */}
        <div className="flex items-center gap-3 text-xs">
          {/* Mobile search icon */}
          <button
            onClick={onOpenSearch}
            className="sm:hidden p-2 rounded-lg bg-slate-800 text-slate-300"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Mode Switch: Demo vs Live API */}
          <div className="flex items-center gap-1.5 bg-[#0c1017] border border-slate-800 rounded-lg p-1 text-[11px]">
            <button
              onClick={() => setIsLiveMode(false)}
              className={`px-2 py-0.5 rounded transition ${
                !isLiveMode ? "bg-cyan-500/20 text-cyan-300 font-bold" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              Demo Mode
            </button>
            <button
              onClick={() => setIsLiveMode(true)}
              className={`px-2 py-0.5 rounded transition ${
                isLiveMode ? "bg-emerald-500/20 text-emerald-300 font-bold" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              Live Telemetry
            </button>
          </div>

          {/* User Profile Pill */}
          <button
            onClick={() => onSelectTab("profile")}
            className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#0e141f] border border-slate-800 hover:border-cyan-500/40 transition"
          >
            <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[10px]">
              {profile.name.charAt(0)}
            </div>
            <span className="hidden lg:inline text-xs font-semibold text-slate-200">
              {profile.name}
            </span>
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Collapsible Left Sidebar */}
        <aside
          className={`hidden md:flex flex-col border-r border-slate-800/80 bg-[#080c13] transition-all duration-300 ${
            sidebarCollapsed ? "w-16" : "w-64"
          }`}
        >
          {/* Navigation Links */}
          <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  title={sidebarCollapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                    isActive
                      ? "bg-cyan-500/10 text-cyan-300 font-semibold border border-cyan-500/30 shadow-sm shadow-cyan-950/20"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-cyan-400" : "text-slate-400"}`} />
                  {!sidebarCollapsed && (
                    <span className="truncate text-left flex-1">{item.label}</span>
                  )}
                  {!sidebarCollapsed && item.badge !== undefined && Number(item.badge) > 0 && (
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-3 border-t border-slate-800/80 flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="text-[10px] text-slate-500 font-mono">
                VANTAGE v1.0.4-MVP
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition mx-auto"
              aria-label="Toggle sidebar"
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative w-64 bg-[#090d14] border-r border-slate-800 p-4 flex flex-col space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="font-bold text-white tracking-wider">Navigation</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                        isActive
                          ? "bg-cyan-500/10 text-cyan-300 font-semibold border border-cyan-500/30"
                          : "text-slate-400 hover:text-white hover:bg-slate-800"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                      {item.badge !== undefined && Number(item.badge) > 0 && (
                        <span className="ml-auto text-[10px] px-1.5 py-0.2 rounded-full bg-cyan-950 text-cyan-400">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
