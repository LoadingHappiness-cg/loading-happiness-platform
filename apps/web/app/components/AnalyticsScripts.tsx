import Script from 'next/script';

export default function AnalyticsScripts() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const umamiSrc = process.env.NEXT_PUBLIC_UMAMI_SRC;
  const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const umamiDomains = process.env.NEXT_PUBLIC_UMAMI_DOMAINS;

  return (
    <>
      {gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga-setup" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}
      {umamiSrc && umamiWebsiteId && (
        <Script
          src={umamiSrc}
          data-website-id={umamiWebsiteId}
          data-domains={umamiDomains || undefined}
          data-auto-track="true"
          strategy="afterInteractive"
        />
      )}
    </>
  );
}
