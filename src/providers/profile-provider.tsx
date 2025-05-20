"use client";

import { ProfileContext, ProfileContextType } from "@/contexts/profile-context";
import type { User } from "@prisma/client";
import { signOut, useSession } from "next-auth/react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

export function ProfileProvider({ children }: { children: ReactNode }) {
  const { status } = useSession();
  const [profile, setProfile] = useState<User | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (status === "authenticated") {
        try {
          const res = await fetch("/api/me");
          if (!res.ok) throw new Error("Failed to fetch profile");
          const data = await res.json();
          setProfile(data);
        } catch (err) {
          console.error("Error loading profile:", err);
          signOut();
        }
      } else if (status === "unauthenticated") {
        setProfile(null);
      }
    };

    fetchProfile();
  }, [status]);

  const value: ProfileContextType = profile
    ? {
        profile,
        isLoggedIn: true,
        logout: () => signOut(),
        login: () => {},
      }
    : {
        profile: null,
        isLoggedIn: false,
        logout: () => signOut(),
        login: () => {},
      };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}
