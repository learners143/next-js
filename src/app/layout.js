import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sanjeet",
  description: "Created by Sanjeet",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7733342387004681" crossorigin="anonymous">
        </script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
