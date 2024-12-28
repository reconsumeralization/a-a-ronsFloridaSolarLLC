"use client";

import { useEffect } from "react";

import Script from "next/script";

import { trackError } from "@/lib/utils/analytics";

export function ClarityAnalytics() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      trackError(event.error, {
        source: "clarity",
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
      });
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  return (
    <Script
      id="microsoft-clarity-init"
      strategy="afterInteractive"
      onError={(e) => {
        console.error("Failed to load Clarity:", e);
        trackError(e, { source: "clarity_load" });
      }}
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
            try {
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            } catch(e) {
              console.error('Clarity init error:', e);
            }
          })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
        `,
      }}
    />
  );
}
