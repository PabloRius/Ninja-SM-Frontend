import Link from "next/link";

export const HomeLink = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Link
      href="/"
      className="text-sm font-medium hover:text-emerald-600 transition-colors"
      onClick={onClick}
    >
      Home
    </Link>
  );
};
