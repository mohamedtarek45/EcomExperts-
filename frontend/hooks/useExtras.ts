import { useQuery } from "@tanstack/react-query";
import type { AccessoryProduct } from "../types/types";

export const useExtras = () => {
  const getExtras = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/accessories`,
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return data;
  };

  return useQuery<AccessoryProduct[]>({
    queryKey: ["extras"],
    queryFn: getExtras,
    refetchOnWindowFocus: false,
  });
};
