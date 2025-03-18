"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

// Define the Tawk_API type to fix TypeScript errors
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
    // Check if window is defined (client-side)
    if (typeof window !== "undefined") {
      // Set initial state
      setIsMobile(window.innerWidth < 768);

      // Add resize listener
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };

      window.addEventListener("resize", handleResize);

      // Clean up
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Auto-open chat when on support page
  useEffect(() => {
    if (isSupportPage && typeof window !== "undefined" && window.Tawk_API) {
      // Give Tawk time to initialize
      setTimeout(() => {
        if (window.Tawk_API && window.Tawk_API.maximize) {
          window.Tawk_API.maximize();
        }
      }, 1000);
    }
  }, [isSupportPage]);

  // Don't render script on mobile unless it's the support page
  if (isMobile && !isSupportPage) {
    return null;
  }

  return (
    <>
      <Script id="tawk-to-script" strategy="lazyOnload">
        {`
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          
          // Define onLoad callback
          Tawk_API.onLoad = function() {
            if (${isSupportPage}) {
              setTimeout(() => {
                if (Tawk_API && Tawk_API.maximize) {
                  Tawk_API.maximize();
                }
              }, 500);
            }
          };
          
          (function(){
          var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
          s1.async=true;
          s1.src='https://embed.tawk.to/67d9aaa81315a2190d0f36f0/1iml458vj';
          s1.charset='UTF-8';
          s1.setAttribute('crossorigin','*');
          s0.parentNode.insertBefore(s1,s0);
          })();
        `}
      </Script>
    </>
  );
}
