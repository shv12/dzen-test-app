import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "../globals.css";
import BootstrapClient from "./components/BootstrapClient";
import TopMenu from "./components/TopMenu/TopMenu";
import NavigationMenu from "./components/NavigationMenu/NavigationMenu";
// import css from './app.module.css';
import StoreProvider from "./components/StoreProvider";
import DataInitializer from "./components/DataInitializer/DataInitializer";
import { getI18n } from "../i18n";
import { Locale } from "../types/definitions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dzen Test App",
  description: "Test application for DzenCode",
};

// export async function generateStaticParams() {
//   return [{ lang: 'en' }, { lang: 'ru' }];
// }

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{lang: string}>
}>) {

  const { lang } = await params;
  const dict = await getI18n(lang as Locale);

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-light">
        <StoreProvider dict={dict}>
        {/* <StoreProvider> */}
          <DataInitializer>
            <div className={`container-fluid grow d-flex flex-col min-h-full g-0` }>
              <TopMenu />
              <div className="row grow g-0">
                <div className="col-2 sidebar d-flex flex-col shadow bg-white position-relative z-1">
                  <NavigationMenu />
                </div>
                <div className="col-10 d-flex flex-col">
                  <div className="grow shadow p-4">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </DataInitializer>
        </StoreProvider>
      <BootstrapClient />
      </body>
    </html>
  );
}
