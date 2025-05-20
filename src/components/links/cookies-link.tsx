import Link from "next/link";

export const CookiesLink = () => {
  return (
    <Link
      href="/cookies"
      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      Cookie Policy
    </Link>
  );
};
