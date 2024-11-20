import Image from "next/image";
import Link from "next/link";

import { Post } from "@/config/types";
// import { CalendarDays, Clock3 } from "lucide-react";

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  return (
    <Link href={post.url}>
      <li className="flex h-full gap-3 overflow-hidden border-b-2 transition md:pb-8 dark:border-slate-700 dark:hover:border-white">
        <div className="relative aspect-video w-[328px] h-[220px] rounded-t-md border-b hidden md:flex">
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
        <div className="flex flex-1 flex-col justify-between p-4 pt-1">
          <div>
            <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-400 sm:text-sm">
              <span>{post.dateString}</span>
            </div>
            <h2 className="mb-1 mt-1 text-lg font-bold sm:text-xl md:text-lg">{post.title}</h2>
            <p className="mb-16 text-md text-gray-600">{post.desc}</p>
          </div>
          <div className="flex justify-between gap-3">
            <div className="text-xs font-medium text-tomato">#{post.categoryPublicName}</div>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default PostCard;
