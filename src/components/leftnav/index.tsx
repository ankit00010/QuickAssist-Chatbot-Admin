"use client";
import Image from "next/image";
import React, { useState } from "react";
import Logo from "@/public/images/cms_logo.png";
import Link from "next/link";
import "./style.css";
import { NavbarValues } from "./constants";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import { usePathname } from "next/navigation";

const LeftNav = () => {
  const [isToggleClose, setIsToggleClose] = useState(false);
  const handleClose = () => {
    if (!isToggleClose) {
      setIsToggleClose(true);
    } else {
      setIsToggleClose(false);
    }
  };

  const pathName = usePathname();
  return (
    <>
      {pathName !== "/" && (
        <div className="sidebar_wrapper">
          <button className="btn" onClick={handleClose}>
            {isToggleClose ? <GoSidebarCollapse /> : <GoSidebarExpand />}
          </button>

          <aside className="sidebar" data-collapse={isToggleClose}>
            <div className="sidebar_top">
              <Image
                src={Logo}
                className="sidebar_logo"
                alt="Logo"
                height={80}
                width={80}
              />
              <p className="sidebar_logo_name">AXCEL ADMIN</p>
            </div>
            <ul className="sidebar_list">
              {NavbarValues.map((item, index) => (
                <li className="sidebar_item" key={index}>
                  <Link
                    href={item.href}
                    className="sidebar_link"
                    aria-label={item.value}
                  >
                    <span className="sidebar_icon">{item.icon}</span>
                    <span className="sidebar_name">{item.value}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      )}
    </>
  );
};

export default LeftNav;
