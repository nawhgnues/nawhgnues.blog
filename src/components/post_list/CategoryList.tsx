"use client";

import { useRouter } from "next/navigation";

import { CategoryButton } from "./CategoryButton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CategoryDetail } from "@/config/types";

interface CategoryListProps {
  categoryList: CategoryDetail[];
  allPostCount: number;
  currentCategory?: string;
}

const CategoryList = ({ categoryList, allPostCount, currentCategory = "all" }: CategoryListProps) => {
  const router = useRouter();

  const onCategoryChange = (value: string) => {
    if (value === "all") {
      router.push("/blog");
    } else {
      router.push(`/blog/${value}`);
    }
  };

  return (
    <>
      <section className="mb-10 hidden px-4 sm:block">
        <h1 className="text-4xl font-bold text-tomato mb-4">#Blog</h1>
        <ul className="flex flex-wrap gap-3">
          <CategoryButton href="/blog" isCurrent={currentCategory === "all"} displayName="All" count={allPostCount} />
          {categoryList.map((cg) => (
            <CategoryButton
              key={cg.dirName}
              href={`/blog/${cg.dirName}`}
              displayName={cg.publicName}
              isCurrent={cg.dirName === currentCategory}
              count={cg.count}
            />
          ))}
        </ul>
      </section>
      <section className="mb-10 px-4 sm:hidden">
        <h1 className="text-4xl font-bold text-tomato mb-4">#Blog</h1>
        <Select onValueChange={onCategoryChange} defaultValue={currentCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All ({allPostCount})</SelectItem>
            {categoryList.map((cg) => (
              <SelectItem key={cg.dirName} value={cg.dirName}>
                {cg.publicName} ({cg.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>
    </>
  );
};

export default CategoryList;
