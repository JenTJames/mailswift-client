import { useCallback, useState } from "react";
import axios from "axios";

const useHttp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fireRequest = useCallback(async (method, endpoint, payload) => {
    setIsLoading(true);
    try {
      const response = await axios({
        method: method ? method : "GET",
        url: `${process.env.REACT_APP_API_URL + endpoint}`,
        data: payload ? payload : null,
      });
      return response.data;
    } catch (error) {
      if (error.response.status === 500) {
        setError({
          isError: true,
          error: "The server went on a coffee break. Will be back soon!",
        });
      } else {
        setError({
          isError: true,
          error:
            error.response.data.message ||
            error.response.data ||
            "Something went wrong!",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    fireRequest,
    isLoading,
    error,
    resetError: setError,
  };
};

export default useHttp;
