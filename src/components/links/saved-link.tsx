import Link from "next/link";

export const SavedLink = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Link
      href="/saved"
      className="text-sm hover:text-emerald-600 transition-colors"
      onClick={onClick}
    >
      Saved Items
    </Link>
  );
};
