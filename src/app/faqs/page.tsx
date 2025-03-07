"use client";
import Title from "@/components/header/title";
import FAQBody from "@/container/faq-body";
import FaqHeader from "@/container/faq-header";
import { AdminContext, AdminContextType } from "@/context/admin_context";
import React, { useContext, useEffect } from "react";
import { MdLiveHelp } from "react-icons/md";

const FAQs = () => {
  const { getFaqData, pagination } = useContext(
    AdminContext
  ) as AdminContextType;
  useEffect(() => {
    console.log("Response getting what ");

    getFaqData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, pagination.category]);
  return (
    <div>
      <Title
        header="FAQs"
        context="Manage and organize all FAQs efficiently."
        icon={<MdLiveHelp size={30} />}
      />

      <FaqHeader />
      <FAQBody />
    </div>
  );
};

export default FAQs;
