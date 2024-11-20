import { RESUME_DATA_JA } from "@/data/resume-data.ja";
import { RESUME_DATA_EN } from "@/data/resume-data.en";
import { RESUME_DATA_KO } from "@/data/resume-data.ko";

export interface PostMatter {
  title: string;
  date: Date;
  dateString: string;
  thumbnail: string;
  desc: string;
}

export interface Post extends PostMatter {
  url: string;
  slug: string;
  categoryPath: string;
  content: string;
  readingMinutes: number;
  categoryPublicName: string;
}

export interface CategoryDetail {
  dirName: string;
  publicName: string;
  count: number;
}

export interface HeadingItem {
  text: string;
  link: string;
  indent: number;
}

export interface CategoryDetail {
  dirName: string;
  publicName: string;
  count: number;
}

export const DATAS = {
  en: {
    data: RESUME_DATA_EN,
    aboutClassName: "",
  },
  ko: {
    data: RESUME_DATA_KO,
    aboutClassName: "sm:whitespace-pre-wrap whitespace-normal",
  },

  ja: {
    data: RESUME_DATA_JA,
    aboutClassName: "",
  },
};

export type Locale = keyof typeof DATAS;
