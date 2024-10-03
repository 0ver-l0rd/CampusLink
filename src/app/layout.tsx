"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'en' }, 
        'google_translate_element'
      );
    };

    const addGoogleTranslateScript = () => {
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    };

    // Add Google Translate Script
    addGoogleTranslateScript();
    window.googleTranslateElementInit = googleTranslateElementInit;

    // Add Chatbase configuration script
    window.embeddedChatbotConfig = {
      chatbotId: "U9fKUwa60j_gAAQcVktFu",
      domain: "www.chatbase.co"
    };

    const chatbaseScript = document.createElement('script');
    chatbaseScript.src = "https://www.chatbase.co/embed.min.js";
    chatbaseScript.setAttribute('chatbotId', "U9fKUwa60j_gAAQcVktFu");
    chatbaseScript.setAttribute('domain', "www.chatbase.co");
    chatbaseScript.defer = true;

    document.body.appendChild(chatbaseScript);

    // Clean up the added scripts on component unmount
    return () => {
      document.body.removeChild(chatbaseScript);
      const googleTranslateScript = document.querySelector('script[src="//translate.google.com/translate_a/element.js"]');
      if (googleTranslateScript) {
        document.body.removeChild(googleTranslateScript);
      }
    };
  }, []);

  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
          <title>CampusLink</title>
        </head>
        <body className={inter.className}>
          <div id="google_translate_element" style={{ position: 'fixed', top: '10px', right: '350px' }}></div>
          {children} 
          <ToastContainer position="bottom-right" theme="dark" />
        </body>
      </html>
    </ClerkProvider>
  );
}
