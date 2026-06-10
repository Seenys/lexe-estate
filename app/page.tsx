import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedCollections from "../components/FeaturedCollections";
import NewInMarket from "../components/NewInMarket";
import { getFeaturedProperties, getPaginatedProperties } from "../lib/supabase";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt((pageParam as string) ?? "1", 10) || 1);

  const [featuredProperties, paginatedResult] = await Promise.all([
    getFeaturedProperties(),
    getPaginatedProperties(page),
  ]);

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Hero />
        <FeaturedCollections properties={featuredProperties} />
        <NewInMarket
          properties={paginatedResult.data}
          currentPage={paginatedResult.page}
          totalCount={paginatedResult.totalCount}
        />
      </main>
    </>
  );
}
