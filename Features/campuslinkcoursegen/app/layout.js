"use client"
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider, GoogleOneTap } from "@clerk/nextjs";
import { useEffect } from "react";

const inter = Outfit({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  useEffect(() => {
    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en" },
        "google_translate_element"
      );
    };

    const addGoogleTranslateScript = () => {
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    };

    addGoogleTranslateScript();
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  return (
    <ClerkProvider>
      <html lang="en">
        <GoogleOneTap />
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
          <title>CampusLink</title>
        </head>
        <body className={inter.className}>
          <div
            id="google_translate_element"
            style={{ position: "fixed", top: "10px", right: "10px" }}
          ></div>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
