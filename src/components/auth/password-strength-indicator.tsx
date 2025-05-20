"use client";

import { useMemo } from "react";

interface PasswordStrengthIndicatorProps {
  password: string;
}

export function PasswordStrengthIndicator({
  password,
}: PasswordStrengthIndicatorProps) {
  const strength = useMemo(() => {
    if (!password) return 0;

    let score = 0;

    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;

    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    return Math.min(4, Math.floor(score / 1.5));
  }, [password]);

  const getStrengthLabel = () => {
    switch (strength) {
      case 0:
        return "Very Weak";
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "";
    }
  };

  const getStrengthColor = () => {
    switch (strength) {
      case 0:
        return "bg-red-500";
      case 1:
        return "bg-orange-500";
      case 2:
        return "bg-yellow-500";
      case 3:
        return "bg-emerald-500";
      case 4:
        return "bg-emerald-600";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div className="mt-2 space-y-2">
      <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className={`${getStrengthColor()} transition-all duration-300`}
          style={{ width: `${(strength / 4) * 100}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground">
        Password strength:{" "}
        <span className="font-medium">{getStrengthLabel()}</span>
      </p>
    </div>
  );
}
