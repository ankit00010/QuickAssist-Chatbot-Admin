import Title from "@/components/header/title";
import DataTable from "@/components/user-body";
// import UserBody from "@/components/user-body";
import React from "react";
import { HiMiniUsers } from "react-icons/hi2";

const UserContainer = () => {
  return (
    <div className="user-container">
      <Title
        header="Users"
        context="List and Manage  your users here"
        icon={<HiMiniUsers size={30} />}
      />

      <DataTable/>
    </div>
  );
};

export default UserContainer;
