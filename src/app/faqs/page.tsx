"use client"
import FAQBody from "@/container/faq-body";
import Title from "@/container/faq-header";
// import { AdminContext, AdminContextType } from "@/context/admin_context";
// import React, { useContext, useEffect } from "react";

const FAQs = () => {
  // const {getFaqData,pagination}=useContext(AdminContext) as  AdminContextType;
  // useEffect(() => {
    
  // getFaqData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pagination.page, pagination.category]);
  return (
    <div>
      <Title/>
      <FAQBody />
    </div>
  );
};

export default FAQs;
