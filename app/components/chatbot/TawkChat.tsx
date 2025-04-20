"use client";
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
  return (
    <>
      <Script id="tawk-to-script" strategy="lazyOnload">
        {`
          var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
          Tawk_API.onLoad = function() {
              setTimeout(() => {
                Tawk_API?.maximize?.();
              }, 5000);
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
