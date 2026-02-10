import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import "./globals.css";
import { getUserSession } from "@/lib/auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoggedIn = await getUserSession();

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar isLoggedIn={isLoggedIn} />

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer ALWAYS visible */}
        <Footer />
      </body>
    </html>
  );
}
