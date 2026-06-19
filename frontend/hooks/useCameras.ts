import { useQuery } from "@tanstack/react-query";
import type { CameraProduct } from "../types/types";
const getCameras = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/cameras`
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const useCameras = () => {
  return useQuery<CameraProduct []>({
    queryKey: ["cameras"],
    queryFn: getCameras,
    refetchOnWindowFocus: false,
  });
};