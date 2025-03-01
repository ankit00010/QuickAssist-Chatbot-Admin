import Title from "@/components/header/title";
import React from "react";
import { HiMiniUsers } from "react-icons/hi2";

const UserContainer = () => {
  return (
    <div>
      <Title
        header="Users"
        context="List and Manage  your users here"
        icon={<HiMiniUsers size={30} />}
      />
    </div>
  );
};

export default UserContainer;
