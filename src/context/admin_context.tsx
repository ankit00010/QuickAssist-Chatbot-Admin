"use client";
import { fetchService } from "@/services/fetch_services";
import { AuthTypes } from "@/types/Auth_types";
import React, {
  ChangeEvent,
  createContext,
  ReactNode,
  useState,
} from "react";
export interface AdminContextType {
  isAdmin: boolean;
  setAdmin: (adminStatus: boolean) => void;
  addFaqApi: (
    question: string,
    answer: string,
    keywords: string[],
    context: string
  ) => void;

  loginApi: (auth_data: AuthTypes) => Promise<boolean>;

  otp: string;
  handleOtp: (e: ChangeEvent<HTMLInputElement>) => void;
  verifyOtp: () => Promise<boolean>;
}

export const AdminContext = createContext<AdminContextType | null>(null);

import { useRouter } from "next/navigation";

const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [isAdmin, setAdmin] = useState(false);
  const [otp, setOtp] = useState("");
  const [token, setToken] = useState<string | null>(() => {
    const res = localStorage.getItem("token");
    return res ? JSON.parse(res) : null;
  });
  //Add FAQ Api

  const handleOtp = (e: ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const addFaqApi = async (
    question: string,
    answer: string,
    keywords: string[],
    context: string
  ) => {
    const faqData = {
      question,
      answer,
      keywords,
      context,
    };
    console.log("Data in Context", faqData);
    if (!token) {
     return  router.push("/");
    }
    const response = await fetchService({
      method: "POST",
      endpoint: `api/admin/add-data`,
      data: faqData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Token Value is ", token);

    const responseData = await response.data;
    console.log("Response Data is ", responseData);

    if (response.code === 200) {
      alert(responseData.message);
    } else {
      alert(responseData.message);
    }
  };

  //Login Api

  const loginApi = async (auth_data: AuthTypes) => {
    const response = await fetchService({
      method: "POST",
      endpoint: `api/auth/login`,
      data: {
        email: auth_data.email,
        password: auth_data.password,
      },
    });
    const responseData = await response.data;
    if (response.code === 200) {
      alert(responseData.message);
      return true;
    } else {
      alert(responseData.message);
      return false;
    }
  };

  //Api call to verify the otp
  const verifyOtp = async () => {
    const response = await fetchService({
      method: "POST",
      endpoint: `api/auth/verify-otp`,
      data: {
        otp: Number(otp),
      },
    });
    const responseData = await response.data;
    if (response.code === 200) {
      alert(responseData.message);
      localStorage.setItem("token", JSON.stringify(responseData?.token));
      setToken(responseData?.token);
      setOtp("");
      return true;
    } else {
      setOtp("");
      alert(responseData.message);
      return false;
    }
  };

  const admin_context_value = {
    isAdmin,
    setAdmin,
    addFaqApi,
    loginApi,
    otp,
    handleOtp,
    verifyOtp,
  };

  return (
    <AdminContext.Provider value={admin_context_value}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
