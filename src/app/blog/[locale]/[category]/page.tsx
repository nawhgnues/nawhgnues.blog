import { Metadata } from "next";

import PostListPage from "@/components/post_list/PostListPage";
import { baseDomain, blogName, blogThumbnailURL } from "@/config/const";
import { getCategoryPublicName } from "@/lib/post";

// type Props = {
//   params: { category: string, locale: string};
// };

// 허용된 param 외 접근시 404
// export const dynamicParams = false;

// export function generateStaticParams() {
//   const categoryList = getCategoryList();
//   const paramList = categoryList.map((category) => ({ category }));
//   return paramList;
// }

export async function generateMetadata({ params: { category } }: any): Promise<Metadata> {
  const cg = getCategoryPublicName(category);
  const title = `${cg} | ${blogName}`;
  const url = `${baseDomain}/${category}`;

  return {
    title,
    openGraph: {
      title,
      url,
      images: [blogThumbnailURL],
    },
    twitter: {
      title,
      images: [blogThumbnailURL],
    },
  };
}

const CategoryPage = async ({ params }: any) => {
  return <PostListPage category={params.category} locale={params.locale}/>;
};

export default CategoryPage;
