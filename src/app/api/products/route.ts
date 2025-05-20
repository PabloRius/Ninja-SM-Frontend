import prisma from "@/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { product } from "../../../../prisma/product";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("query") || undefined;
  const supermarket = searchParams.get("supermarket") || undefined;
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const sort = searchParams.get("sort") || "relevance";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "20", 10);

  const filters: Record<string, Record<string, string | number> | string> = {};

  if (query) {
    filters.name = { contains: query, mode: "insensitive" };
  }

  if (supermarket) {
    filters.supermarket = supermarket;
  }

  if (minPrice) {
    filters.price = { gte: parseFloat(minPrice) };
  }

  if (maxPrice) {
    const prevPriceFilter:
      | Record<string, string | number>
      | string
      | undefined = filters.price || undefined;
    if (prevPriceFilter && typeof prevPriceFilter !== "string") {
      filters.price = { ...prevPriceFilter, lte: parseFloat(maxPrice) };
    } else {
      filters.price = { lte: parseFloat(maxPrice) };
    }
  }

  let orderBy: Prisma.ProductOrderByWithRelationInput | undefined = undefined;

  switch (sort) {
    case "price-asc":
      orderBy = { price: "asc" };
      break;
    case "price-desc":
      orderBy = { price: "desc" };
      break;
    case "name-asc":
      orderBy = { name: "asc" };
      break;
    case "name-desc":
      orderBy = { name: "desc" };
      break;
    default:
      orderBy = undefined;
      break;
  }

  const skip = (page - 1) * limit;

  try {
    const products = await prisma.product.findMany({
      where: filters,
      orderBy,
      skip,
      take: limit,
      ...product,
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return new NextResponse("Failed to fetch products", { status: 500 });
  }
}
