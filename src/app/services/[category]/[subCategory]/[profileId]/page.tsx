import Link from "next/link";
import { servicesData } from "@/data/servicesData";
import { notFound } from "next/navigation";
import ReviewForm from "@/components/reviews/ReviewForm";
import ReviewList from "@/components/reviews/ReviewList";

type Props = {
    params: Promise<{
        category: string;
        subCategory: string;
        profileId: string;
    }>;
};

export default async function ProfileDetailPage({ params }: Props) {
    const { category: categorySlug, subCategory: subCategorySlug, profileId } = await params;

    const category = servicesData.find((c) => c.slug === categorySlug);
    if (!category) notFound();

    const subCategory = category.subcategories.find((s) => s.slug === subCategorySlug);
    if (!subCategory) notFound();

    const profile = subCategory.profiles.find((p) => p.id === profileId);
    if (!profile) notFound();

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Header */}
            <div className="bg-gradient-to-b from-[#000001] to-[#191146] text-white py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <Link
                        href={`/services/${categorySlug}/${subCategorySlug}`}
                        className="inline-flex items-center text-white/80 hover:text-white mb-6 transition"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to {subCategory.name}
                    </Link>

                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                        <div className="w-48 h-48  rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl">
                            <img src={profile.images[0]} alt={profile.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl md:text-5xl font-bold mb-3">{profile.name}</h1>
                            <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                                <span className="bg-white/10 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                                    ⭐ {profile.rating}
                                </span>
                                <span className="text-white/60">•</span>
                                <span className="text-white/80">{profile.jobs} Jobs Completed</span>
                                <span className="text-white/60">•</span>
                                <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    Verified
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-3 mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Gallery */}
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">Work Gallery</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {profile.images.map((img, i) => (
                                    <div key={i} className="aspect-square rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition shadow-sm">
                                        <img src={img} alt={`Work ${i + 1}`} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Specialties */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">Specialties & Expertise</h2>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {profile.description.map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl text-gray-700 font-medium">
                                        <span className="text-indigo-500 text-xl">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Reviews Section */}
                        <div id="reviews">
                            <ReviewList reviews={profile.reviews} />
                            <ReviewForm
                                profileId={profile.id}
                                categorySlug={category.slug}
                                subCategorySlug={subCategory.slug}
                            />
                        </div>
                    </div>

                    {/* Sidebar Booking */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 sticky top-8">
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Service Pricing</h3>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold text-indigo-600">${profile.offerRate || profile.hourlyRate}</span>
                                    <span className="text-gray-500">/hour</span>
                                </div>
                                {profile.offerRate && (
                                    <p className="text-gray-400 line-through text-sm">Regular: ${profile.hourlyRate}</p>
                                )}
                            </div>

                            <div className="space-y-4">
                                <button className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
                                    Select & Continue
                                </button>
                                <button className="w-full py-4 border-2 border-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition">
                                    Contact Professional
                                </button>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <span className="text-green-500 font-bold">✓</span>
                                    Satisfaction Guaranteed
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <span className="text-green-500 font-bold">✓</span>
                                    Background Checked Expert
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
