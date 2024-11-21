import CategoryList from "./CategoryList";
import PostCard from "./PostCard";
import { getAllPostCount, getCategoryDetailList, getSortedPostList } from "@/lib/post";

interface PostListProps {
  category?: string;
}

const PostListPage = async ({ category }: PostListProps) => {
  const postList = await getSortedPostList(category);
  const categoryList = await getCategoryDetailList(postList);
  const allPostCount = await getAllPostCount();

  return (
    <section className="mx-auto mt-12 w-full max-w-[950px] transition-all duration-500 px-0  md:px-8">
      <CategoryList allPostCount={allPostCount} categoryList={categoryList} currentCategory={category} />
      <section>
        {postList.length === 0 ? (
          <p>게시물이 없습니다</p>
        ) : (
          <ul className="grid grid-cols-1 gap-8">
            {postList.map((post, index) => (
              <PostCard key={index} post={post} />
            ))}
          </ul>
        )}
      </section>
    </section>
  );
};

export default PostListPage;
