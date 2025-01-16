type NavbarTypes = {
  value: string;
  href: string;
  icon: any;
};
import { MdDashboard } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { FaQ, FaDatabase } from "react-icons/fa6";
import { LuMessageCircleMore } from "react-icons/lu";
import { FaUsers } from "react-icons/fa";

export const NavbarValues: NavbarTypes[] = [
  {
    value: "Dashboard",
    href: "/dashboard",
    icon: <MdDashboard />,
  },
  {
    value: "FAQs",
    href: "/faqs",
    icon: <FaQ />,
  },
  {
    value: "Add FAQs",
    href: "/add-faqs",
    icon: <IoIosAddCircle />,
  },
  {
    value: "Admin Message",
    href: "/admin-message",
    icon: <LuMessageCircleMore />,
  },
  {
    value: "Module Training",
    href: "/module-training",
    icon: <FaDatabase />,
  },
  {
    value: "Users",
    href: "/users",
    icon: <FaUsers />,
  },
];
