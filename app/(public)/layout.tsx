import AppNavigation from "../components/AppNavigation";
import Footer from "../components/Footer";

export default function publicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body>
        <AppNavigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
