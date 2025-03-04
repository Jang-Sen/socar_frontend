import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/apiInstanse";
import { API_ENDPOINT } from "../constant/api";

export const useUserInfo = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(API_ENDPOINT.AUTH.USER_INFO);

      console.log(data.body);

      return data.body;
    },
    retry: false,
    // staleTime: 1000 * 60 * 5,
  });
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: async ({ phone, address }) => {
      const { data } = await axiosInstance.put(
        API_ENDPOINT.AUTH.UPDATE_PROFILE,
        {
          phone,
          address,
        },
      );

      return data;
    },
    onError: (error) => {
      console.error("Update Profile Error: ", error.response.data.message);
      alert("프로필 업데이트에 실패했습니다.");
    },
  });
};

export const useUpdateProfileImg = () => {
  return useMutation({
    mutationFn: async () => {},
    onSuccess: () => {},
    onError: (error) => {
      console.error("Update Profile Img Error: ", error.response.data.message);
    },
  });
};
