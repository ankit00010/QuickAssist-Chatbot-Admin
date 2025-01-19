"use client";
import { fetchService } from "@/services/fetch_services";
import { AddFaqsType } from "@/types/add_faqs";
import React, { createContext, ReactNode, useState } from "react";

export interface AdminContextType {
  isAdmin: boolean;
  setAdmin: (adminStatus: boolean) => void;
  addFaqApi: (
    question: string,
    answer: string,
    keywords: string[],
    context: string
  ) => void;
}

export const AdminContext = createContext<AdminContextType | null>(null);

const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdmin, setAdmin] = useState(false);

  //Add FAQ Api

  const addFaqApi = async (
    question: string,
    answer: string,
    keywords: string[],
    context: string
  ) => {
    const faqData = {
      question,
      answer,
      keywords,
      context,
    };
    console.log("Data in Context", faqData);

    const response = await fetchService({
      method: "POST",
      endpoint: `api/add-data`,
      data: faqData,
    });
    const responseData: any = await response.data;
    console.log("Response Data is ", responseData);

    if (response.code === 200) {
      alert(responseData.data.message);
    } else {
      alert(responseData.data.message);
    }
  };
  const admin_context_value = { isAdmin, setAdmin, addFaqApi };

  return (
    <AdminContext.Provider value={admin_context_value}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
