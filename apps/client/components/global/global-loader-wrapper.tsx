"use client";
import { useEffect, useState } from "react";
import GlobalLoader from "./global-loader";
import { usePathname } from "next/navigation";

const GlobalLoaderWrapper = () => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!isLoading) return null;

  return <GlobalLoader />;

};

export default GlobalLoaderWrapper;