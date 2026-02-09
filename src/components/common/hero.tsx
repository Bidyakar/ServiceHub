"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <section className="flex flex-col items-center bg-gradient-to-b from-black to-[#191146] text-white px-4 pb-12">

      <h1 className="text-4xl md:text-6xl font-semibold text-center max-w-3xl mt-28">
        One Directory. Multiple Services.
      </h1>

      <p className="text-gray-200 text-sm text-center max-w-sm mt-3">
        Find and book trusted home services in one place.
      </p>

      {/* ✅ Search Bar */}
      <div className="mt-8 w-full max-w-md">
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row bg-white border border-gray-300 rounded-md overflow-hidden"
        >
          <div className="flex items-center flex-1 px-3">
            <input
              type="text"
              placeholder="Search for a service"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-2 py-3 text-sm text-gray-700 outline-none bg-transparent"
            />
          </div>

          <button
            type="submit"
            className="bg-[#191146] hover:bg-[#191146] text-white text-sm font-medium px-6 py-3"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default HeroSection;
