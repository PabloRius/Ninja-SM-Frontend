import Link from "next/link";

export const PrivacyLink = () => {
  return (
    <Link
      href="/privacy"
      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      Privacy Policy
    </Link>
  );
};
