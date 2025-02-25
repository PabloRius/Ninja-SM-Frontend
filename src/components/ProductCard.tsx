"use client";

import { useCurrency } from "@/context/CurrencyContext";
import { hashToColor, stringToHash } from "@/utils/hash";
import { Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Card } from "./ui/card";

interface Product {
  name: string;
  price: number;
  relativePrice: number;
  units: string;
  supermarket: string;
  link: string;
  image: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const [isFavourited, setIsFavourited] = useState(false);
  const { currency } = useCurrency();

  const toggleFavourite = () => {
    setIsFavourited((prev) => !prev);
  };

  const currencySymbols: { [key: string]: string } = {
    GBP: "£",
    USD: "$",
    EUR: "€",
  };
  const unitSymbols: { [key: string]: string } = {
    per_kilo: "/kg",
    per_litre: "/l",
    per_unit: "/each",
  };

  const currencySymbol = currencySymbols[currency] || "£";
  const unitSymbol = unitSymbols[product.units];

  const supermarketColor = hashToColor(stringToHash(product.supermarket));

  return (
    <Card className="p-4 shadow-lg rounded-xl bg-white hover:shadow-xl transition flex flex-col h-full">
      {/* Product Image */}
      <div className="flex items-center justify-center h-48 mb-4">
        <Image
          src={product.image}
          alt={product.name}
          width={200}
          height={200}
          className="w-full h-full object-contain rounded-md"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1 gap-2">
        <h3 className="text-lg font-semibold text-gray-900 flex-1">
          {product.name}
        </h3>
        <p className="text-gray-600 mt-2">
          {currencySymbol}
          {product.price}{" "}
          <span className="text-sm text-gray-400">
            ({currencySymbol}
            {product.relativePrice}
            {unitSymbol})
          </span>
        </p>
        <p
          className="w-min text-sm font-medium px-2 py-1 rounded-lg inline-block"
          style={{
            color: supermarketColor.color,
            backgroundColor: supermarketColor.backgroundColor,
          }}
        >
          {product.supermarket}
        </p>
      </div>

      {/* Call to Action */}
      <div className="mt-4 flex items-center gap-2">
        <a
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          View Product
        </a>
        {/* Star Icon (will be used for favorites in the future) */}
        <button
          onClick={toggleFavourite}
          className="p-2 text-gray-400 hover:text-yellow-400 transition"
          aria-label={
            isFavourited ? "Remove from favorites" : "Save as favorite"
          }
        >
          {isFavourited ? (
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          ) : (
            <Star className="w-5 h-5" />
          )}
        </button>
      </div>
    </Card>
  );
}
