"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type AlertType = "success" | "error" | "warning" | "info";

interface Alert {
  message: string;
  type: AlertType;
}

interface AlertContextType {
  showAlert: (message: string, type: AlertType) => void;
  hideAlert: () => void;
  alert: Alert | null;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<Alert | null>(null);

  const showAlert = (message: string, type: AlertType) => {
    setAlert({ message, type });

    setTimeout(() => {
      hideAlert();
    }, 5000);
  };

  const hideAlert = () => {
    setAlert(null);
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
