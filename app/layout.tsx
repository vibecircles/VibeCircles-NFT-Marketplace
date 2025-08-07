import { ThirdwebProvider } from "thirdweb/react";
import { Toaster } from "react-hot-toast";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "@/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "thirdweb Marketplace Template",
  description:
		"Create an NFT marketplace on top of your NFT collection on any EVM-compatible blockchain.",
};

export default function RootLayout({
  children,
}: {
	children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative overflow-x-hidden max-w-screen">
        {/* Floating Objects Background */}
        <div className="floating-objects">
          <div className="floating-circle"></div>
          <div className="floating-circle"></div>
          <div className="floating-circle"></div>
          <div className="floating-square"></div>
          <div className="floating-square"></div>
          <div className="floating-triangle"></div>
          <div className="floating-triangle"></div>
        </div>

        <Toaster />
        <ThirdwebProvider>
          <Navbar />
          <div className="w-screen min-h-screen">
            <div className="px-8 mx-auto mt-32 max-w-7xl">
              {children}
            </div>
          </div>
          <Footer />
        </ThirdwebProvider>
      </body>
    </html>
  );
}
