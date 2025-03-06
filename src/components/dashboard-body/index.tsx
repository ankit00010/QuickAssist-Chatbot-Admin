"use client";
import React, { useContext, useEffect } from "react";
import { FaQ, FaUser } from "react-icons/fa6";
import { Database } from "lucide-react";
import { AdminContext, AdminContextType } from "@/context/admin_context";
import "./style.css";
import CountUp from "react-countup";
import BarChartData from "../charts/barChart";

const DashboardBody = () => {
  const { dashboard, getDashBoardDetails } = useContext(
    AdminContext
  ) as AdminContextType;

  // Details Array
  const dashboardMetrics = [
    {
      icon: <FaUser size={20} />,
      title: "User Details",
      count: dashboard.toatlUsers || 0,
      description: "Total Users",
    },
    {
      icon: <FaQ size={20} />,
      title: "FAQs Data",
      count: dashboard.totalFAQs || 0,
      description: "Total FAQs",
    },
    {
      icon: <Database size={20} />,
      title: "Model Training",
      count: dashboard.totalUnAnsweredQuestions || 0,
      description: "Total Data to Train",
    },
  ];

  useEffect(() => {
    getDashBoardDetails();
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Overview</h1>
      <div className="dashboard-metrics-container">
        {dashboardMetrics.map((metric, index) => (
          <div key={index} className="dashboard-metric-box">
            <div className="dashboard-metric-box-header">
              <span className="dashboard-metric-icon">{metric.icon}</span>
              <span className="dashboard-metric-title">{metric.title}</span>
            </div>
            <p className="dashboard-metric-count">
              <CountUp start={0} end={metric.count} duration={1.5} separator="," />
            </p>
            <span className="dashboard-metric-footer">{metric.description}</span>
          </div>
        ))}
      </div>

      <div className="dashboard-chart-wrapper">
        <BarChartData
          label={dashboard.finalResult
            .filter((data) => data.count !== 0)
            .map((data) => data && data.label)}
          viewData={dashboard.finalResult
            .filter((data) => data.count !== 0)
            .map((data) => data && data.count)}
          title="FAQs DATA CATEGORY WISE"
        />
      </div>
    </div>
  );
};

export default DashboardBody;