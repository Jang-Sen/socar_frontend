import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_ENDPOINT } from "../constant/api";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (userData) => {
      const response = await axios.post(API_ENDPOINT.AUTH.SIGNUP, userData);

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
  return useMutation({
    mutationFn: async ({ email, password }) => {
      const response = await axios.post(API_ENDPOINT.AUTH.LOGIN, {
        email,
        password,
      });

      return response.data;
    },
    onSuccess: () => {
      alert("로그인 완료");
    },
    onError: (error) => {
      console.error("Error Login: ", error.response.data.message);
    },
  });
};
