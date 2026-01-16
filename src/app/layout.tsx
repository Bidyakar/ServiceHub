// app/layout.tsx
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />

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
