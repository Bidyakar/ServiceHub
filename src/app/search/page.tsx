"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { Search, MapPin, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { servicesData } from "@/data/servicesData";

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = (searchParams.get("q") || "").toLowerCase();

    // Dynamic search across all data
    const flatResults: any[] = [];

    servicesData.forEach(category => {
        // Search in categories
        if (category.name.toLowerCase().includes(query)) {
            flatResults.push({ type: 'category', data: category, path: `/services/${category.slug}` });
        }

        category.subcategories.forEach(sub => {
            // Search in subcategories
            if (sub.name.toLowerCase().includes(query)) {
                flatResults.push({ type: 'subcategory', data: sub, categorySlug: category.slug, path: `/services/${category.slug}/${sub.slug}` });
            }

            sub.profiles.forEach(profile => {
                // Search in profiles
                if (profile.name.toLowerCase().includes(query)) {
                    flatResults.push({ type: 'profile', data: profile, categorySlug: category.slug, subCategorySlug: sub.slug, path: `/services/${category.slug}/${sub.slug}/${profile.id}` });
                }
            });
        });
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-[#000001] to-[#340063] text-white py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md">
                            <Search className="w-8 h-8 text-indigo-400" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold">Search Results</h1>
                    </div>
                    <p className="text-xl text-white/70">
                        {flatResults.length} matches found for <span className="text-white underline font-semibold decoration-indigo-500 decoration-2 underline-offset-4">"{query}"</span>
                    </p>
                </div>
            </div>

            {/* Results Section */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                {flatResults.length === 0 ? (
                    <div className="text-center py-32 bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-gray-100">
                            <Search className="w-12 h-12 text-gray-300" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">No services found</h3>
                        <p className="text-gray-500 text-lg max-w-md mx-auto">
                            We couldn't find anything matching your search. Try different keywords like "Plumber", "Auto", or "Electrician".
                        </p>
                        <Link href="/services" className="mt-8 inline-flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all">
                            Browse all categories <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {flatResults.map((result, idx) => (
                            <Link
                                key={`${result.type}-${idx}`}
                                href={result.path}
                                className="group bg-white rounded-3xl p-6 shadow-lg shadow-gray-200/40 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 border border-gray-100 flex flex-col h-full"
                            >
                                {/* Result Tag */}
                                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 bg-gray-50 text-gray-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors self-start">
                                    {result.type}
                                </span>

                                {/* Content */}
                                {result.type === 'profile' ? (
                                    <>
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md">
                                                <img src={result.data.images[0]} alt={result.data.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors uppercase">{result.data.name}</h3>
                                                <div className="flex items-center gap-1 text-yellow-500">
                                                    <Star className="w-4 h-4 fill-yellow-500" />
                                                    <span className="text-sm font-bold text-gray-900">{result.data.rating}</span>
                                                    <span className="text-gray-400 text-xs ml-1">({result.data.jobs} jobs)</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                                            <div className="text-indigo-600 font-bold text-lg">
                                                ${result.data.offerRate || result.data.hourlyRate}/hr
                                            </div>
                                            <div className="flex items-center gap-1 text-indigo-600 font-bold text-sm">
                                                View <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl shadow-inner">
                                                {result.data.icon}
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors capitalize">{result.data.name}</h3>
                                        </div>
                                        <p className="text-gray-500 mb-6">{result.data.description}</p>
                                        <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-end text-indigo-600 font-bold text-sm">
                                            Explore {result.type} <ArrowRight className="w-4 h-4 ml-2" />
                                        </div>
                                    </>
                                )}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}