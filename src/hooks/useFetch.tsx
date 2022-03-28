import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

// replace api:port with your baseURL
const api = axios.create({
  baseURL: 'api:port',
})


export const useFetch = (url: string, options?: AxiosRequestConfig) => {
  const [data, setData] = useState<unknown | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async() => {
      await api.get(url, options)
      .then(res => setData(res.data))
      .catch(err => {
        setError(err);
        console.log('Data fetching failed...');
      })
      .finally(() => {
        setIsLoading(false)
        }
      )
    } 
    fetchData();  
  }, [url, options])

  return { data, error, isLoading }
}