import Link from "next/link";

export const AboutLink = ({
  onClick,
  muted,
}: {
  onClick?: () => void;
  muted?: boolean;
}) => {
  return (
    <Link
      href="/about"
      className={`text-sm transition-colors ${
        muted
          ? "text-muted-foreground hover:text-foreground"
          : "font-medium hover:text-emerald-600"
      }`}
      onClick={onClick}
    >
      About
    </Link>
  );
};
