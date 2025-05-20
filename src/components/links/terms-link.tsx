import Link from "next/link";

export const TermsLink = () => {
  return (
    <Link
      href="/terms"
      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      Terms of Service
    </Link>
  );
};
