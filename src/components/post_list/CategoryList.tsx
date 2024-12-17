"use client";

import { CategoryDetail } from "@/config/types";
import Link from "next/link";

interface CategoryListProps {
  categoryList: CategoryDetail[];
  allPostCount: number;
  currentCategory?: string;
  locale?: string,
}

const CategoryList = ({ currentCategory = "All", locale}: CategoryListProps) => {
  return (
    <>
      <section className="mb-10  px-4 sm:block">
        <Link href={`/blog/${locale}`} className="block w-min">
          <h1 className="w-min text-4xl font-bold text-tomato mb-4 hover:text-blue-500 transition-all">#Tech</h1>
        </Link>
        <ul className="flex flex-wrap gap-3">
        <h1 className="text-4xl font-bold mb-4">#{currentCategory}</h1> 
        </ul>
      </section>
    </>
  );
};

export default CategoryList;
