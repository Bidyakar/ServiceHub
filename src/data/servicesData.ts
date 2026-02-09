import data from "./services.json";

export interface Review {
    id: string;
    user: string;
    rating: number;
    comment: string;
    date: string;
}

export interface Profile {
    id: string;
    name: string;
    rating: number;
    jobs: number;
    hourlyRate: number;
    offerRate?: number;
    images: string[];
    description: string[];
    reviews: Review[];
}

export interface SubCategory {
    name: string;
    slug: string;
    icon: string;
    image: string;
    description: string;
    profiles: Profile[];
}

export interface Category {
    name: string;
    slug: string;
    icon: string;
    description: string;
    gradient: string;
    bgColor: string;
    subcategories: SubCategory[];
}

export const servicesData = data as Category[];
