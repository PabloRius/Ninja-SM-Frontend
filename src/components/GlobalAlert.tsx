"use client";

import { useAlert } from "@/context/AlertContext";
import { X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export const GlobalAlert = () => {
  const { alert, hideAlert } = useAlert();

  if (!alert) return null;

  const alertStyles = {
    success: "bg-green-100 border-green-400 text-green-700",
    error: "bg-red-100 border-red-400 text-red-700",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
    info: "bg-blue-100 border-blue-400 text-blue-700",
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <Alert className={`${alertStyles[alert.type]} alert-fade-in`}>
        <div className="flex justify-between items-center">
          <div>
            <AlertTitle>
              {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
            </AlertTitle>
            <AlertDescription>{alert.message}</AlertDescription>
          </div>
          <button
            onClick={hideAlert}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </Alert>
    </div>
  );
};
