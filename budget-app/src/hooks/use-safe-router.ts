import { useGlobalLoadingStore } from "@/states/global-loading";
import axios from "axios";
import { useRouter } from "next/navigation";

export function useSafeRouter() {
  const router = useRouter();

  const setLoading = useGlobalLoadingStore((state) => state.setIsLoading);
  const setNextRoutePath = useGlobalLoadingStore(
    (state) => state.setNextRoutePath
  );

  if (!router) {
    throw new Error("useSafeRouter must be used within a Next.js app");
  }

  return new SafeRouter(router, {
    successCallback: (path: string) => {
      setLoading(false);
      setNextRoutePath("");
    },
    errorCallback: (path: string) => {
      setLoading(true);
      setNextRoutePath(path);
    },
  });
}

export interface LocalStorageSafeRouter {
  isHealthy: boolean;
  timestamp: number;
}

export interface SafeRouterOptions {
  healthCheck: {
    /**
     * URL to check for health
     *
     * @default "/api/health"
     */
    url: string;
    /**
     * Timeout for health check
     *
     * @default 1000
     */
    timeout: number;
  };
  cache: {
    /**
     * Time to live for cache
     *
     * @default 3600000 (1 hour)
     */
    ttl: number;
    /**
     * Key for local storage
     *
     * @default "safe-router"
     */
    localStorageKey: string;
  };
  successCallback?: (path: string) => void;
  errorCallback?: (path: string) => void;
}

export class SafeRouter implements SafeRouterOptions {
  public readonly healthCheck: SafeRouterOptions["healthCheck"];
  public readonly cache: SafeRouterOptions["cache"];

  constructor(
    private router: ReturnType<typeof useRouter>,
    private options?: Partial<SafeRouterOptions>
  ) {
    options = options ?? {};
    this.healthCheck = options.healthCheck ?? {
      url: "/api/health",
      timeout: 1000, // 1 second
    };
    this.cache = options.cache ?? {
      ttl: 1000 * 60 * 60, // 1 hour
      localStorageKey: "safe-router",
    };
  }

  async push(path: string) {
    if (await this.checkHealth()) {
      console.log("Navigating to", path);
      if (this.options?.successCallback) {
        this.options?.successCallback(path);
      }
      this.router.push(path);
    } else {
      console.error("Router is not healthy");
      // console.error(
      //   "The local storage cache may be expired or the health check failed",
      //   JSON.parse(localStorage.getItem(this.cache.localStorageKey) ?? "")
      // );
      if (this.options?.errorCallback) {
        this.options?.errorCallback(path);
      }
    }
  }

  isCacheExpired(): boolean {
    const cache = localStorage.getItem(this.cache.localStorageKey);
    if (cache) {
      const { timestamp } = JSON.parse(cache) as LocalStorageSafeRouter;
      return Date.now() - timestamp >= this.cache.ttl;
    }
    return true;
  }

  async isHealthy(): Promise<boolean> {
    if (this.isCacheExpired()) {
      const isHealthy = await this.checkHealth();
      localStorage.setItem(
        this.cache.localStorageKey,
        JSON.stringify({
          isHealthy,
          timestamp: Date.now(),
        } satisfies LocalStorageSafeRouter)
      );
      return isHealthy;
    } else {
      const { isHealthy } = JSON.parse(
        localStorage.getItem(this.cache.localStorageKey) as string
      ) as LocalStorageSafeRouter;
      return isHealthy;
    }
  }

  async checkHealth(): Promise<boolean> {
    try {
      await axios.get(this.healthCheck.url, {
        timeout: this.healthCheck.timeout,
      });
      return true;
    } catch (error) {
      console.error("Health check failed", error);
      return false;
    }
  }
}
