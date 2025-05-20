"use client";

import { useProfile } from "@/hooks/use-profile";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useProfile();
  const router = useRouter();
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    } else {
      setHasCheckedAuth(true);
    }
  }, [isLoggedIn, router]);

  if (!hasCheckedAuth) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
