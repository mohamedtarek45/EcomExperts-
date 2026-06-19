
import { useQuery } from "@tanstack/react-query";
import type { SensorProduct } from "../types/types";

export const useSensors = () => {
  const getSensors = async () => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/sensors`);

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return data;
  };

  return useQuery<SensorProduct[]>({
    queryKey: ["sensors"],
    queryFn: getSensors,
    refetchOnWindowFocus: false,
  });
};
