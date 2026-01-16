"use client";

import Link from "next/link";

export default function Footer() {
  const resources = [
    { name: "Company", href: "/company" },
    { name: "Blogs", href: "/blogs" },
    { name: "Community", href: "/community" },
    { name: "Careers", href: "/careers" },
    { name: "About", href: "/about" },
  ];

  return (
    <footer className="bg-gradient-to-b from-[#000001] to-[#340063] text-[13px] text-gray-400 font-poppins">
      <div className="mx-auto max-w-7xl px-6 py-10 md:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          {/* Left Section */}
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-12">
            {/* Logo */}
            <div>
              <Link href="/">
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                  ServiceHub
                </span>
              </Link>
            </div>

            {/* Product Links */}
            <div>
              <p className="text-white font-semibold mb-2">Product</p>
              <ul className="space-y-2">
                {["Home", "Support", "Pricing", "Affiliate"].map((link) => (
                  <li key={link}>
                    <Link href="/" className="hover:text-indigo-500 transition">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <p className="text-white font-semibold mb-2">Resources</p>
              <ul className="space-y-2">
                {resources.map((resource) => (
                  <li key={resource.name} className="flex items-center gap-2">
                    <Link
                      href={resource.href}
                      className="hover:text-indigo-500 transition"
                    >
                      {resource.name}
                    </Link>

                    {resource.name === "Careers" && (
                      <span className="text-[10px] text-white bg-indigo-600 rounded px-2 py-0.5">
                        We’re hiring
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <p className="text-white font-semibold mb-2">Legal</p>
              <ul className="space-y-2">
                {["Privacy", "Terms"].map((link) => (
                  <li key={link}>
                    <Link href="/" className="hover:text-indigo-500 transition">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col items-start lg:items-end gap-4">
            <p className="max-w-xs text-left lg:text-right">
              Making every customer feel valued—no matter the size of your
              audience.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              {/* Dribbble */}
              <a
                href="https://dribbble.com/prebuiltui"
                target="_blank"
                rel="noreferrer"
                className="hover:text-indigo-500 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
                  <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
                  <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/prebuiltui"
                target="_blank"
                rel="noreferrer"
                className="hover:text-indigo-500 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://x.com/prebuiltui"
                target="_blank"
                rel="noreferrer"
                className="hover:text-indigo-500 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-white/10 pt-4 text-center text-gray-500">
          © 2025{" "}
          <a
            href="https://prebuiltui.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-indigo-500 transition"
          >
            PrebuiltUI
          </a>
        </div>
      </div>
    </footer>
  );
}
