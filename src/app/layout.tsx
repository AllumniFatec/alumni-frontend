import type { Metadata } from "next";
import { Roboto_Slab, Roboto } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";
import Footer from "@/components/Footer";

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Alumni FATEC Sorocaba",
  description: "Sistema de gerenciamento de ex-alunos da FATEC Sorocaba",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full">
      <body
        className={`${robotoSlab.variable} ${roboto.variable} antialiased flex flex-col min-h-screen bg-slate-50`}
        suppressHydrationWarning={true}
      >
        <Providers>
          <main className="flex-1 w-full flex flex-col">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
