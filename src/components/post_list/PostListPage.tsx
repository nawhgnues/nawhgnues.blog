import CategoryList from "./CategoryList";
import PostCard from "./PostCard";
import { getAllPostCount, getCategoryDetailList, getSortedPostList } from "@/lib/post";

interface PostListProps {
  category?: string;
  locale: string;
}

const PostListPage = async ({ category, locale }: PostListProps) => {
  const postList = await getSortedPostList(category, locale);
  const categoryList = await getCategoryDetailList(postList);
  const allPostCount = await getAllPostCount(postList);
  return (
    <section className="mx-auto mt-12 w-full max-w-[950px] transition-all duration-500 px-0  md:px-8">
      <CategoryList allPostCount={allPostCount} categoryList={categoryList} currentCategory={category} locale={locale}/>
      <section>
        {postList.length === 0 ? (
          <p className="text-center text-gray-400 mt-32">게시물이 없습니다</p>
        ) : (
          <ul className="grid grid-cols-1 gap-8">
            {postList.map((post, index) => (
              <PostCard key={index} post={post} locale={locale}/>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
};

export default PostListPage;
