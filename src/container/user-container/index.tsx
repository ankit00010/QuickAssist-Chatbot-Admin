"use client";
import Title from "@/components/header/title";
import Pagination from "@/components/pagination";
import UserTable from "@/components/user-body";
import { AdminContext, AdminContextType } from "@/context/admin_context";
import "./style.css";
import React, { useContext, useEffect, useState } from "react";
import { HiMiniUsers } from "react-icons/hi2";
const UserContainer = () => {
  const { user_data_pagination, setUserDataPagination, user_lists_api } =
    useContext(AdminContext) as AdminContextType;
  // const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    user_lists_api();
  }, [user_data_pagination.page]);
  return (
    <div className="user-container">
      <Title
        header="Users"
        context="List and Manage  your users here"
        icon={<HiMiniUsers size={30} />}
      />

      <UserTable />
      <div className="user-table-pagination">
        <Pagination
          pagination={user_data_pagination}
          setPagination={setUserDataPagination}
          // currentPage={currentPage}
          // setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default UserContainer;
