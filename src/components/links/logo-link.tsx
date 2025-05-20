import Link from "next/link";
import { Logo } from "../icons/logo";

export const LogoLink = () => {
  return (
    <div className="flex items-center gap-2">
      <Link href="/" className="flex items-center gap-2">
        <Logo className="h-6 w-6 text-emerald-600" />
        <span className="text-xl hidden sm:block font-bold">Sm Ninja</span>
      </Link>
    </div>
  );
};
