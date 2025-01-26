import axios from "axios";
import { useIdentifier } from "./useIdentifier";
import { API_ENDPOINT } from "../core/env";
import { useCallback } from "react";

const userId = useIdentifier();

const axiosInstance = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
    "user-id": userId,
  },
});

const useAxios = () => {
  const get = useCallback(async (url: string, config = {}) => {
    const response = await axiosInstance.get(url, config);
    return response.data;
  }, []);

  const post = useCallback(async (url: string, data: any, config = {}) => {
    const response = await axiosInstance.post(url, data, config);
    return response.data;
  }, []);

  const remove = useCallback(async (url: string, config = {}) => {
    const response = await axiosInstance.delete(url, config);
    return response.data;
  }, []);

  return { get, post, remove };
};

export default useAxios;
