import { User } from "@/core/auth/interfaces/user";
import { productApi } from "../api/productsApi";

export interface AuthResponse {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
  token: string;
}

const returnUserToken = (
  data: AuthResponse
): {
  user: User;
  token: string;
} => {
  const { id, email, fullName, isActive, roles, token } = data;
  const user: User = {
    id,
    email,
    fullName,
    isActive,
    roles,
  };

  return {
    user,
    token,
  };
};

export const authLogin = async (email: string, password: string) => {
  email = email.toLocaleLowerCase();
  
  try {
    const { data } = await productApi.post<AuthResponse>("/auth/login", {
      email,
      password,
    });
  
    return returnUserToken(data);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const authRegister = async (
  fullName: string,
  email: string,
  password: string
) => {
  try {
    const { data } = await productApi.post<AuthResponse>("/auth/register", {
      fullName,
      email,
      password,
    });
    console.log(data)
    return returnUserToken(data);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const authCheckStatus = async () => {
  try {
    const { data } = await productApi.get<AuthResponse>("/auth/check-status");
    return returnUserToken(data);
  } catch (error) {
    return null;
  }
};
