"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { unlock } from "@/lib/usage-limits";

export function UnlockHandler() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("unlocked") === "true") {
      unlock();
    }
  }, [searchParams]);

  return null;
}
