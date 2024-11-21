import { Post } from "@/config/types";
import { CalendarDays } from "lucide-react";
import Image from "next/image";

interface Props {
  post: Post;
}

export const PostHeader = ({ post }: Props) => {
  return (
    <header className="mt-14 text-center">
      <h1 className="mb-5 text-3xl text-left">{post.title}</h1>
      <div className="flex items-center gap-1">
        <CalendarDays className="w-3.5" />
        <span className="text-sm">{post.dateString}</span>
      </div>
      <Image
        src={post.thumbnail}
        alt={`thumbnail for ${post.title}`}
        priority
        width={1200}
        height={600}
        style={{ borderRadius: "20px" }}
      />
    </header>
  );
};
