import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
// const inter = Inter({ subsets: ["latin"] });
import theme from './theme';



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme} >
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>

    </html>
  );
}
