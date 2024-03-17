import type { Metadata } from "next";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import NextTopLoader from 'nextjs-toploader';

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
       <body>
         <NextTopLoader
            initialPosition={0.08}
            color="#6f00ff"
            crawlSpeed={200}
            height={5}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
            template='<div class="bar" role="bar"><div class="peg"></div></div> 
            <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
            zIndex={1600}
            showAtBottom={false}
          />
         {children}
      </body>
    </html>
  );
}
