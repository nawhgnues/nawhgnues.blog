"use client";

import { useEffect, useState } from "react";

import { usePathname, useRouter } from "next/navigation";

import * as S from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { GlobeIcon } from "lucide-react";

export default function LanguageSelector({
  className,
  setLang,
}: {
  className?: string;
  setLang: (lang: string) => void;
}) {
  console.log(setLang)
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const LANGUAGES = ["ko", "en", "ja"];
  const currentLang = LANGUAGES.find((lang) => new RegExp(`/${lang}(/|$)`).test(pathname)) || "ko";


  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const onSelectChange = (value: string) => {
    setLang(value); 
    localStorage.setItem("locale", value);
    router.push(pathname.replace(/\/(en|ko|ja)(\/|$)/, `/${value}/`));
  };

  return (
    <S.Select onValueChange={onSelectChange} defaultValue={currentLang}>
      <S.SelectTrigger className={cn("w-fit gap-2", className)}>
        <GlobeIcon className="size-3.5" />
        <S.SelectValue />
      </S.SelectTrigger>
      <S.SelectContent align="center">
        <S.SelectItem className="flex justify-between" disabled={currentLang === "ko"} value="ko">
          한국어
        </S.SelectItem>
        <S.SelectItem className="flex justify-between" disabled={currentLang === "en"} value="en">
          English
        </S.SelectItem>
        <S.SelectItem className="flex justify-between" disabled={currentLang === "ja"} value="ja">
          日本語
        </S.SelectItem>
      </S.SelectContent>
    </S.Select>
  );
}
