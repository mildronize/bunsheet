import { useGlobalLoadingStore } from "@/store";
import { useEffect } from "react";

export function useGlobalLoading(isLoading: boolean) {
  const setLoading = useGlobalLoadingStore((state) => state.setIsLoading);

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isLoading, setLoading]);
}
