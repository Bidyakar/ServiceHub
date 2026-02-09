"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import HeroSection from "../components/common/hero";
import FeaturedReviews from "@/components/home/FeaturedReviews";
import { servicesData } from "@/data/servicesData";

// Helper to get top providers
function getTopProviders() {
  const allProfiles: any[] = [];

  servicesData.forEach((category) => {
    category.subcategories.forEach((subCategory) => {
      subCategory.profiles.forEach((profile) => {
        allProfiles.push({
          ...profile,
          categorySlug: category.slug,
          subCategorySlug: subCategory.slug,
          specialty: subCategory.name,
          image: profile.images[0] || "/images/providers/default.jpg", // Fallback
          reviewCount: profile.reviews ? profile.reviews.length : 0,
        });
      });
    });
  });

  // Sort by Rating (desc) then Review Count (desc)
  return allProfiles
    .sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      return b.reviewCount - a.reviewCount;
    })
    .slice(0, 4);
}

// Separate card component for each provider
function ProviderCard({ provider }: { provider: any }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  return (
    <Link
      key={provider.id}
      href={`/services/${provider.categorySlug}/${provider.subCategorySlug}/${provider.id}`}
      className="group"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        className="relative w-80 h-96 rounded-xl p-px bg-gray-900 overflow-hidden shadow-lg cursor-pointer"
      >
        {/* Hover glow */}
        <div
          className={`pointer-events-none blur-3xl rounded-full bg-gradient-to-r from-[#000001] via-[#191146] to-[#000001] size-60 absolute transition-opacity duration-500 ${active ? "opacity-100" : "opacity-0"
            }`}
          style={{
            top: position.y - 120,
            left: position.x - 120,
          }}
        />

        {/* Card content */}
        <div className="relative z-10 bg-gray-900/80 p-6 h-full w-full rounded-[11px] flex flex-col items-center text-center">
          <img
            src={provider.image}
            alt={provider.name}
            className="w-24 h-24 rounded-full shadow-md my-4 object-cover"
          />

          <h3 className="text-xl font-bold text-white line-clamp-1">{provider.name}</h3>

          <p className="text-sm text-indigo-400 font-medium mb-2">
            {provider.specialty}
          </p>

          <p className="text-indigo-500 font-semibold mb-3 flex items-center gap-1">
            ⭐ {provider.rating} <span className="text-xs text-gray-500">({provider.reviewCount})</span>
          </p>

          <p className="text-sm text-slate-400 px-4 line-clamp-3">
            {provider.description && provider.description[0]
              ? provider.description[0]
              : "Experienced specialist delivering reliable and professional service."}
          </p>

          <span className="mt-auto text-indigo-400 text-sm font-medium group-hover:underline">
            View Profile →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const providers = getTopProviders();

  return (
    <>
      <HeroSection />

      <section className="py-16 px-6 md:px-16 lg:px-24 xl:px-32 bg-white">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Top Service Providers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {providers.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      </section>

      <FeaturedReviews />

    </>
  );
}
