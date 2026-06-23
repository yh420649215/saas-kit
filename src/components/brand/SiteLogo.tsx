import Link from "next/link";
import { siteConfig } from "@/config/site";

export function SiteLogo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2 font-bold text-xl">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        S
      </div>
      <span>{siteConfig.name}</span>
    </Link>
  );
}
