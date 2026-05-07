import { cn } from "@/lib/utils";
import {
  BarChart3,
  Car,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  LayoutDashboard,
  ScrollText,
  Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";
import ProfileBar from "../ProfileBar";
import { useState } from "react";
import Link from "next/link";

const NAV_ITEMS = [
  {
    section: "MAIN",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Vehicles", href: "/dashboard/vehicles", icon: Car },
      {
        label: "Mechanic Verify",
        href: "/dashboard/mechanic-verify",
        icon: ClipboardCheck,
      },
      { label: "Status Board", href: "/dashboard/status-board", icon: BarChart3 },
      {
        label: "Parts Manifest",
        href: "/dashboard/parts-manifest",
        icon: ScrollText,
      },
    ],
  },
  {
    section: "REPORTS",
    items: [
      { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
      { label: "Audit Log", href: "/dashboard/audit-log", icon: ScrollText },
      { label: "Settings", href: "/dashboard/settings", icon: Settings },
    ],
  },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const pathname = usePathname();
  return (
    <aside
      className={cn(
        "flex flex-col bg-white border-r border-border transition-all duration-300 shrink-0",
        collapsed ? "w-16" : "w-52",
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-6 border-b border-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <img
              src="/icons/primary-logo.svg"
              alt="Revela"
              className="h-6 w-auto"
            />
            <span className="text-xs font-bold bg-[#E8A020] text-white px-1.5 py-0.5 rounded">
              ADMIN
            </span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 space-y-6 px-2">
        {NAV_ITEMS.map((section) => (
          <div key={section.section}>
            {!collapsed && (
              <p className="text-[10px] font-bold text-muted-foreground tracking-widest px-2 mb-2">
                {section.section}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname.endsWith(item.href);

      
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-all",
                      isActive
                        ? "bg-[#FFF7E4] text-[#E8A020] font-bold"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <item.icon size={16} className="shrink-0" />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User */}
      <ProfileBar collapsed={collapsed}/>
    </aside>
  );
};

export default Sidebar;
