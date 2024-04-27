import { useGlobalLoadingStore } from "@/store";
import { UseQueryResult } from "@tanstack/react-query";
import { useEffect } from "react";

export function useGlobalLoading(reactQueryResult: UseQueryResult) {
  const setLoading = useGlobalLoadingStore((state) => state.setIsLoading);

  useEffect(() => {
    if (reactQueryResult.isPending) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [reactQueryResult.isPending, setLoading]);
}
