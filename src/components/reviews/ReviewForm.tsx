"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { addReview } from "@/app/actions/addReview";

interface ReviewFormProps {
    profileId: string;
    categorySlug: string;
    subCategorySlug: string;
}

export default function ReviewForm({ profileId, categorySlug, subCategorySlug }: ReviewFormProps) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setMessage(null);

        const result = await addReview(formData);

        setLoading(false);
        if (result.success) {
            setMessage({ type: "success", text: result.message });
            setRating(0);
            // Optional: Refresh page or update list locally
        } else {
            setMessage({ type: "error", text: result.message });
        }
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Write a Review</h3>

            {message && (
                <div
                    className={`p-3 rounded-lg mb-4 text-sm ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                        }`}
                >
                    {message.text}
                </div>
            )}

            <form action={handleSubmit} className="space-y-4">
                <input type="hidden" name="profileId" value={profileId} />
                <input type="hidden" name="categorySlug" value={categorySlug} />
                <input type="hidden" name="subCategorySlug" value={subCategorySlug} />
                <input type="hidden" name="rating" value={rating} />

                {/* Rating Stars */}
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            className="focus:outline-none transition-transform hover:scale-110"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                        >
                            <Star
                                className={`w-8 h-8 ${star <= (hover || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                    }`}
                            />
                        </button>
                    ))}
                </div>

                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-black mb-1">Your Name</label>
                    <input
                        type="text"
                        name="user"
                        required
                        className="w-full px-4 py-2 border border-black rounded-lg focus:ring-2 focus:ring-indigo-500 text-black focus:border-indigo-500 outline-none transition"
                        placeholder="John Doe"
                    />
                </div>

                {/* Comment */}
                <div>
                    <label className="block text-sm font-medium text-black mb-1">Your Review</label>
                    <textarea
                        name="comment"
                        required
                        rows={3}
                        className="w-full px-4 py-2 border border-black text-black rounded-lg focus:ring-2 focus:ring-indigo-500 text-black focus:border-indigo-500 outline-none transition"
                        placeholder="Share your experience..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading || rating === 0}
                    className={`w-full py-2 px-4 rounded-xl font-semibold text-white transition-all shadow-md ${loading || rating === 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5"
                        }`}
                >
                    {loading ? "Submitting..." : "Submit Review"}
                </button>
            </form>
        </div>
    );
}
