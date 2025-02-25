"use client";

import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { Product } from "@/models/Product";
import { useEffect, useState } from "react";

const debounce = <T extends (...args: never[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [supermarket, setSupermarket] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:9090/dev/product?name=${search}&supermarket=${supermarket}&minPrice=1&maxPrice=9999&page=${page}&limit=20`
      );
      const data = await response.json();
      setProducts(data.data);
      setHasMore(data.page < data.totalPages);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchProducts = debounce(fetchProducts, 700);

  useEffect(() => {
    debouncedFetchProducts();
  }, [search, supermarket, page]);

  useEffect(() => {
    setPage(1);
  }, [search, supermarket]);

  return (
    <main className="flex-1 container mx-auto px-4 pt-24 pb-10">
      {/* Search and Filter Inputs */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded-md w-full sm:w-64"
        />
        <select
          value={supermarket}
          onChange={(e) => setSupermarket(e.target.value)}
          className="p-2 border rounded-md ml-2 mt-2 sm:mt-0"
        >
          <option value="">All Supermarkets</option>
          <option value="Tesco">Tesco</option>
          <option value="Sainsbury's">{"Sainsbury's"}</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? [...Array(8)].map((_, index) => <ProductCardSkeleton key={index} />)
          : products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1 || loading}
          className="p-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
        >
          Previous
        </button>
        <span className="mx-4 my-auto">{page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={!hasMore || loading}
          className="p-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </main>
  );
}
