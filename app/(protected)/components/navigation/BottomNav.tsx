"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  label: string
  href: string 
  icon: LucideIcon
}

export function BottomNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname()

  return (
    <nav className="sticky bottom-0 left-0 right-0 z-50 bg-background border-t border-border">
      <div className="max-w-md mx-auto flex items-center justify-around px-4 py-2">
        {items.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href

          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-1 min-w-14 py-1"
            >
              <div
                className={cn(
                  "flex items-center justify-center w-16 h-8 rounded-full transition-all",
                  isActive && "bg-[#FFF7E4]"
                )}
              >
                <Icon
                  size={20}
                  className={cn(
                    "transition-colors",
                    isActive ? "text-[#E8A020]" : "text-[#6A6A6A]"
                  )}
                />
              </div>
              <span
                className={cn(
                  "text-[10px] font-medium transition-colors font-cabinet",
                  isActive ? "text-[#E8A020]" : "text-[#6A6A6A]"
                )}
              >
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}