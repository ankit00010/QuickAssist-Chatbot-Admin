"use client";
import FaqFormPage from "@/components/faq-form/form_page";
import Title from "@/components/header/title";
import { EditIcon } from "lucide-react";
import React from "react";

interface EditContainerProps {
  id: string;
}

const EditContainer = ({ id }: EditContainerProps) => {
  return (
    <div>
      <Title
        header="Edit FAQs"
        context="Manage and update FAQ entries"
        icon={<EditIcon size={30} />}
      />
      <FaqFormPage id={id} buttonText="Update" values={"edit"} />
    </div>
  );
};

export default EditContainer;
