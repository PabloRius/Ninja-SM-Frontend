"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CurrencySelector from "./CurrencySelector";

export default function Header() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const scrollHandler = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 w-full px-8 py-4 bg-white shadow-md z-10 flex flex-row items-center justify-between"
      animate={{ opacity: scrollY > 50 ? 0 : 1 }}
    >
      <h1 className="text-xl font-bold text-center">SM Ninja</h1>
      <CurrencySelector />
    </motion.header>
  );
}
