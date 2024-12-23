import { Metadata } from "next";

import FloatingButton from "@/components/common/FloationgButton";
// import Giscus from "@/components/post_detail/Giscus";
import { PostBody } from "@/components/post_detail/PostBody";
import { PostHeader } from "@/components/post_detail/PostHeader";
import TocSidebar from "@/components/post_detail/TableOfContentSidebar";
import TocTop from "@/components/post_detail/TableOfContentTop";
import { baseDomain } from "@/config/const";
import { getPostDetail, getPostPaths, parsePostAbstract, parseToc } from "@/lib/post";

type Props = {
  params: { category: string; slug: string, locale: string };
};

// 허용된 param 외 접근시 404
// export const dynamicParams = false;

export async function generateMetadata({ params: { category, slug, locale } }: Props): Promise<Metadata> {
  const post = await getPostDetail(category, slug, locale);
  const title = `${post.title} | nawhgnues`;
  const imageURL = `${baseDomain}${post.thumbnail}`;

  return {
    title,
    description: post.desc,

    openGraph: {
      title,
      description: post.desc,
      type: "article",
      publishedTime: post.date.toISOString(),
      url: `${baseDomain}${post.url}`,
      images: [imageURL],
    },
    twitter: {
      title,
      description: post.desc,
      images: [imageURL],
    },
  };
}

export function generateStaticParams({ params: { locale }}: Props) {
  const postPaths: string[] = getPostPaths(locale);
  const paramList = postPaths
    .map((path) => parsePostAbstract(path, locale))
    .map((item) => ({ category: item.categoryPath, slug: item.slug }));
  return paramList;
}

const PostDetail = async ({ params: { category, slug, locale } }: Props) => {
  const post = await getPostDetail(category, slug, locale);
  const toc = parseToc(post.content);
  return (
    <div className="prose mx-auto w-full max-w-[750px] px-5 dark:prose-invert sm:px-6">
      <PostHeader post={post} />
      <TocTop toc={toc} />
      <article className="relative">
        <TocSidebar toc={toc} />
        <PostBody post={post} locale={locale}/>
      </article>
      <hr />
      {/* <Giscus /> */}
      <FloatingButton />
    </div>
  );
};

export default PostDetail;
