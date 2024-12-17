import { CategoryDetail, HeadingItem, Post, PostMatter } from "@/config/types";
import dayjs from "dayjs";
import fs from "fs";
import { sync } from "glob";
import matter from "gray-matter";
import path from "path";
import readingTime from "reading-time";

const BASE_PATH = "src/posts";
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

// 모든 MDX 파일 조회
export const getPostPaths = (category?: string, locale?: string) => {
  // const folder = category && category !== "" ? category : "**";
  const postPaths: string[] = sync(`${POSTS_PATH}/**/**/${locale}/*.mdx`);
  
  // `category`가 없거나 빈 문자열이면 전체 경로 반환
  if (!category) {
    return postPaths;
  }

  // 특정 조건을 만족하는 파일만 필터링
  const filteredPaths = postPaths.filter((filePath) => {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent); // 메타데이터 추출
    
    console.log(data.tags, category);
  
    // 특정 태그(category)가 포함된 경우에만 true를 반환
    return data.tags && Array.isArray(data.tags) && data.tags.includes(category);
  });

  // console.log(filteredPaths)

  return filteredPaths;
};

// MDX 파일 파싱 : abstract / detail 구분
const parsePost = async (postPath: string, locale:string): Promise<Post> => {
  const postAbstract = parsePostAbstract(postPath, locale);
  const postDetail = await parsePostDetail(postPath);
  return {
    ...postAbstract,
    ...postDetail,
  };
};

// MDX의 개요 파싱
// url, cg path, cg name, slug
export const parsePostAbstract = (postPath: string, locale:string) => {
  const normalizedPath = postPath.split(path.sep).join("/");
  const filePath = normalizedPath
    .slice(normalizedPath.indexOf(BASE_PATH))
    .replace(`${BASE_PATH}/`, "")
    .replace(".mdx", "");

  const [categoryPath, slug] = filePath.split("/");
  const url = `/blog/${locale}/${categoryPath}/${slug}`;
  const categoryPublicName = getCategoryPublicName(categoryPath);
  return { url, categoryPath, categoryPublicName, slug };
};

// MDX detail
const parsePostDetail = async (postPath: string) => {
  const file = fs.readFileSync(postPath, "utf8");
  const { data, content } = matter(file);
  const grayMatter = data as PostMatter;
  const readingMinutes = Math.ceil(readingTime(content).minutes);
  const dateString = dayjs(grayMatter.date).locale("ko").format("YYYY.MM.DD");
  return { ...grayMatter, dateString, content, readingMinutes };
};

// category folder name을 public name으로 변경 : dir_name -> Dir Name
export const getCategoryPublicName = (dirPath: string) =>
  dirPath
    .split("_")
    .map((token) => token[0].toUpperCase() + token.slice(1, token.length))
    .join(" ");

// post를 날짜 최신순으로 정렬
const sortPostList = (PostList: Post[]) => {
  return PostList.sort((a, b) => (a.date > b.date ? -1 : 1));
};

// 모든 포스트 목록 조회. 블로그 메인 페이지에서 사용
export const getPostList = async (category?: string, locale?: string): Promise<Post[]> => {
  const postPaths = getPostPaths(category, locale);
  const postList = await Promise.all(postPaths.map((postPath) => parsePost(postPath, locale)));
  return postList;
};

export const getSortedPostList = async (category?: string, locale?: string) => {
  const postList = await getPostList(category, locale);
  return sortPostList(postList);
};

export const getSitemapPostList = async () => {
  const postList = await getPostList();
  const baseUrl = "https://www.nawhgnues.dev";
  const sitemapPostList = postList.map(({ url }) => ({
    lastModified: new Date(),
    url: `${baseUrl}${url}`,
  }));
  return sitemapPostList;
};

export const getAllPostCount = async (postList) => postList.length;

// export const getCategoryList = () => {
//   const cgPaths: string[] = sync(`${POSTS_PATH}/${locale}/*`);
//   const cgList = cgPaths.map((p) => p.split(path.sep).slice(-1)?.[0]);
//   return cgList;
// };

export const getCategoryDetailList = async (post: Post[]) => {
  const postList = post;
  const result: { [key: string]: number } = {};
  for (const post of postList) {
    const category = post.tags;
    category.map((c) => {
      if (result[c]) {
        result[c] += 1;
      } else {
        result[c] = 1;
      }
    });
  }
  const detailList: CategoryDetail[] = Object.entries(result).map(([category, count]) => ({
    dirName: category,
    publicName: getCategoryPublicName(category),
    count,
  }));

  return detailList;
};

// post 상세 페이지 내용 조회
export const getPostDetail = async (category: string, slug: string, locale: string) => {
  const filePath = `${POSTS_PATH}/${category}/${slug}/${locale}/content.mdx`;
  const detail = await parsePost(filePath, locale);
  return detail;
};

export const parseToc = (content: string): HeadingItem[] => {
  const regex = /^(##|###) (.*$)/gim;
  const headingList = content.match(regex);
  return (
    headingList?.map((heading: string) => ({
      text: heading.replace("##", "").replace("#", ""),
      link:
        "#" +
        heading
          .replace("# ", "")
          .replace("#", "")
          .replace(/[\[\]:!@#$/%^&*()+=,.]/g, "")
          .replace(/ /g, "-")
          .toLowerCase()
          .replace("?", ""),
      indent: (heading.match(/#/g)?.length || 2) - 2,
    })) || []
  );
};
