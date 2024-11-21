import Image from "next/image";
import Link from "next/link";

import { Post } from "@/config/types";
// import { CalendarDays, Clock3 } from "lucide-react";

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  return (
    <li className="flex h-full gap-3 overflow-hidden border-b-2 transition md:pb-8 dark:border-slate-700">
      <Link href={post.url}>
        <div className="relative aspect-video w-[328px] h-[220px] rounded-2xl border-b hidden overflow-hidden md:flex hover:opacity-75">
          <Image
            src={post.thumbnail}
            alt={`thumbnail for ${post.title}`}
            sizes="100%"
            fill
            priority
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col justify-between p-4 pt-1">
        <Link href={post.url} className="group">
          <div>
            <div className="flex items-center gap-3 transition text-xs text-gray-400 dark:text-gray-400 sm:text-sm">
              <span>{post.dateString}</span>
            </div>
            <h2 className="mb-1 mt-1 text-lg font-bold sm:text-xl md:text-lg group-hover:text-gray-300">
              {post.title}
            </h2>
            <p className="mb-16 text-md text-gray-600">{post.desc}</p>
          </div>
        </Link>

        <div className="flex gap-3">
          {post.tags?.map((tag) => (
            <Link key={tag} href={`/blog/${tag.toLowerCase()}`} className="w-min group">
              <div className="text-sm font-bold mr-1 text-tomato group-hover:text-blue-500">#{tag}</div>
            </Link>
          )) || <div className="text-sm text-gray-400">No tags available</div>}
        </div>
      </div>
    </li>
  );
};

export default PostCard;
