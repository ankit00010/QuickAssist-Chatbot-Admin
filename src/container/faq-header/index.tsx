"use client";
import React, { useContext, useState } from "react";
import "./style.css";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { AdminContext, AdminContextType } from "@/context/admin_context";
const FaqHeader = () => {
  const { setPagination } = useContext(AdminContext) as AdminContextType;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const router = useRouter();
  const faqCategories = [
    "All",
    "Company Policies",
    "Billing",
    "Technical Support",
    "Orders",
    "Shipping & Delivery",
    "Returns & Refunds",
    "Product Information",
    "Account Management",
    "Privacy & Security",
    "Promotions & Discounts",
  ];

  return (
    <div className="faq-header-container">
      <div>
        <span
          onClick={() => {
            router.push("/add-faqs");
          }}
          className="faq-add-text"
        >
          + Add New
        </span>
      </div>

      <div>
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="faq-category-dropdown"
        >
          <span className="faq-select-category-text">
            {selectedCategory ? selectedCategory : "Select Category"}
          </span>
          <span>{isOpen ? <BiChevronUp /> : <BiChevronDown />}</span>
        </button>
        {isOpen && (
          <ul className="faq-dropwdown-list">
            {faqCategories.map((category, index) => (
              <li
                key={index}
                onClick={() => {
                  setSelectedCategory(category);
                  setIsOpen(false);
                  setPagination((prev) => ({
                    ...prev,
                    category: category,
                  }));
                }}
              >
                {category}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FaqHeader;
