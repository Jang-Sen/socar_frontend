import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/apiInstanse";
import { API_ENDPOINT } from "../constant/api";

export const useCarList = (
  { order, sort, page, take } = {
    order: "DESC",
    sort: "createdAt",
    page: 1,
    take: 10,
  },
) => {
  return useQuery({
    queryKey: ["car", order, sort, page, take],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `${API_ENDPOINT.CAR.LIST}?order=${order}&sort=${sort}&page=${page}&take=${take}`,
      );

      // console.log("Car Data: ", data);
      console.log("Car Data Body Data: ", data.body);

      return data.body;
    },
    retry: false,
  });
};

export const useCarDetail = (id) => {
  return useQuery({
    queryKey: ["car", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        API_ENDPOINT.CAR.DETAIL.replace(":id", id),
      );

      // console.log("Car Detail Data: ", data);

      return data.body;
    },
  });
};
