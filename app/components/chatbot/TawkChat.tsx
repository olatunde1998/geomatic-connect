"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    Tawk_API?: {
      maximize?: () => void;
      onLoad?: () => void;
    };
  }
}

export default function TawkChat() {
  const [isMobile, setIsMobile] = useState(true);
  const pathname = usePathname();
  const isSupportPage = pathname.endsWith("/support");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isSupportPage && window.Tawk_API?.maximize) {
      const timeoutId = setTimeout(() => {
        window.Tawk_API?.maximize?.();
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [isSupportPage]);

  if (isMobile && !isSupportPage) {
    return null;
  }

  return (
    <>
      <Script id="tawk-to-script" strategy="lazyOnload">
        {`
          var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
          
          Tawk_API.onLoad = function() {
            if (${isSupportPage}) {
              setTimeout(() => {
                Tawk_API?.maximize?.();
              }, 500);
            }
          };
          
          (function() {
            var s1 = document.createElement("script"), 
                s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = '${process.env.NEXT_PUBLIC_TAWK_TO_SCRIPT_URL}';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            s0.parentNode.insertBefore(s1, s0);
          })();
        `}
      </Script>
    </>
  );
}
