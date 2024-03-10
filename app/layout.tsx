import type { Metadata } from "next";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata: Metadata = {
  title: "Oqtepa Lavash",
  description: "Savor the taste of exceptional fast food from Oqtepa Lavash. Explore our diverse menu and order online for swift and convenient delivery in your area. Indulge in our delectable meals crafted from the freshest ingredients and take advantage of our irresistible deals. Experience the ultimate satisfaction of flavorful fast food meals, only at Oqtepa Lavash."
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
