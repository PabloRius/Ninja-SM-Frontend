import Link from "next/link";

export const ContactLink = ({
  onClick,
  muted,
}: {
  onClick?: () => void;
  muted?: boolean;
}) => {
  return (
    <Link
      href="/contact"
      className={`text-sm transition-colors ${
        muted
          ? "text-muted-foreground hover:text-foreground"
          : "font-medium hover:text-emerald-600"
      }`}
      onClick={onClick}
    >
      Contact
    </Link>
  );
};
