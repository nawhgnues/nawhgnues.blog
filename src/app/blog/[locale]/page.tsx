import PostListPage from "@/components/post_list/PostListPage";
import { DATAS, Locale } from "@/config/types";
import { Metadata } from "next";
import React from "react";

type Props = {
  params: { locale: Locale };
};
  
  export function generateStaticParams() {
    return Object.keys(DATAS).map((locale) => ({ locale }));
  }
  
  export function generateMetadata({ params: { locale } }: Props): Metadata {
    const data = DATAS[locale].data;
    return {
      title: `${data.name} | Tech`,
      description: "Tech",
    };
  }


export default function page({ params: { locale }}:any) {
  return (
    <div>
      <PostListPage locale={locale}/>
    </div>
  );
}
