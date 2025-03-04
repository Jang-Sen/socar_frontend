import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "../constant/api";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/apiInstanse";
import Cookies from "js-cookie";
import { useAuth } from "../context/authContext";

export const useSignup = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (userData) => {
      const response = await axiosInstance.post(
        API_ENDPOINT.AUTH.SIGNUP,
        userData,
      );

      return response.data;
    },
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      console.error("Signup Error: ", error.response.data.message);
    },
  });
};

export const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ email, password }) => {
      const response = await axiosInstance.post(API_ENDPOINT.AUTH.LOGIN, {
        email,
        password,
      });

      return response.data;
    },
    onSuccess: (data) => {
      Cookies.set("accessToken", data.accessToken, {
        expires: 1,
        secure: true,
      });

      login(data.accessToken);

      navigate("/profile");
    },
    onError: (error) => {
      console.error("Error Login: ", error.response.data.message);
    },
  });
};
