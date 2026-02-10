"use client";

import { useState } from "react";
import { servicesData } from "@/data/servicesData";
import { addProfessional } from "@/app/actions/addProfessional";
import { useRouter } from "next/navigation";

export default function AddProfessionalPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const [selectedCategory, setSelectedCategory] = useState(servicesData[0].slug);
    const category = servicesData.find((c) => c.slug === selectedCategory);

    // Create Profile ID from Name logic
    const [name, setName] = useState("");
    const [profileId, setProfileId] = useState("");

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setName(val);
        setProfileId(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""));
    };

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setMessage(null);

        const result = await addProfessional(formData);

        setLoading(false);
        if (result.success) {
            setMessage({ type: "success", text: result.message });
            // Reset form or redirect
            setTimeout(() => {
                router.push("/admin/dashboard");
            }, 2000);
        } else {
            setMessage({ type: "error", text: result.message });
        }
    }

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Professional</h1>

            {message && (
                <div
                    className={`p-4 rounded-lg mb-6 ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                        }`}
                >
                    {message.text}
                </div>
            )}

            <form action={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={name}
                            onChange={handleNameChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                            placeholder="e.g. John Doe"
                        />
                    </div>

                    {/* Profile ID */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Profile ID (Slug)</label>
                        <input
                            type="text"
                            name="profileId"
                            required
                            value={profileId}
                            onChange={(e) => setProfileId(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                            placeholder="e.g. john-doe"
                        />
                        <p className="text-xs text-gray-400 mt-1">Unique identifier for URL</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            name="category"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                        >
                            {servicesData.map((cat) => (
                                <option key={cat.slug} value={cat.slug}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Subcategory */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
                        <select
                            name="subcategory"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                        >
                            {category?.subcategories.map((sub) => (
                                <option key={sub.slug} value={sub.slug}>
                                    {sub.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Hourly Rate */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate ($)</label>
                        <input
                            type="number"
                            name="hourlyRate"
                            required
                            min="0"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                            placeholder="0.00"
                        />
                    </div>

                    {/* Offer Rate */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Offer Rate ($) <span className="text-gray-400 font-normal">(Optional)</span></label>
                        <input
                            type="number"
                            name="offerRate"
                            min="0"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                            placeholder="0.00"
                        />
                    </div>
                </div>

                {/* Images */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URLs (Comma separated)</label>
                    <input
                        type="text"
                        name="images"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                        placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                    />
                    <p className="text-xs text-gray-400 mt-1">Leave empty to use a default placeholder image.</p>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description / Specialties</label>
                    <textarea
                        name="description"
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                        placeholder="Enter each point on a new line..."
                        defaultValue={`Years of experience\nCertified professional\nSatisfaction guaranteed`}
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-white transition-all shadow-lg ${loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-xl hover:-translate-y-0.5"
                        }`}
                >
                    {loading ? "Saving..." : "Add Professional"}
                </button>
            </form>
        </div>
    );
}
