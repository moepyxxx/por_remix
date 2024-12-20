import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import { useEffect, useRef } from "react";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Lexend+Exa:wght@100..900&family=Zen+Kaku+Gothic+New:wght@500&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  // see: https://qiita.com/99no_exit/items/d159e16a2001530f0b4e
  const widthRef = useRef<number>(0);
  useEffect(() => {
    const reloadHandler = () => {
      // 多少のズレを許容する
      if (Math.abs(widthRef.current - window.innerWidth) <= 10) {
        return;
      }
      widthRef.current = window.innerWidth;
      window.location.reload();
    };
    window.addEventListener("resize", reloadHandler);

    return () => {
      window.removeEventListener("resize", reloadHandler);
    };
  }, []);

  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-thin-gray">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function HydrateFallback() {
  return <></>;
}
