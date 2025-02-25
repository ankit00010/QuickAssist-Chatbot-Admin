"use client";
import { fetchService } from "@/services/fetch_services";
import { AuthTypes } from "@/types/Auth_types";
import React, {
  ChangeEvent,
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

export const AdminContext = createContext<AdminContextType | null>(null);

import { useRouter } from "next/navigation";
import { FaqsTypeList } from "@/types/faq_type";
import { paginationType } from "@/types/pagination_types";
import { FAQsDataType } from "@/types/faqs_data_type";
export interface AdminContextType {
  isAdmin: boolean;
  setAdmin: (adminStatus: boolean) => void;

  loginApi: (auth_data: AuthTypes) => Promise<boolean>;

  //Pagination Related Data Types
  pagination: paginationType;

  setPagination: React.Dispatch<React.SetStateAction<paginationType>>;
  getFaqData: () => void;

  //Delete Data api

  deleteApi: (id: string) => Promise<boolean>;

  otp: string;
  handleOtp: (e: ChangeEvent<HTMLInputElement>) => void;
  verifyOtp: () => Promise<boolean>;
  faqData: FaqsTypeList;
  setFaqData: React.Dispatch<React.SetStateAction<FaqsTypeList>>;

  //ADD FAQS Related Type Data
  faqs: FAQsDataType;
  setFaqs: React.Dispatch<React.SetStateAction<FAQsDataType>>;
  addFAQS: () => void;

  //EDIT API
  editAPI: (id: string) => void;
}

const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [isAdmin, setAdmin] = useState(false);
  const [otp, setOtp] = useState("");
  const [token, setToken] = useState<string | null>(null);

  //LOADING USESTATE

  //FAQs Data based useState

  const [faqs, setFaqs] = useState<FAQsDataType>({
    question: "",
    answer: "",
    context: "",
    keywords: "",
  });

  //Pagination based variables
  const [pagination, setPagination] = useState<paginationType>({
    page: 1,
    totalPages: 1,
    category: "",
    totalItems: 1,
  });

  //FAQS DATA LIST
  const [faqData, setFaqData] = useState<FaqsTypeList>([]);
  //Setting token
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }
  }, []);

  useEffect(() => {
    console.log("Value of category is ", pagination.category);
    console.log("Value of page is ", pagination.page);
    console.log("Value of totalPages is ", pagination.totalPages);
  }, [pagination]);

  //Add FAQ Api

  const handleOtp = (e: ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const addFAQS = async () => {
    if (!token) {
      return router.push("/");
    }
    const transformedKeywords: string[] = faqs.keywords
      ? faqs.keywords.split(",").map((kw: string) => kw.trim())
      : [];

    console.log("TransformKeywords are", transformedKeywords);

    const response = await fetchService({
      method: "POST",
      endpoint: `api/admin/add-data`,
      data: {
        question: faqs.question,
        answer: faqs.answer,
        keywords: transformedKeywords,
        context: faqs.context,
      },
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

  //Edit API

  const editAPI = async (id: string) => {
    if (!id) {
      alert("Something Went Wrong .Please Try Again Later!!!");
    }
    if (!token) {
      return router.push("/");
    }
    const transformedKeywords: string[] = faqs.keywords
      ? faqs.keywords.split(",").map((kw: string) => kw.trim())
      : [];

    const response = await fetchService({
      method: "PUT",
      endpoint: `api/admin/edit-data/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        fields: {
          question: faqs.question,
          answer: faqs.answer,
          keywords: transformedKeywords,
          context: faqs.context,
        },
      },
    });

    const responseData = await response.data;
    if (response.code === 201) {
      alert(responseData.message);
      router.push("/faqs");
      setFaqs({
        question: "",
        answer: "",
        context: "",
        keywords: "",
      });
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
      console.log(responseData.message);

      return true;
    } else {
      console.log(responseData.message);

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
      // alert(responseData.message);
      localStorage.setItem("token", JSON.stringify(responseData?.token));
      setToken(responseData?.token);
      setOtp("");
      return true;
    } else {
      setOtp("");
      // alert(responseData.message);
      return false;
    }
  };

  //Get Faq Data List
  const getFaqData = useCallback(async () => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) return router.push("/");

    const token = JSON.parse(storedToken);
    setToken(token);

    try {
      const response = await fetchService({
        method: "GET",
        endpoint: `api/admin/faqs?page=${pagination.page}&limit=5&category=${
          pagination.category !== "All" ? pagination.category : ""
        }`,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.code !== 200) {
        if (response.code === 403) router.push("/");
        console.error(response.data?.message || "Failed to fetch FAQ data");
        return;
      }

      setFaqData(response.data.data);
      setPagination((prev) => ({
        ...prev,
        page: Math.min(
          prev.page,
          Math.max(1, Math.ceil(response.data.totalItems / 5))
        ),
        totalPages: Math.max(1, Math.ceil(response.data.totalItems / 5)),
        totalItems: response.data.totalItems,
      }));
    } catch (error) {
      console.error("Error fetching FAQ data:", error);
    }
  }, [pagination, setFaqData, setPagination, router]);

  //Delete Api

  const deleteApi = async (id: string): Promise<boolean> => {
    if (!token) {
      router.push("/");
      alert("Your Session Expired");
    }

    const response = await fetchService({
      method: "DELETE",
      endpoint: `api/admin/delete-data/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.data;
    if (response.code === 200) {
      getFaqData();
      alert(responseData.message);
      return true;
    } else {
      alert(responseData.message);
      return false;
    }
  };

  useEffect(() => {
    getFaqData();
  }, [pagination.page, pagination.category]);
  const admin_context_value = {
    isAdmin,
    setAdmin,

    loginApi,
    otp,
    handleOtp,
    verifyOtp,

    //Pagination Related Data
    pagination,
    setPagination,
    faqData,
    setFaqData,
    deleteApi,
    getFaqData,

    //ADD FAQS Related Data
    faqs,
    setFaqs,
    addFAQS,

    //EDIT API
    editAPI,
  };

  return (
    <AdminContext.Provider value={admin_context_value}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
