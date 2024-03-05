// usePollApi.js

import { useState } from "react";
import { getData, postData } from "../../../utils/helperFunctions";

export const usePollApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [results, setResults] = useState([]);

  const getPoll = async (publicRuntimeConfig, pageData) => {
    try {
      if (!loading) setLoading(true);

      const data = await getData(
        `${publicRuntimeConfig.NEXT_API_URL}poll/fetch?document_path=${pageData.document_path}`,
      );
      setResults(data.data?.options);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setError(err);
    }
  };

  const onSubmit = async (pollData, publicRuntimeConfig, pageData) => {
    try {
      setLoading(true);

      const pollToSend = {
        input: {
          pollInfo: { ...pollData },
        },
      };

      const dataResp = await postData(`${publicRuntimeConfig.NEXT_API_URL}poll/save`, pollToSend);
      setLoading(false);
      if (dataResp?.data?.success) {
        const takenPoles = JSON.parse(localStorage.getItem("TakenPoles") || "[]");
        if (!takenPoles?.includes(pageData.page)) {
          localStorage.setItem("TakenPoles", JSON.stringify([...takenPoles, pageData.page]));
        }

        getPoll(publicRuntimeConfig, pageData);
      } else {
        setError("API failed");
      }
    } catch (err: any) {
      setLoading(false);
      setError(err);
    }
  };

  return {
    loading,
    error,
    results,
    getPoll,
    onSubmit,
  };
};
