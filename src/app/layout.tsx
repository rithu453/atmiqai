import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Atmiq AI – AI That Writes in Your Voice",
    template: "%s | Atmiq AI",
  },
  description:
    "Atmiq AI clones your writing style. Paste your text, sync your voice, and let AI speak like you.",
  icons: {
    icon: "/image.png",
    shortcut: "/image.png",
    apple: "/image.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://atmiqai.dev",
    siteName: "Atmiq AI",
    title: "Atmiq AI – AI That Writes in Your Voice",
    description: "Atmiq AI clones your writing style. Paste your text, sync your voice, and let AI speak like you.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("atmiq_theme");if(t==="light")document.documentElement.classList.remove("dark");else document.documentElement.classList.add("dark")}catch(e){}})()`,
          }}
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-F9GQSMKBT9"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-F9GQSMKBT9');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Atmiq AI",
              "url": "https://atmiqai.dev",
              "description": "AI That Writes in Your Voice",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://atmiqai.dev/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Atmiq AI",
              "url": "https://atmiqai.dev",
              "logo": "https://atmiqai.dev/image.png",
              "sameAs": []
            }),
          }}
        />
      </head>
      <body className="min-h-screen font-sans">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
