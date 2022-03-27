import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";


export const useFetch = (url: string, options?: AxiosRequestConfig) => {
  const [data, setData] = useState<unknown | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(url, options)
    .then(res => setData(res.data))
    .catch(err => {
      setError(err);
      throw new Error('Failed data fetching...');
    })
    .finally(() => {
      setIsLoading(false)
      }
    )
  }, [url, options])

  return { data, error, isLoading }
}