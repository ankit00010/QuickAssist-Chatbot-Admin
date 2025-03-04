"use client";
import React, { useContext, useState } from "react";
import "./style.css";
import { BiEdit } from "react-icons/bi";
import { TbTrash } from "react-icons/tb";
import PopUp from "@/components/pop-up";
import Pagination from "@/components/pagination";
import { AdminContext, AdminContextType } from "@/context/admin_context";
import { useRouter } from "next/navigation";
const FAQBody = () => {
  const { faqData, setFaqData, deleteApi, setPagination, pagination } =
    useContext(AdminContext) as AdminContextType;
  const [popUp, setPopUp] = useState<boolean>(false);
  const [deleteID, setDeleteID] = useState<string | null>(null);
  // const [faqData, setFaqData] = useState([
  //   {
  //     id: 1,
  //     question: "What is the purpose of a company?",
  //     answer:
  //       "A company's purpose is to provide value to customers by offering products or services while generating profit.",
  //   },
  //   {
  //     id: 2,
  //     question: "How does customer service work?",
  //     answer:
  //       "Customer service helps resolve customer inquiries, complaints, and support requests through various channels like phone, email, and chat.",
  //   },
  //   {
  //     id: 3,
  //     question: "What are the benefits of online business?",
  //     answer:
  //       "Online businesses offer flexibility, global reach, lower operational costs, and 24/7 availability to customers.",
  //   },
  //   {
  //     id: 4,
  //     question: "What is digital marketing?",
  //     answer:
  //       "Digital marketing involves promoting products or services using online platforms like social media, search engines, and email.",
  //   },
  //   {
  //     id: 5,
  //     question: "How can businesses improve customer retention?",
  //     answer:
  //       "Businesses can improve customer retention by providing excellent service, personalized offers, loyalty programs, and engaging communication.",
  //   },
  // ]);
  const router = useRouter();
  const handleDeleteClick = (_id: string) => {
    setDeleteID(_id);
    setPopUp(true);
  };

  const handlePopupStatus = async (confirm: boolean) => {
    if (confirm && deleteID !== null) {
      //Remove the selected Item
      const result = await deleteApi(deleteID);

      if (result) {
        setFaqData(faqData.filter((data) => data.faq_id !== deleteID));
      }
    }

    setPopUp(false);
    setDeleteID(null);
  };
  return (
    <div className="faq-body-container">
      {faqData.length > 0 ? (
        <table className="faq-table">
          <thead>
            <tr>
              <th>Questions</th>
              <th>Answers</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {faqData.map((faq) => (
              <tr key={faq.faq_id}>
                <td>{faq.question}</td>
                <td>{faq.answer}</td>
                <td className="faq-actions">
                  <button className="action-btn edit">
                    <BiEdit
                      onClick={() => {
                        router.push(`/edit/${faq.faq_id}`);
                      }}
                    />
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={() => {
                      if (faq.faq_id) {
                        handleDeleteClick(faq.faq_id);
                        setPopUp(true);
                      }
                    }}
                  >
                    <TbTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="faq-default-message">
          <p className="faq-default-message-text">
            No FAQs available. Add some to get started!
          </p>
        </div>
      )}
      {popUp && (
        <div className="pop-up">
          <PopUp
            handleStatus={handlePopupStatus}
            message="Are you sure you want to delete?"
            action1="Yes"
            action2="No"
          />
        </div>
      )}
      <div className="pagination">
        <Pagination setPagination={setPagination} pagination={pagination} />
      </div>
    </div>
  );
};

export default FAQBody;
