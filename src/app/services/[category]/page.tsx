import Link from "next/link";
import { servicesData } from "@/data/servicesData";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{
        category: string;
    }>;
};

export default async function CategoryPage({ params }: Props) {
    const { category: categorySlug } = await params;
    const category = servicesData.find((c) => c.slug === categorySlug);

    if (!category) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Hero Section */}
            <div className="bg-gradient-to-b from-[#000001] to-[#191146] text-white py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <Link href="/services" className="inline-flex items-center text-white/80 hover:text-white mb-4 transition">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Categories
                    </Link>
                    <h1 className="text-5xl md:text-6xl font-bold capitalize mb-4">
                        {category.name} Services
                    </h1>
                    <p className="text-xl text-indigo-100">
                        {category.description}
                    </p>
                </div>
            </div>

            {/* Subcategories Section */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {category.subcategories.map((subCategory) => (
                        <Link
                            key={subCategory.slug}
                            href={`/services/${categorySlug}/${subCategory.slug}`}
                            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    src={subCategory.image}
                                    alt={subCategory.name}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                            </div>

                            <div className="absolute inset-0 flex flex-col justify-end p-6">
                                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full w-12 h-12 flex items-center justify-center border border-white/30">
                                    <span className="text-2xl">{subCategory.icon}</span>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-white text-2xl font-bold group-hover:text-indigo-300 transition-colors">
                                        {subCategory.name}
                                    </h3>
                                    <p className="text-white/90 text-sm">
                                        {subCategory.description}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
