import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_ENDPOINT } from "../constant/api";
import { useNavigate } from "react-router-dom";

export const useNewPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ email }) => {
      const response = await axios.post(API_ENDPOINT.AUTH.FIND_PASSWORD, {
        email,
      });

      return response.data;
    },
    onSuccess: () => {
      alert("비밀번호 찾기 메일 보내기 성공");
      navigate("/login");
    },
    onError: (error) => {
      console.error("Error New Password: ", error.response.data.message);
    },
  });
};

export const useUpdatePassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ token, password }) => {
      const response = await axios.post(API_ENDPOINT.AUTH.UPDATE_PASSWORD, {
        token,
        password,
      });

      return response.data;
    },
    onSuccess: () => {
      alert("비밀번호 변경 성공");
      navigate("/login");
    },
    onError: (error) => {
      console.error("Error Update Password: ", error.response.data.message);
    },
  });
};
