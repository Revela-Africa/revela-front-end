import { Bell, Download, Plus, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const MainContent = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const breadcrumb = pathname
    .split("/")
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" / ");
  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

      <header className="py-5 bg-white border-b border-border flex items-center justify-between px-6 shrink-0">
      
        <p className="text-sm text-muted-foreground">{breadcrumb}</p>

        {/* Search */}
        <div className="flex-1 max-w-sm mx-8">
          <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5">
            <Search size={14} className="text-muted-foreground" />
            <input
              type="text"
              placeholder="Search vehicles, parts..."
              className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <Bell size={16} />
            <span className="text-xs font-bold text-[#E8A020]">Alerts</span>
          </button>
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <Download size={16} />
            <span>Export</span>
          </button>
          <Link
            href="/admin/vehicles/new"
            className="flex items-center gap-1.5 bg-[#E8A020] text-white text-sm font-bold px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
          >
            <Plus size={14} />
            New Intake
          </Link>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
};

export default MainContent;
