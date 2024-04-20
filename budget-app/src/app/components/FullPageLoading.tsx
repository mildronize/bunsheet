import { useHealthCheck } from "@/hooks/use-health-check";
import { useSafeRouter } from "@/hooks/use-safe-router";
import { useGlobalLoadingStore } from "@/states/global-loading";
import { CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export function FullPageLoading() {
  const router = useRouter();
  const isLoading = useGlobalLoadingStore((state) => state.isLoading);
  const setIsLoading = useGlobalLoadingStore((state) => state.setIsLoading);
  const nextRoutePath = useGlobalLoadingStore((state) => state.nextRoutePath);

  useHealthCheck({
    onSuccess: async () => {
      setIsLoading(false);
      router.push(nextRoutePath);
    },
  });

  if (!isLoading) return null;
  return (
    <div
      style={{
        zIndex: 9999,
        position: "fixed",
        left: 0,
        top: 0,
        width: "100%",
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            textAlign: "center",
            color: "text.secondary",
            marginBottom: "1rem",
          }}
        >
          The server is may be sleeping, <br />
          please wait...
        </Typography>
        <CircularProgress />
      </div>
    </div>
  );
}
