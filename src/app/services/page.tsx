import Link from "next/link";
import { servicesData } from "@/data/servicesData";

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Hero Section */}
            <div className="bg-gradient-to-b from-[#000001] to-[#191146] text-white py-16 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                        Find Your Perfect Service
                    </h1>
                    <p className="md:text-2xl text-white/90 mb-8">
                        Professional home services at your fingertips
                    </p>
                </div>
            </div>

            {/* Categories Section */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                        Choose a Service Category
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Select from our wide range of professional services
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {servicesData.map((category, index) => (
                        <Link
                            key={category.slug}
                            href={`/services/${category.slug}`}
                            className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                            <div className="relative p-6">
                                <div className={`${category.bgColor} w-20 h-20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    <span className="text-4xl">{category.icon}</span>
                                </div>

                                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-transparent bg-clip-text bg-gradient-to-r from-[#8139c6] to-[#39C681] transition-all duration-300">
                                    {category.name}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    {category.description}
                                </p>

                                <div className="flex items-center text-[#8139c6] font-semibold group-hover:gap-2 transition-all duration-300">
                                    <span>Explore Subcategories</span>
                                    <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
