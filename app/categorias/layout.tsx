import type { Metadata } from "next";
import "../globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "IMCYC | UDEM Compartiendo el conocimiento",
  description: "IMCYC | UDEM Compartiendo el conocimiento, Instituto Mexicano del Cemento y del Concreto A.C.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
