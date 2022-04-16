import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig, Method } from "axios";

export const useFetch = <T = unknown>(
  path: string,
  method: Method = "GET",
  options?: AxiosRequestConfig
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const api = axios.create({
    baseURL: "url:port/", // replace api:port with your baseURL:port
    method,
  });

  useEffect(() => {
    const fetchData = async () => {
      await api(path, options)
        .then((res) => setData(res.data))
        .catch((err) => {
          setError(err);
          console.log("Data fetching failed...");
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchData();
  }, [path, options, api]);

  return { data, error, isLoading };
};
