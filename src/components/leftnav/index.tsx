"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Logo from "@/public/images/cms_logo.png";
import Link from "next/link";
import "./style.css";
import { NavbarValues } from "./constants";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { usePathname } from "next/navigation";

const LeftNav = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathName = usePathname();

  // Detect screen size for mobile responsiveness
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(!isSidebarOpen); // Mobile: Toggle sidebar on any button click
    }
  };

  const handleLogoClick = () => {
    if (!isMobile) {
      setIsSidebarOpen(!isSidebarOpen); // Desktop: Toggle sidebar only when clicking the logo
    }
  };

  return (
    <>
      {pathName !== "/" && (
        <div className="sidebar_wrapper">
          {/* Sidebar */}
          <aside
            className={`sidebar ${isSidebarOpen ? "open" : ""}`}
            data-collapse={isSidebarOpen}
          >
            {/* Close Button (Mobile Only) */}
            {isMobile && (
              <button className="close-btn" onClick={toggleSidebar}>
                <IoClose />
              </button>
            )}

            {/* Sidebar Header */}
            <div className="sidebar_top" onClick={handleLogoClick}>
              <Image
                src={Logo}
                className="sidebar_logo"
                alt="Logo"
                height={80}
                width={80}
              />
              <p className="sidebar_logo_name">
                {!isSidebarOpen && "AXCEL ADMIN"}
              </p>
            </div>

            {/* Navigation Links */}
            <ul className="sidebar_list">
              {NavbarValues.map((item, index) => (
                <li className="sidebar_item" key={index}>
                  <Link
                    href={item.href}
                    className="sidebar_link"
                    aria-label={item.value}
                    onClick={isMobile ? toggleSidebar : undefined} // Collapse only on mobile
                  >
                    <span className="sidebar_icon">{item.icon}</span>
                    <span className="sidebar_name">
                      {!isMobile && !isSidebarOpen && item.value}
                      {isMobile && isSidebarOpen && item.value}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          {/* Toggle Button (Mobile Only) */}
          {isMobile && (
            <button className="btn" onClick={toggleSidebar}>
              {isSidebarOpen ? <GoSidebarExpand /> : <GoSidebarCollapse />}
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default LeftNav;
