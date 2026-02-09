import { Star, Quote } from "lucide-react";
import { servicesData, Review, Profile } from "@/data/servicesData";

export default function FeaturedReviews() {
    // Flatten all reviews to find the best ones
    const allReviews: { review: Review; profileName: string; profileImage: string }[] = [];

    servicesData.forEach((cat) => {
        cat.subcategories.forEach((sub) => {
            sub.profiles.forEach((profile) => {
                if (profile.reviews) {
                    profile.reviews.forEach((review) => {
                        if (review.rating >= 4) {
                            allReviews.push({
                                review,
                                profileName: profile.name,
                                profileImage: profile.images[0],
                            });
                        }
                    });
                }
            });
        });
    });

    // Shuffle and pick 3 (or sort by date/rating)
    // For now, let's just take the first 3 or specific ones if available
    const featured = allReviews.slice(0, 3);

    if (featured.length === 0) return null;

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-12">

                    <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>

                    <p className="text-black max-w-2xl mx-auto">
                        Real stories from satisfied homeowners who found the perfect professional on ServiceHub.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {featured.map((item, index) => (
                        <div

                            key={index}
                            className="bg-gray-50 p-8 rounded-2xl relative group hover:-translate-y-2 transition-transform duration-300"
                        >

                            <Quote className="absolute top-6 right-6 text-indigo-200 w-8 h-8 group-hover:text-indigo-300 transition-colors" />

                            <div className="flex gap-1 mb-4">

                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < item.review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                            }`}
                                    />
                                ))}
                            </div>


                            <p className="text-gray-700 mb-6 italic">"{item.review.comment}"</p>

                            <div className="flex items-center gap-4 border-t border-gray-200 pt-4">
                                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                                    {/* Placeholder for user avatar or use initials */}
                                    <div className="w-full h-full flex items-center justify-center bg-indigo-100 text-indigo-600 font-bold">
                                        {item.review.user.charAt(0)}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm">{item.review.user}</h4>
                                    <p className="text-xs text-gray-500">Hired {item.profileName}</p>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
}
