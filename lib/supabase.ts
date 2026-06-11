import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  price_label: string | null;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image_url: string;
  image_alt: string;
  status: "FOR SALE" | "FOR RENT" | "Exclusive" | "New Arrival";
  featured: boolean;
  created_at: string;
}

export interface PaginatedProperties {
  data: Property[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const PAGE_SIZE = 8;

export async function getFeaturedProperties(): Promise<Property[]> {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("featured", true)
    .order("created_at", { ascending: true })
    .limit(2);

  if (error) {
    console.error("Error fetching featured properties:", error);
    return [];
  }

  return data ?? [];
}

export async function getPaginatedProperties(
  page: number = 1
): Promise<PaginatedProperties> {
  const offset = (page - 1) * PAGE_SIZE;

  const { data, error, count } = await supabase
    .from("properties")
    .select("*", { count: "exact" })
    .eq("featured", false)
    .order("created_at", { ascending: true })
    .range(offset, offset + PAGE_SIZE - 1);

  if (error) {
    console.error("Error fetching paginated properties:", error);
    return {
      data: [],
      totalCount: 0,
      page,
      pageSize: PAGE_SIZE,
      totalPages: 0,
    };
  }

  const totalCount = count ?? 0;

  return {
    data: data ?? [],
    totalCount,
    page,
    pageSize: PAGE_SIZE,
    totalPages: Math.ceil(totalCount / PAGE_SIZE),
  };
}
