import { SecureStorageAdapter } from "@/helpers/adapters/secure.storage.adapters";
import axios from "axios";
import { Platform } from "react-native";

const STAGE = process.env.EXPO_PUBLIC_STAGE || "dev";

export const api_url =
  STAGE === "prod"
    ? process.env.EXPO_PUBLIC_API_URL
    : Platform.OS === "ios"
    ? process.env.EXPO_PUBLIC_API_URL_IOS
    : process.env.EXPO_PUBLIC_API_URL_ANDROID;

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
