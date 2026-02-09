import Link from "next/link";
import { servicesData } from "@/data/servicesData";
import { notFound } from "next/navigation";
import ProfileCard from "@/components/services/ProfileCard";

type Props = {
    params: Promise<{
        category: string;
        subCategory: string;
    }>;
};

export default async function ProfilesPage({ params }: Props) {
    const { category: categorySlug, subCategory: subCategorySlug } = await params;

    const category = servicesData.find((c) => c.slug === categorySlug);
    if (!category) notFound();

    const subCategory = category.subcategories.find((s) => s.slug === subCategorySlug);
    if (!subCategory) notFound();

    const profiles = subCategory.profiles;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-[#000001] to-[#191146] p-6">
            <div className="max-w-7xl mx-auto">
                <p className="text-sm mb-4 text-white">
                    <Link href="/services" className="hover:text-white">Services</Link> /{" "}
                    <Link href={`/services/${categorySlug}`} className="hover:text-white capitalize">{category.name}</Link> /{" "}
                    <span className="text-white capitalize font-medium">{subCategory.name}</span>
                </p>

                <h1 className="text-3xl font-bold mb-8 text-white">
                    Top {subCategory.name} Professionals
                </h1>

                <div className="grid gap-8">
                    {profiles.length > 0 ? (
                        profiles.map((profile) => (
                            <ProfileCard
                                key={profile.id}
                                profile={profile}
                                categorySlug={categorySlug}
                                subCategorySlug={subCategorySlug}
                            />
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                            <p className="text-gray-500 text-lg">No professionals found for this service yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
