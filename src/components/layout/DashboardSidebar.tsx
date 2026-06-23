"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { dashboardLinks } from "@/config/navigation";
import { SiteLogo } from "@/components/brand/SiteLogo";

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r bg-background md:block">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b px-6">
          <SiteLogo />
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 p-4">
          {dashboardLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={buttonVariants({
                  variant: isActive ? "secondary" : "ghost",
                  className: cn(
                    "w-full justify-start gap-3",
                    isActive && "font-medium"
                  ),
                })}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t p-4">
          <Link
            href="/api/auth/signout"
            className={buttonVariants({
              variant: "ghost",
              className: "w-full justify-start gap-3 text-muted-foreground",
            })}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Link>
        </div>
      </div>
    </aside>
  );
}
