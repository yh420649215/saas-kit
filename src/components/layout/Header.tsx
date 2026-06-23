"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { SiteLogo } from "@/components/brand/SiteLogo";
import { cn } from "@/lib/utils";
import { mainNavLinks } from "@/config/navigation";

function isActiveLink(pathname: string, href: string) {
  if (!href.includes("#")) return pathname === href;
  return pathname === href.split("#")[0];
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <SiteLogo />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {mainNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActiveLink(pathname, link.href)
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/auth/login" className={buttonVariants({ variant: "ghost" })}>
            Sign In
          </Link>
          <Link href="/auth/register" className={buttonVariants({})}>
            Get Started
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className={buttonVariants({ variant: "ghost", size: "icon", className: "md:hidden" })}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
            <nav className="flex flex-col gap-4 mt-8">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
                <Link
                  href="/auth/login"
                  onClick={() => setOpen(false)}
                  className={buttonVariants({ variant: "outline" })}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setOpen(false)}
                  className={buttonVariants({})}
                >
                  Get Started
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
