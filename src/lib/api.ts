"use client";
import { Product } from "@/schemas";

export async function getProducts({
  query,
  supermarket,
  minPrice,
  maxPrice,
  sort,
  page = 1,
  limit = 20,
}: {
  query?: string;
  supermarket?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  page?: number;
  limit?: number;
}): Promise<Product[]> {
  try {
    const params = new URLSearchParams();

    if (query?.trim()) params.set("query", query.trim());
    if (supermarket) params.set("supermarket", supermarket);
    if (minPrice !== undefined) params.set("minPrice", String(minPrice));
    if (maxPrice !== undefined) params.set("maxPrice", String(maxPrice));
    if (sort) params.set("sort", sort);
    params.set("page", String(page));
    params.set("limit", String(limit));

    const response = await fetch(`/api/products?${params.toString()}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
