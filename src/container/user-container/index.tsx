"use client";
import Title from "@/components/header/title";
import Pagination from "@/components/pagination";
import UserTable from "@/components/user-body";
import { AdminContext, AdminContextType } from "@/context/admin_context";
import "./style.css";
import React, { useContext, useEffect } from "react";
import { HiMiniUsers } from "react-icons/hi2";
const UserContainer = () => {
  const { user_data_pagination, setUserDataPagination, user_lists_api } =
    useContext(AdminContext) as AdminContextType;
  useEffect(() => {
    user_lists_api();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_data_pagination.page]);
  const hasPaginationData =
    user_data_pagination.totalItems > 0 && user_data_pagination.totalPages > 0;
  return (
    <div className="user-container">
      <Title
        header="Users"
        context="List and Manage  your users here"
        icon={<HiMiniUsers size={30} />}
      />

      <UserTable />
      <div className="user-table-pagination">
        {hasPaginationData && ( 
          <Pagination
            pagination={user_data_pagination}
            setPagination={setUserDataPagination}
          />
        )}
      </div>
    </div>
  );
};

export default UserContainer;
