import { useQuery } from "@tanstack/react-query";
import type { BaseProduct } from "../types/types";

export const usePlans = () => {
  const getPlans = async () => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/plans`);

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }


    return data;
  };

  return useQuery<BaseProduct[]>({
    queryKey: ["plans"],
    queryFn: getPlans,
    refetchOnWindowFocus: false,
  });
};
