"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { Category } from "@/data/servicesData";

const DATA_FILE_PATH = path.join(process.cwd(), "src/data/services.json");

export async function addProfessional(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const profileId = formData.get("profileId") as string;
        const categorySlug = formData.get("category") as string;
        const subCategorySlug = formData.get("subcategory") as string;
        const hourlyRate = Number(formData.get("hourlyRate"));
        const offerRate = formData.get("offerRate") ? Number(formData.get("offerRate")) : undefined;
        const imagesStr = formData.get("images") as string;
        const descriptionStr = formData.get("description") as string;

        // Basic Validation
        if (!name || !profileId || !categorySlug || !subCategorySlug || !hourlyRate) {
            return { success: false, message: "Missing required fields" };
        }

        // Process lists
        const images = imagesStr.split(",").map((s) => s.trim()).filter(Boolean);
        // If no images provided, add a placeholder
        if (images.length === 0) {
            images.push("https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop");
        }

        const description = descriptionStr.split("\n").map((s) => s.trim()).filter(Boolean);

        // Read current data
        const fileContent = await fs.readFile(DATA_FILE_PATH, "utf-8");
        const data: Category[] = JSON.parse(fileContent);

        // Find location
        const categoryIndex = data.findIndex((c) => c.slug === categorySlug);
        if (categoryIndex === -1) return { success: false, message: "Category not found" };

        const subCategoryIndex = data[categoryIndex].subcategories.findIndex((s) => s.slug === subCategorySlug);
        if (subCategoryIndex === -1) return { success: false, message: "Subcategory not found" };

        // Check for duplicate ID
        const existingProfile = data[categoryIndex].subcategories[subCategoryIndex].profiles.find((p) => p.id === profileId);
        if (existingProfile) {
            return { success: false, message: "Profile ID already exists in this subcategory" };
        }

        // Create New Profile
        const newProfile = {
            id: profileId,
            name,
            rating: 5.0, // Start with 5 stars
            jobs: 0,
            hourlyRate,
            offerRate,
            images,
            description,
            reviews: [],
        };

        // Add to data
        data[categoryIndex].subcategories[subCategoryIndex].profiles.push(newProfile);

        // Write back
        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2));

        // Revalidate
        revalidatePath("/services");
        revalidatePath(`/services/${categorySlug}`);
        revalidatePath(`/services/${categorySlug}/${subCategorySlug}`);
        revalidatePath("/admin/dashboard");

        return { success: true, message: "Professional added successfully!" };
    } catch (error) {
        console.error("Error adding professional:", error);
        return { success: false, message: "Failed to add professional" };
    }
}
