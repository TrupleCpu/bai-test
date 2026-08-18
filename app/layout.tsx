import type { Metadata } from "next";
import { Lexend, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LiveChat from "@/components/LiveChat";

const heading = Lexend({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const body = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BAI Finance — Your Friend for Home Loans",
    template: "%s | BAI Finance",
  },
  description:
    "BAI Finance is a trusted loan brokerage helping clients across the Philippines secure home, refinance, investment, personal and car loans with support from leading Australian lenders — with secure, invite-only application tracking.",
  keywords: [
    "home loans",
    "loan brokerage",
    "BAI Finance",
    "mortgage",
    "refinancing",
    "investment loans",
    "Philippines",
  ],
  metadataBase: new URL("https://baifinance.example.com"),
  openGraph: {
    title: "BAI Finance — Your Friend for Home Loans",
    description:
      "Loan application tracking and brokerage with secure, invite-only access.",
    type: "website",
    locale: "en_PH",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${heading.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-ink">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <LiveChat />
      </body>
    </html>
  );
}
