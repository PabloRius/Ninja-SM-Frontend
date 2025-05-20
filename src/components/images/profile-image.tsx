import { useProfile } from "@/hooks/use-profile";

export const ProfileImage = () => {
  const { profile } = useProfile();

  const getInitials = (name?: string) => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  const initials = getInitials(profile?.name);

  return (
    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
      {initials}
    </div>
  );
};
