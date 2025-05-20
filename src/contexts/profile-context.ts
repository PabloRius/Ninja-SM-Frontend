"use client";
import { createContext } from "react";
import { User } from "../../prisma/user";

type BaseProfileContextType = {
  profile: null | { name: string };
  isLoggedIn: boolean;
  logout: () => void;
  login: () => void;
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
  login: () => {},
});
