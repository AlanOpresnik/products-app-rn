import { SecureStorageAdapter } from "@/helpers/adapters/secure.storage.adapters";
import axios from "axios";
import { Platform } from "react-native";

const STAGE = process.env.EXPO_PUBLIC_STAGE || "dev";

export const api_url =
  STAGE === "prod"
    ? "http://192.168.1.48:3000/api"
    : Platform.OS === "ios"
    ? "http://192.168.1.48:3000/api"
    : "http://192.168.1.48:3000/api";
   
const productApi = axios.create({
  baseURL: api_url,
});

productApi.interceptors.request.use(async (config) => {
  //verificar si hay token
  const token = await SecureStorageAdapter.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { productApi };
