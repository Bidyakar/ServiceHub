"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import"../../app/globals.css";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // 🔒 Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
  }, [mobileOpen]);

  return (
    <>
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-gradient-to-b from-[#000001] to-[#340063] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link
              href="/"
              className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
            >
              ServiceHub
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {[
                { name: "Home", href: "/" },
                { name: "Services", href: "/booking" },
                { name: "About", href: "/about" },
                { name: "Contact", href: "/contact" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-indigo-600 font-medium relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="/login" className="text-white hover:text-indigo-600 font-medium">
                Login
              </Link>

              <button
                onClick={() => window.open("https://wa.me/9815614201", "_blank")}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                WhatsApp
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10"
              aria-label="Open menu"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Slide Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-3/4 max-w-sm bg-gradient-to-b from-[#000001] to-[#340063] p-6 shadow-xl transform transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Close */}
          <button
            onClick={() => setMobileOpen(false)}
            className="text-white text-2xl mb-6"
            aria-label="Close menu"
          >
            ✕
          </button>

          {/* Links */}
          <nav className="flex flex-col gap-5 text-lg">
            {[
              { name: "Home", href: "/" },
              { name: "Services", href: "/booking" },
              { name: "About", href: "/about" },
              { name: "Contact", href: "/contact" },
              { name: "Login", href: "/login" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-white"
              >
                {item.name}
              </Link>
            ))}

            <button
              onClick={() => window.open("https://wa.me/9815614201", "_blank")}
              className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-full font-semibold"
            >
              WhatsApp
            </button>
          </nav>
        </div>
      </div>
    </>
  );
}
