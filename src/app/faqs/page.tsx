"use client"
import FAQBody from "@/container/faq-body";
import FaqHeader from "@/container/faq-header";
import { AdminContext, AdminContextType } from "@/context/admin_context";
import React, { useContext, useEffect } from "react";

const FAQs = () => {
  const {getFaqData}=useContext(AdminContext) as  AdminContextType;
  useEffect(() => {
  getFaqData();
  }, []);
  return (
    <div>
      <FaqHeader />
      <FAQBody />
    </div>
  );
};

export default FAQs;
