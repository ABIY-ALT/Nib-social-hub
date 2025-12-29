"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Share2,
  Calendar,
  PenSquare,
  Inbox,
  Radio,
  Bot,
  ShieldAlert,
  BarChart3,
  Megaphone,
  Users,
  Image,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const menu = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Social Accounts", path: "/social-accounts", icon: Share2 },
  { name: "Content Planner", path: "/content-planner", icon: Calendar },
  { name: "Post Composer", path: "/post-composer", icon: PenSquare },
  {
    name: "Inbox",
    path: "/inbox",
    icon: Inbox,
    badge: 5,
  },
  {
    name: "Mentions & Listening",
    path: "/listening",
    icon: Radio,
  },

  { section: "AI FEATURES" },

  {
    name: "AI Content Creator",
    path: "/ai-content",
    icon: Bot,
  },
  {
    name: "AI Content Risk Check",
    path: "/ai-risk",
    icon: ShieldAlert,
    badge: 2,
  },

  { section: "INSIGHTS" },

  { name: "Analytics & Reports", path: "/analytics", icon: BarChart3 },
  { name: "Campaigns", path: "/campaigns", icon: Megaphone },
  { name: "Team & Approvals", path: "/team", icon: Users },
  { name: "Media Library", path: "/media", icon: Image },
  { name: "Settings", path: "/settings", icon: Settings },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`
        ${collapsed ? "w-20" : "w-64"}
       bg-white dark:bg-gray-800 border-r dark:border-gray-700 min-h-screen transition-all duration-300
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        {!collapsed && (
          <span className="text-lg font-bold text-gray-800 dark:text-white">Social Hub</span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      {/* Menu */}
      <nav className="p-3 space-y-1">
        {menu.map((item, index) => {
          if ("section" in item && item.section) {
            return (
              !collapsed && (
                <div
                  key={index}
                  className="mt-4 mb-2 px-3 text-xs font-semibold text-gray-400 uppercase"
                >
                  {item.section}
                </div>
              )
            );
          }
          
          if(!("path" in item)) return null;

          const Icon = item.icon;
          const active = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              title={collapsed ? item.name : ""}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm
                ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }
                ${collapsed ? "justify-center" : ""}
              `}
            >
              <Icon size={18} />
              {!collapsed && (
                <>
                  <span className="flex-1">{item.name}</span>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}