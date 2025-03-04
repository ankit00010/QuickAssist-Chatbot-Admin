"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

import "./style.css";
import { AdminContext, AdminContextType } from "@/context/admin_context";
import { paginationType } from "@/types/pagination_types";

interface PaginationProps {
  setPagination: React.Dispatch<React.SetStateAction<paginationType>>;
  pagination: paginationType;
}
const Pagination: React.FC<PaginationProps> = ({
  setPagination,
  pagination,
}) => {
  //Context

  const [currentPage, setCurrentPage] = useState(1);
  const handleLeftArrow = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleRightArrow = () => {
    if (currentPage < pagination.totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      page: currentPage,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);
  return (
    <div className="pagination-container">
      <button
        onClick={handleLeftArrow}
        disabled={pagination.page === 1}
        className={`pagination-button ${
          pagination.page === 1 ? "disabled " : ""
        }`}
      >
        <MdOutlineKeyboardArrowLeft size={20} />
      </button>

      <button className="page-number">
        {pagination.page} / {pagination.totalPages}
      </button>
      <button
        onClick={handleRightArrow}
        disabled={pagination.page === pagination.totalPages}
        className={`pagination-button ${
          pagination.page === pagination.totalPages ? "disabled" : ""
        }`}
      >
        <MdOutlineKeyboardArrowRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
