import type { Metadata } from "next";
import { Providers } from "./providers";
import "../index.css";

export const metadata: Metadata = {
  title: "VOX Cinemas and Interiors - Home Cinema & Interior Design",
  description:
    "Elevate your living spaces with VOX Cinemas and Interiors. Expert home cinema installations, residential interior design, custom furniture, ceiling design, and smart home automation.",
  authors: [{ name: "VOX Cinemas and Interiors" }],
  openGraph: {
    title: "VOX Cinemas and Interiors - Home Cinema & Interior Design",
    description:
      "Expert home cinema installations, sophisticated interior design, custom furniture, and smart home automation solutions.",
    type: "website",
    images: [
      {
        url: "https://lovable.dev/opengraph-image-p98pqg.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Lovable",
    images: ["https://lovable.dev/opengraph-image-p98pqg.png"],
  },
};

/**
 * Root layout component for the Next.js application
 * @param children - The page content to render
 * @returns The root layout with metadata and providers
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

