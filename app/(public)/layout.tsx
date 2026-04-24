import AppNavigation from "../components/AppNavigation";
import Footer from "../components/Footer";

export default function publicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div>
        <AppNavigation />
        {children}
        <Footer />
      </div>
    </>
  );
}
