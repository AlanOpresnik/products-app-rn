import {
  authCheckStatus,
  authLogin,
  authRegister,
} from "@/app/auth/actions/authActions";
import { User } from "@/core/auth/interfaces/user";
import { SecureStorageAdapter } from "@/helpers/adapters/secure.storage.adapters";
import { create } from "zustand";

export type AuthStatus = "authenticated" | "unauthenticated" | "checking";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  login: (email: string, password: string) => Promise<Boolean>;
  register: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<Boolean>;
  checkStatus: () => Promise<void>;
  changeStatus: (token?: string, user?: User) => Promise<Boolean>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: "checking",
  token: undefined,
  user: undefined,

  login: async (email: string, password: string) => {
    const resp = await authLogin(email, password);
    return get().changeStatus(resp?.token, resp?.user);
  },
  register: async (fullName: string, email: string, password: string) => {
    const resp = await authRegister(fullName, email, password);
    console.log(resp);
    return get().changeStatus(resp?.token, resp?.user);
},
  changeStatus: async (token?: string, user?: User) => {
    if (!token || !user) {
      await SecureStorageAdapter.deleteItem("token");
      set({
        status: "unauthenticated",
        token: undefined,
        user: undefined,
      });
      return false;
    }
    set({
      status: "authenticated",
      token: token,
      user: user,
    });

    await SecureStorageAdapter.setItem("token", token);
    return true;
  },
  checkStatus: async () => {
    const resp = await authCheckStatus();
    get().changeStatus(resp?.token, resp?.user);
  },
  logout: async () => {
    SecureStorageAdapter.deleteItem("token");

    set({
      status: "unauthenticated",
      token: undefined,
      user: undefined,
    });
  },
}));
