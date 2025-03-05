"use client";
import React, { useEffect, useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

import "./style.css";
import { paginationType } from "@/types/pagination_types";

interface PaginationProps {
  setPagination: React.Dispatch<React.SetStateAction<paginationType>>;
  pagination: paginationType;
}

const Pagination: React.FC<PaginationProps> = ({
  setPagination,
  pagination,
}) => {
  const [currentPage, setCurrentPage] = useState(pagination.page);

  // Sync currentPage with pagination.page
  useEffect(() => {
    setCurrentPage(pagination.page);
  }, [pagination.page]);

  // Handle left arrow click
  const handleLeftArrow = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Handle right arrow click
  const handleRightArrow = () => {
    if (currentPage < pagination.totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Update parent pagination state when currentPage changes
  useEffect(() => {
    if (currentPage !== pagination.page) {
      setPagination((prev) => ({
        ...prev,
        page: currentPage,
      }));
    }
  }, [currentPage, setPagination, pagination.page]);

  return (
    <div className="pagination-container">
      <button
        onClick={handleLeftArrow}
        disabled={currentPage === 1}
        className={`pagination-button ${currentPage === 1 ? "disabled" : ""}`}
      >
        <MdOutlineKeyboardArrowLeft size={20} />
      </button>

      <button className="page-number">
        {currentPage} / {pagination.totalPages || 1}
      </button>

      <button
        onClick={handleRightArrow}
        disabled={currentPage === pagination.totalPages}
        className={`pagination-button ${
          currentPage === pagination.totalPages ? "disabled" : ""
        }`}
      >
        <MdOutlineKeyboardArrowRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
