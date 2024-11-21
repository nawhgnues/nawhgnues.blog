import Link from "next/link";

import { Post } from "@/config/types";
import { CalendarDays, Clock3 } from "lucide-react";

interface Props {
  post: Post;
}

export const PostHeader = ({ post }: Props) => {
  return (
    <header className="mt-14 text-center">
      <h1 className="mb-5 text-3xl">{post.title}</h1>
      <div className="mb-3 text-base">
        {post.tags.map((tag) => {
          return (
            <Link
              key={tag}
              href={`/blog/${tag}`}
              className="font-semibold mr-2 text-tomato no-underline underline-offset-4 hover:underline"
            >
              #{tag}
            </Link>
          );
        })}
      </div>
      <div className="flex justify-center gap-3 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <CalendarDays className="w-3.5" />
          <span>{post.dateString}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock3 className="w-3.5" />
          <span>{post.readingMinutes}분</span>
        </div>
      </div>
      <hr className="mt-5" />
    </header>
  );
};
