import { Star, User } from "lucide-react";
import { Review } from "@/data/servicesData";

export default function ReviewList({ reviews }: { reviews: Review[] }) {
    if (!reviews || reviews.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-2xl border border-gray-100">
                No reviews yet. Be the first to review!
            </div>
        );
    }

    return (
        <div className="space-y-4">

            <h3 className="text-xl font-bold text-gray-900 mb-4">Customer Reviews ({reviews.length})</h3>
            {reviews.map((review) => (
                <div key={review.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                                <User size={16} />
                            </div>
                            <div>
                                <p className="font-semibold text-sm text-gray-900">{review.user}</p>
                                <p className="text-xs text-gray-500">{review.date}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="font-bold text-xs text-yellow-700">{review.rating}</span>
                        </div>
                    </div>
                    <p className="text-gray-600 text-sm">{review.comment}</p>
                </div>
            ))}
        </div>
    );
}
