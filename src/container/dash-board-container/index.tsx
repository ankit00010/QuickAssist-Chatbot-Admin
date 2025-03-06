import DashboardBody from "@/components/dashboard-body";
import Title from "@/components/header/title";
import React from "react";
import { MdDashboard } from "react-icons/md";

const DashboardContainer = () => {
    
  return (
    <div>
      <Title
        header="Dashboard"
        context="View graphs and charts for data insights"
        icon={<MdDashboard size={30} />}
      />
      <DashboardBody />
    </div>
  );
};

export default DashboardContainer;
