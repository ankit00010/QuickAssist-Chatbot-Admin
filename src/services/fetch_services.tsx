import { ResponseType } from "@/types/Response_Types";

interface FetchServiceProps {
  method: string;
  endpoint: string;
  data: { [key: string]: any } | FormData;
}

export const fetchService = async (
  _props: FetchServiceProps
): Promise<ResponseType> => {
  let response;

  if (_props.data instanceof FormData) {
    response = await fetch(`${process.env.SERVER_URL}${_props.endpoint}`, {
      method: _props.method,
      body: _props.data,
    });
  } else {
    response = await fetch(`${process.env.SERVER_URL}${_props.endpoint}`, {
      method: _props.method,
      headers: {
        "Content-Type": "application/json",
        "Database-Token": process.env.DATABASE_TOKEN!,
      },
      body: JSON.stringify(_props.data),
    });
  }
  const data = await response.json();
  const res: ResponseType = {
    code: response.status,
    data: data,
  };

  return res;
};
