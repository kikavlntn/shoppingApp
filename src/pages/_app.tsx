import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { useSzieStore } from "./stores/styleStore";
import { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  const { isFontSizeBig } = useSzieStore();

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    if (isFontSizeBig) {
      htmlElement && htmlElement.classList.add("big");
    } else {
      htmlElement && htmlElement.classList.remove("big");
    }
  }, [isFontSizeBig]);

  return (
    <>
      <Head>
        <title>Shopping Card</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <Component {...pageProps} />
          </SessionProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}
