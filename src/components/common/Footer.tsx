"use client";

import Link from "next/link";

const productLinks = [
  { name: "Home", href: "/" },
  { name: "Support", href: "/support" },
  { name: "Pricing", href: "/pricing" },
  { name: "Affiliate", href: "/affiliate" },
];

const resourcesLinks = [
  { name: "Company", href: "/company" },
  { name: "Blogs", href: "/blogs" },
  { name: "Community", href: "/community" },
  { name: "Careers", href: "/careers" },
  { name: "About", href: "/about" },
];

const legalLinks = [
  { name: "Privacy", href: "/privacy" },
  { name: "Terms", href: "/terms" },
];

const socialLinks = [
  {
    name: "Dribbble",
    href: "https://dribbble.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
        <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
        <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-[#000001] to-[#191146] text-[13px] text-gray-400 font-poppins">
      <div className="mx-auto max-w-7xl px-6 py-10 md:py-16">

        {/* Top Section */}
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">

          {/* Left */}
          <div className="flex flex-col gap-8 sm:flex-row sm:gap-12">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              ServiceHub
            </Link>

            <FooterColumn title="Product" links={productLinks} />
            <FooterColumn title="Resources" links={resourcesLinks} highlight="Careers" />
            <FooterColumn title="Legal" links={legalLinks} />
          </div>

          {/* Right */}
          <div className="flex flex-col items-start lg:items-end gap-4">
            <p className="max-w-xs text-left lg:text-right">
              Making every customer feel valued—no matter the size of your audience.
            </p>

            <div className="flex gap-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="hover:text-indigo-500 transition"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-white/10 pt-4 text-center">
          <p className="text-white/70">
            © {year} Home Services. All rights reserved.
            <br />
            Developed by{" "}
            <a
              href="https://bidyakar.com.np"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange hover:underline"
            >
              BB
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* Reusable Column */
function FooterColumn({
  title,
  links,
  highlight,
}: {
  title: string;
  links: { name: string; href: string }[];
  highlight?: string;
}) {
  return (
    <div>
      <p className="text-white font-semibold mb-2">{title}</p>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.name} className="flex items-center gap-2">
            <Link href={link.href} className="hover:text-indigo-500 transition">
              {link.name}
            </Link>
            {highlight === link.name && (
              <span className="text-[10px] text-white bg-indigo-600 rounded px-2 py-0.5">
                We’re hiring
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
