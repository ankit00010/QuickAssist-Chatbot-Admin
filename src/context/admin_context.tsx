"use client";  
import React, { createContext, ReactNode, useState } from "react";

export interface AdminContextType {
  isAdmin: boolean;
  setAdmin: (adminStatus: boolean) => void;
}

export const AdminContext = createContext<AdminContextType | null>(null);

const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdmin, setAdmin] = useState(false);
  const admin_context_value = {isAdmin,setAdmin};

  return (
    <AdminContext.Provider value={admin_context_value}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
