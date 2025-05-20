"use client";
import { getProducts } from "@/lib/api";
import { Product } from "@/schemas";
import { Loader2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { ProductCard } from "./product-card";

const PAGE_SIZE = 20;

export default function ProductGrid({
  query,
  supermarket,
  minPrice,
  maxPrice,
  sort,
}: {
  query: string;
  supermarket?: string;
  maxPrice?: number;
  minPrice?: number;
  sort: string;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const newProducts = await getProducts({
        query,
        supermarket,
        minPrice,
        maxPrice,
        sort,
        page,
        limit: PAGE_SIZE,
      });

      setProducts((prev) =>
        page === 1 ? newProducts : [...prev, ...newProducts]
      );
      setHasMore(newProducts.length === PAGE_SIZE);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [query, supermarket, minPrice, maxPrice, sort, page]);

  useEffect(() => {
    setPage(1);
  }, [query, supermarket, minPrice, maxPrice, sort]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (products.length === 0 && !loading) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-2">No products found</h2>
        <p className="text-muted-foreground">
          Try adjusting your search or filters to find what you&apos;re looking
          for.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {products.length} {products.length === 1 ? "product" : "products"}{" "}
          found
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={loading}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Load more"}
          </button>
        </div>
      )}
    </div>
  );
}
