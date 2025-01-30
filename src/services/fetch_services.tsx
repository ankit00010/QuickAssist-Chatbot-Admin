import { ResponseType } from "@/types/Response_Types";

interface FetchServiceProps {
  method: string;
  endpoint: string;
  data?: Record<string, unknown> | FormData;
  headers?: Record<string, string>;
}

/**
 * Generic fetch service that handles different types of requests with authentication
 * @param _props - FetchServiceProps containing method, endpoint, data, and headers
 * @returns Promise<ResponseType>
 */
export const fetchService = async (
  _props: FetchServiceProps
): Promise<ResponseType> => {
  try {
    // Get authorization token from localStorage or wherever you store it
    const token = localStorage.getItem("token");

    // Base headers with authentication
    const baseHeaders: Record<string, string> = {
      "Database-Token": process.env.DATABASE_TOKEN || "",
      Authorization: token ? `Bearer ${token}` : "",
      ...(_props.headers || {}), // Merge custom headers if provided
    };

    // Common fetch options
    const fetchOptions: RequestInit = {
      method: _props.method,
      headers: baseHeaders,
    };

    // Handle FormData vs JSON data
    if (_props.data) {
      if (_props.data instanceof FormData) {
        // Remove Content-Type for FormData to let browser set it with boundary
        delete baseHeaders["Content-Type"];
        fetchOptions.body = _props.data;
      } else {
        baseHeaders["Content-Type"] = "application/json";
        fetchOptions.body = JSON.stringify(_props.data);
      }
    }

    // Make the fetch request
    const response = await fetch(
      `${process.env.SERVER_URL}${_props.endpoint}`,
      fetchOptions
    );

    // Parse response
    const data = await response.json();

    // Return formatted response
    const res: ResponseType = {
      code: response.status,
      data: data,
    };

    return res;
  } catch (error) {
    // Handle errors appropriately
    console.error("Fetch service error:", error);
    return {
      code: 500,
      data: {
        status: "FAILED",
        error: "Request failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
    };
  }
};
