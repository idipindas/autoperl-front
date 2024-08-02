import { loginApi, signupApi } from "../api/auth/authApi";

export const login = async (email: string, password: string) => {
  try {
    const response = await loginApi(email, password);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const signup = async (email: string, password: string) => {
  try {
    const response = await signupApi(email, password);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Signup failed");
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
