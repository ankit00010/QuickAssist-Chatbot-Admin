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

import { useRouter } from "next/navigation";
import { FaqsTypeList } from "@/types/faq_type";
import { paginationType } from "@/types/pagination_types";
import { FAQsDataType } from "@/types/faqs_data_type";
import { AdminMessageResponse } from "@/types/admin_message_response";
import { TrainingDetails } from "@/types/training_Data_details";

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

  //SEND ADMIN API
  adminSendMessage: (value: string) => Promise<AdminMessageResponse>;

  //TOTAL QUESTION NOS DATA
  getQuestionsData: (limit: number, id: string) => Promise<boolean>;

  //Training Data Details
  details: TrainingDetails;
  setDetails: React.Dispatch<React.SetStateAction<TrainingDetails>>;

  //Delete the preivous assigned Data
  deletePreviousQuestions: () => Promise<boolean>;
 
  handleMultipleFaqs: (faq: FaqsTypeList) => void;
}

export const AdminContext = createContext<AdminContextType | null>(null);

const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [isAdmin, setAdmin] = useState(false);
  const [otp, setOtp] = useState("");
  const [token, setToken] = useState<string | null>(null);

  //LOADING USESTATE

  //FAQs Data based useState

  const [faqs, setFaqs] = useState<FAQsDataType>([
    {
      question: "",
      answer: "",
      context: "",
      keywords: "", // Fix: Should be an array
    },
  ]);
  //Pagination based variables
  const [pagination, setPagination] = useState<paginationType>({
    page: 1,
    totalPages: 1,
    category: "",
    totalItems: 1,
  });

  const [details, setDetails] = useState<TrainingDetails>({
    total_questions: 0,
    user_Id: "",
    limit: 0,
    assigned_questions: 0,
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

  //Add FAQ Api

  const handleOtp = (e: ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const addFAQS = async () => {
    if (!token) {
      return router.push("/");
    }
    const transformedFAQs = faqs.map((faq) => ({
      question: faq.question,
      answer: faq.answer,
      keywords: faq.keywords.split(",").map((kw) => kw.trim()),
      context: faq.context,
    }));
    console.log("TransformKeywords are", transformedFAQs);

    const response = await fetchService({
      method: "POST",
      endpoint: `api/admin/add-data`,
      data: {
        transformedFAQs,
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
  const handleMultipleFaqs = async (transformedFAQs: FaqsTypeList) => {
    if (!token) {
      return router.push("/");
    }

    console.log("TransformKeywords are", transformedFAQs);

    const response = await fetchService({
      method: "POST",
      endpoint: `api/admin/add-data`,
      data: {
        transformedFAQs,
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
    const transformedFAQ = {
      ...faqs[0], // Take only the first object
      keywords: faqs[0].keywords.split(",").map((kw) => kw.trim()), // Convert keywords string to array
    };
    const response = await fetchService({
      method: "PUT",
      endpoint: `api/admin/edit-data/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        fields: {
          question: transformedFAQ.question,
          answer: transformedFAQ.answer,
          keywords: transformedFAQ.keywords,
          context: transformedFAQ.context,
        },
      },
    });

    const responseData = await response.data;
    if (response.code === 201) {
      alert(responseData.message);
      router.push("/faqs");
      setFaqs([
        {
          question: "",
          answer: "",
          context: "",
          keywords: "",
        },
      ]);
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

  //Get Faq Data List;
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
      const responseData = await response.data;
      console.log("Response Data is ", responseData);

      setFaqData(responseData.data);
      setPagination((prev) => ({
        ...prev,
        page: Math.min(
          prev.page,
          Math.max(1, Math.ceil(responseData.totalItems / 5))
        ),
        totalPages: Math.max(1, Math.ceil(responseData.totalItems / 5)),
        totalItems: responseData.totalItems,
      }));
      setDetails((prev) => ({
        ...prev,
        total_questions: responseData.unAnsQuestionsCount,
      }));
    } catch (error) {
      console.error("Error fetching FAQ data:", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, pagination.category]);

  // Call the function when component mounts or when pagination changes
  useEffect(() => {
    getFaqData();
  }, [getFaqData]);
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

  //ADMIN SEND MESSAGE API

  const adminSendMessage = async (content: string) => {
    if (!content) {
      console.error("Empty message...");
    }
    const response = await fetchService({
      method: "POST",
      endpoint: "api/admin/admin-message",
      data: {
        message: content,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData: AdminMessageResponse = await response.data;
    if (response.code === 200) {
      console.log(responseData.message);
      return responseData;
    } else {
      console.log(responseData.message);

      return responseData;
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////

  //Api To get the Questions need to train

  const getQuestionsData = async (limit: number, id: string) => {
    if (!token) {
      router.push("/");
    }
    const response = await fetchService({
      method: "POST",
      endpoint: "api/admin/questions/unanswered",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        limit: limit,
        user_Id: id,
      },
    });

    const responseData = await response.data;

    if (responseData.code === 200) {
      console.log("The Data received is ", responseData);
      setDetails((prev) => ({
        ...prev,
        assigned_questions: responseData.data.count,
      }));

      return true;
    } else {
      console.log(responseData.message);
      return false;
    }
  };

  const deletePreviousQuestions = async (): Promise<boolean> => {
    if (!token) {
      router.push("/");
    }

    const response = await fetchService({
      method: "DELETE",
      endpoint: `api/admin/questions/unanswered/delete/${details.user_Id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.data;

    if (responseData.code === 200) {
      setDetails((prev) => ({
        ...prev,
        assigned_questions: 0,
      }));
      return true;
    } else {
      return false;
    }
  };

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

    //SEND ADMIN API
    adminSendMessage,

    //TOTAL QUESTIONS NO DATA

    //Api to get the list of the questions that needed to be train
    getQuestionsData,

    //Training Data Details
    details,
    setDetails,
    //Delete the previous assigned Data
    deletePreviousQuestions,
    handleMultipleFaqs,
  };

  return (
    <AdminContext.Provider value={admin_context_value}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
