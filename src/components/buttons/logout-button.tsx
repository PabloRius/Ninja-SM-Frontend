import { useProfile } from "@/hooks/use-profile";

export const LogoutButton = ({ onClick }: { onClick?: () => void }) => {
  const { logout } = useProfile();
  return (
    <button
      className="text-sm text-left text-red-500 hover:text-red-600 transition-colors"
      onClick={() => {
        logout();
        onClick && onClick();
      }}
    >
      Log out
    </button>
  );
};
