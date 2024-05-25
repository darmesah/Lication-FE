"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTokenStore } from "@/lib/store/tokenStore";

function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const setToken = useTokenStore((state) => state.setToken);
  const token: string | null = useTokenStore((state) => state.token);

  useEffect(() => {
    // Check if running on client-side before accessing localStorage
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      const tokenExpiry = localStorage.getItem("tokenExpiry");

      if (!storedToken) {
        return router.push("/login");
      }

      if (!tokenExpiry) {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiry");
      }

      if (tokenExpiry) {
        const tokenExpiryTime = parseInt(tokenExpiry, 10);
        const currentTime = Date.now();

        if (currentTime > tokenExpiryTime) {
          // Token has expired, log the user out
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiry");
          return router.push("/login");
        }
      }

      // router.push("/dashboard");
      setToken(storedToken);
    }
  }, [router, setToken]);

  return <div>{children}</div>;
}

export default Layout;
