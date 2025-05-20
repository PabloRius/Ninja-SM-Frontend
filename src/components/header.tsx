"use client";

import { useProfile } from "@/hooks/use-profile";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { LogoutButton } from "./buttons/logout-button";
import { ProfileMenu } from "./buttons/profile-menu";
import { ProfileImage } from "./images/profile-image";
import { AboutLink } from "./links/about-link";
import { ContactLink } from "./links/contact-link";
import { HomeLink } from "./links/home-link";
import { LoginLink } from "./links/login-link";
import { LogoLink } from "./links/logo-link";
import { ProfileLink } from "./links/profile-link";
import { RegisterLink } from "./links/register-link";
import { SavedLink } from "./links/saved-link";
import { SettingsLink } from "./links/settings-link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, profile } = useProfile();

  return (
    <header className="sticky px-4 md:px-6 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between">
        <LogoLink />

        <nav className="hidden md:flex items-center gap-6">
          <HomeLink />
          <AboutLink />
          <ContactLink />
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <ProfileMenu />
          ) : (
            <>
              <LoginLink />
              <RegisterLink />
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden p-4 pt-0 bg-background border-b">
          <nav className="flex flex-col space-y-4 py-4">
            <HomeLink onClick={() => setIsMenuOpen(false)} />
            <AboutLink onClick={() => setIsMenuOpen(false)} />
            <ContactLink onClick={() => setIsMenuOpen(false)} />

            {isLoggedIn ? (
              <div className="pt-4 border-t">
                <div className="flex items-center gap-3 mb-4">
                  <ProfileImage />
                  <span className="font-medium">{profile.name}</span>
                </div>
                <div className="flex flex-col space-y-2">
                  <ProfileLink onClick={() => setIsMenuOpen(false)} />
                  <SavedLink onClick={() => setIsMenuOpen(false)} />
                  <SettingsLink onClick={() => setIsMenuOpen(false)} />

                  <LogoutButton onClick={() => setIsMenuOpen(false)} />
                </div>
              </div>
            ) : (
              <div className="pt-4 border-t flex flex-col space-y-2">
                <LoginLink onClick={() => setIsMenuOpen(false)} />
                <RegisterLink onClick={() => setIsMenuOpen(false)} />
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
