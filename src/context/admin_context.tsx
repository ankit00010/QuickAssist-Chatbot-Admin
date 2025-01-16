"use client";  
import React, { createContext, ReactNode } from "react";

export interface AdminContextType {}

export const AdminContext = createContext<AdminContextType | null>(null);

const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const admin_context_value = {};

  return (
    <AdminContext.Provider value={admin_context_value}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
