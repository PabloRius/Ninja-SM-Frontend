"use client";
import { User } from "@/schemas";
import { createContext } from "react";

type BaseProfileContextType = {
  profile: null | { name: string };
  isLoggedIn: boolean;
  logout: () => void;
};

type LoggedContextType = BaseProfileContextType & {
  isLoggedIn: true;
  profile: User;
};
type NotLoggedContextType = BaseProfileContextType & {
  isLoggedIn: false;
  profile: null;
};
export type ProfileContextType = LoggedContextType | NotLoggedContextType;

export const ProfileContext = createContext<ProfileContextType>({
  profile: null,
  isLoggedIn: false,
  logout: () => {},
});
