import Link from "next/link";

export const ProfileLink = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Link
      href="/profile"
      className="text-sm hover:text-emerald-600 transition-colors"
      onClick={onClick}
    >
      Profile
    </Link>
  );
};
