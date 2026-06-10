import Link from "next/link";
import PropertyCard from "./PropertyCard";
import { Property, PAGE_SIZE } from "../lib/supabase";

interface NewInMarketProps {
  properties: Property[];
  currentPage: number;
  totalCount: number;
}

export default function NewInMarket({
  properties,
  currentPage,
  totalCount,
}: NewInMarketProps) {
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <section>
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl font-light text-nordic-dark">New in Market</h2>
          <p className="text-nordic-muted mt-1 text-sm">
            Fresh opportunities added this week.
          </p>
        </div>
        <div className="hidden md:flex bg-white p-1 rounded-lg">
          <button className="px-4 py-1.5 rounded-md text-sm font-medium bg-nordic-dark text-white shadow-sm">
            All
          </button>
          <button className="px-4 py-1.5 rounded-md text-sm font-medium text-nordic-muted hover:text-nordic-dark">
            Buy
          </button>
          <button className="px-4 py-1.5 rounded-md text-sm font-medium text-nordic-muted hover:text-nordic-dark">
            Rent
          </button>
        </div>
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-12 flex flex-col items-center gap-4">
          {/* Page indicator */}
          <p className="text-nordic-muted text-sm">
            Página{" "}
            <span className="font-semibold text-nordic-dark">{currentPage}</span>{" "}
            de{" "}
            <span className="font-semibold text-nordic-dark">{totalPages}</span>
            <span className="ml-2 text-nordic-muted/60">
              ({totalCount} propiedades)
            </span>
          </p>

          {/* Navigation buttons */}
          <div className="flex items-center gap-3">
            {hasPrev ? (
              <Link
                href={`/?page=${currentPage - 1}`}
                className="flex items-center gap-2 px-6 py-2.5 bg-white border border-nordic-dark/10 hover:border-mosque hover:text-mosque text-nordic-dark font-medium rounded-lg transition-all hover:shadow-md text-sm"
              >
                <span className="material-icons text-base">arrow_back</span>
                Anterior
              </Link>
            ) : (
              <span className="flex items-center gap-2 px-6 py-2.5 bg-white border border-nordic-dark/5 text-nordic-dark/30 font-medium rounded-lg text-sm cursor-not-allowed">
                <span className="material-icons text-base">arrow_back</span>
                Anterior
              </span>
            )}

            {/* Page numbers */}
            <div className="hidden sm:flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={`/?page=${p}`}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                    p === currentPage
                      ? "bg-nordic-dark text-white shadow-sm"
                      : "bg-white border border-nordic-dark/10 text-nordic-muted hover:border-mosque hover:text-mosque"
                  }`}
                >
                  {p}
                </Link>
              ))}
            </div>

            {hasNext ? (
              <Link
                href={`/?page=${currentPage + 1}`}
                className="flex items-center gap-2 px-6 py-2.5 bg-white border border-nordic-dark/10 hover:border-mosque hover:text-mosque text-nordic-dark font-medium rounded-lg transition-all hover:shadow-md text-sm"
              >
                Siguiente
                <span className="material-icons text-base">arrow_forward</span>
              </Link>
            ) : (
              <span className="flex items-center gap-2 px-6 py-2.5 bg-white border border-nordic-dark/5 text-nordic-dark/30 font-medium rounded-lg text-sm cursor-not-allowed">
                Siguiente
                <span className="material-icons text-base">arrow_forward</span>
              </span>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
