"use client";

import { useState } from "react";
import Link from "next/link";
import { Profile } from "@/data/servicesData";

type ProfileCardProps = {
    profile: Profile;
    categorySlug: string;
    subCategorySlug: string;
};

export default function ProfileCard({
    profile,
    categorySlug,
    subCategorySlug,
}: ProfileCardProps) {
    const [thumbnail, setThumbnail] = useState(profile.images[0]);

    return (
        <div className="group bg-gradient-to-br from-[#000001] via-[#5d70a3] to-[#340063] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100/10">
            <div className="flex flex-col lg:flex-row gap-6 p-6">
                {/* Image Section */}
                <div className="flex gap-3 lg:w-2/5">
                    {/* Thumbnail Column */}
                    <div className="flex flex-col gap-3">
                        {profile.images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setThumbnail(image)}
                                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${thumbnail === image
                                    ? "border-indigo-500 ring-2 ring-indigo-200"
                                    : "border-gray-200/20 hover:border-indigo-300"
                                    }`}
                            >
                                <img
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>

                    {/* Main Image */}
                    <div className="flex-1 rounded-xl overflow-hidden border-2 border-gray-200/20 group-hover:border-indigo-300 transition-colors">
                        <img
                            src={thumbnail}
                            alt="Selected profile"
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </div>

                {/* Details Section */}
                <div className="flex-1 flex flex-col justify-between">
                    {/* Header */}
                    <div>
                        <div className="flex items-start justify-between mb-3">
                            <h2 className="text-2xl md:text-3xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                                {profile.name}
                            </h2>
                            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                                ✓ Verified
                            </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-6 text-white">
                            <div className="flex items-center gap-0.5">
                                {Array(5)
                                    .fill("")
                                    .map((_, i) => (
                                        <svg
                                            key={i}
                                            width="18"
                                            height="17"
                                            viewBox="0 0 18 17"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={profile.rating > i ? "opacity-100" : "opacity-30"}
                                        >
                                            <path
                                                d="M8.049.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L9.589 13.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L4.78 10.99a1 1 0 0 0-.363-1.118L1.028 7.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69z"
                                                fill="#FFB800"
                                            />
                                        </svg>
                                    ))}
                            </div>
                            <span className="text-lg font-bold">{profile.rating}</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-300 font-medium">{profile.jobs} jobs completed</span>
                        </div>

                        {/* Pricing */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6 border border-white/5">
                            <p className="text-gray-400 line-through text-sm mb-1">
                                Regular Rate: ${profile.hourlyRate}/hr
                            </p>
                            <div className="flex items-baseline gap-2">
                                <p className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                    ${profile.offerRate || profile.hourlyRate}
                                </p>
                                <span className="text-gray-300 font-semibold">/hour</span>
                            </div>
                        </div>

                        {/* About */}
                        <div className="mb-6">
                            <p className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                                <span className="text-indigo-400">💼</span> About Professional
                            </p>
                            <ul className="space-y-2">
                                {profile.description.map((desc, index) => (
                                    <li key={index} className="flex items-start gap-2 text-gray-200">
                                        <span className="text-indigo-400 mt-0.5 flex-shrink-0">✓</span>
                                        <span>{desc}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                        <Link
                            href={`/services/${categorySlug}/${subCategorySlug}/${profile.id}`}
                            className="flex-1 py-3 px-4 text-center font-semibold rounded-xl border-2 border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 transition-all transform hover:-translate-y-0.5"
                        >
                            View Profile
                        </Link>
                        <Link
                            href="/esewa-payment"
                            className="flex-1 py-3 px-4 text-center font-semibold rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                        >
                            Book Now →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
