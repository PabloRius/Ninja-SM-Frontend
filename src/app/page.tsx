import ProductGrid from "@/components/product-grid";
import ProductGridSkeleton from "@/components/product-grid-skeleton";
import SearchBar from "@/components/search-bar";
import { Suspense } from "react";

export default async function Home({
  params,
}: {
  params: Promise<{
    query?: string;
    supermarket?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
  }>;
}) {
  const searchParams = await params;
  const query = searchParams.query || "";
  const supermarket = searchParams.supermarket || "";
  const minPrice = searchParams.minPrice || "";
  const maxPrice = searchParams.maxPrice || "";
  const sort = searchParams.sort || "relevance";

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <section className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Compare Prices Across UK Supermarkets
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Find the best deals on groceries and household items from Tesco,
          Sainsbury&apos;s, Asda, Morrisons, and more.
        </p>

        <SearchBar
          initialQuery={query}
          initialSupermarket={supermarket}
          initialMinPrice={minPrice}
          initialMaxPrice={maxPrice}
          initialSort={sort}
        />
      </section>

      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductGrid
          query={query}
          supermarket={supermarket}
          minPrice={minPrice ? Number.parseFloat(minPrice) : undefined}
          maxPrice={maxPrice ? Number.parseFloat(maxPrice) : undefined}
          sort={sort}
        />
      </Suspense>
    </div>
  );
}
