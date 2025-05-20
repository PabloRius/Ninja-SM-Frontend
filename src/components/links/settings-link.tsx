import Link from "next/link";

export const SettingsLink = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Link
      href="/settings"
      className="text-sm hover:text-emerald-600 transition-colors"
      onClick={onClick}
    >
      Settings
    </Link>
  );
};
