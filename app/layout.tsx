import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from  '../components/AuthProvider/AuthProvider'

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
weight: ['400', '700'],
display: 'swap',
});


export const metadata: Metadata = {
  title: "NoteHub",
  description: "A simple and efficient application for managing personal notes.",
  openGraph: {
    title: "NoteHub - Your Personal Note-Taking App",
    description: "Organize your thoughts and boost productivity with NoteHub, a simple and efficient note-taking application.",
    url: "https://08-zustand-three-jet.vercel.app",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
       <TanStackProvider>
          <AuthProvider>
            <Header />
            {children}
            {modal}
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
