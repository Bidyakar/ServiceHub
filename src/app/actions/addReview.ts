"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { Category, Profile } from "@/data/servicesData";

const DATA_FILE_PATH = path.join(process.cwd(), "src/data/services.json");

export async function addReview(formData: FormData) {
    try {
        const profileId = formData.get("profileId") as string;
        const categorySlug = formData.get("categorySlug") as string;
        const subCategorySlug = formData.get("subCategorySlug") as string;
        const user = formData.get("user") as string;
        const rating = Number(formData.get("rating"));
        const comment = formData.get("comment") as string;

        if (!profileId || !user || !rating || !comment) {
            return { success: false, message: "All fields are required" };
        }

        // Read Data
        const fileContent = await fs.readFile(DATA_FILE_PATH, "utf-8");
        const data: Category[] = JSON.parse(fileContent);

        // Find Profile
        const category = data.find((c) => c.slug === categorySlug);
        if (!category) return { success: false, message: "Category not found" };

        const subCategory = category.subcategories.find((s) => s.slug === subCategorySlug);
        if (!subCategory) return { success: false, message: "Subcategory not found" };

        const profile = subCategory.profiles.find((p) => p.id === profileId);
        if (!profile) return { success: false, message: "Profile not found" };

        // Create Review
        const newReview = {
            id: Math.random().toString(36).substr(2, 9),
            user,
            rating,
            comment,
            date: new Date().toISOString().split("T")[0],
        };

        // Add Review
        if (!profile.reviews) profile.reviews = [];
        profile.reviews.unshift(newReview);

        // Update Average Rating
        const totalRating = profile.reviews.reduce((acc, r) => acc + r.rating, 0);
        profile.rating = Number((totalRating / profile.reviews.length).toFixed(1));

        // Update Jobs Count (Simulation: 1 review = 1 job)
        profile.jobs += 1;

        // Save Data
        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2));

        // Revalidate
        revalidatePath(`/services/${categorySlug}/${subCategorySlug}/${profileId}`);
        revalidatePath("/"); // For featured reviews

        return { success: true, message: "Review added successfully!" };
    } catch (error) {
        console.error("Error adding review:", error);
        return { success: false, message: "Failed to add review" };
    }
}
