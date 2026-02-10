"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "../../app/globals.css";

import { usePathname } from "next/navigation";
import { logout } from "@/app/actions/userAuth";
import { getCurrentUser } from "@/app/actions/userProfile";
import { User } from "@/lib/userStorage";

export default function Navbar({ isLoggedIn }: { isLoggedIn: string | null }) {
  // All hooks MUST be called before any conditional returns
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (isLoggedIn) {
      getCurrentUser().then(setUser);
    } else {
      setUser(null);
    }
  }, [isLoggedIn, pathname]);

  // 🔒 Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
  }, [mobileOpen]);

  // Early return AFTER all hooks
  if (pathname?.startsWith('/admin') || pathname?.startsWith('/esewa-payment')) {
    return null;
  }

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    ...(isLoggedIn ? [] : [{ name: "Login", href: "/login" }]),
  ];

  return (
    <>
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-gradient-to-b from-[#000001] to-[#191146] shadow-sm rounded-b-4xl mt-4 md:mt-3 lg:mt-6">
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
              {navItems.map((item) => (
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
              <button
                onClick={() => window.open("https://wa.me/9815614201", "_blank")}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 active:scale-95"
              >
                WhatsApp
              </button>

              {isLoggedIn && (
                <div className="relative">
                  {/* Avatar Button with Rainbow Effect */}
                  <div className="rainbow relative z-0 overflow-hidden p-[2px] flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden bg-[#191146] shadow-md transition-all relative z-10"
                    >
                      {user?.avatar ? (
                        <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-white font-bold text-lg select-none">
                          {user?.firstName?.charAt(0) || 'U'}
                        </span>
                      )}
                    </button>
                  </div>

                  {/* Dropdown Menu */}
                  {userMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setUserMenuOpen(false)}
                      />
                      <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="px-4 py-2 border-b border-gray-50 mb-1">
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Account</p>
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {user ? `${user.firstName} ${user.lastName}` : 'Logged In'}
                          </p>
                        </div>

                        <Link
                          href="/profile"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          My Profile
                        </Link>

                        <button
                          onClick={async () => {
                            await logout();
                          }}
                          className="flex items-center w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Logout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
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
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Slide Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-3/4 max-w-sm bg-gradient-to-b from-[#000001] to-[#191146] p-6 shadow-xl transform transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {/* Close */}
          <button
            onClick={() => setMobileOpen(false)}
            className="text-white text-2xl mb-6"
            aria-label="Close menu"
          >
          </button>
          {/* Links */}
          <nav className="flex flex-col gap-5 text-lg">
            {isLoggedIn && (
              <div className="mb-4">
                <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl border border-white/10">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center text-white font-bold bg-gray-800 border-2 border-white/10">
                    {user?.avatar ? (
                      <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
                    ) : (
                      user?.firstName?.charAt(0) || 'U'
                    )}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-white font-semibold truncate text-sm">
                      {user ? `${user.firstName} ${user.lastName}` : 'Account'}
                    </p>
                    <p className="text-gray-400 text-xs truncate">{isLoggedIn}</p>
                  </div>
                </div>
              </div>
            )}
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-white"
              >
                {item.name}
              </Link>
            ))}
            <div className="rainbow relative z-0 overflow-hidden p-0.5 flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100"></div>
            {isLoggedIn && (
              <button
                onClick={async () => {
                  setMobileOpen(false);
                  await logout();
                }}
                className="mt-4 flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-red-500/10 text-red-500 font-semibold border border-red-500/20 active:scale-95 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            )}
            <button
              onClick={() => window.open("https://wa.me/9815614201", "_blank")}
              className="mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-all active:scale-95 w-full"
            >
              WhatsApp
            </button>
          </nav>
        </div >
      </div >
    </>
  );
}
