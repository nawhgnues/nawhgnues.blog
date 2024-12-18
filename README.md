### 블로그 레포지토리

next.js, shadcn/ui, mdx, vercel 이용한 블로그 


### 📂 폴더 구조

```
app
   about --- 자기소개
   blog  --- 블로그 
   components --- 컴포넌트
      about
      common
      icon
      mdx
      post_detail
      post_list
      ul
   config 
      const.ts
      globals.css
      types.ts
   data --- 자기소개 데이터
   layouts
   hook
   lib
   posts --- 블로그 포스트 데이터터
   projects --- 프로젝트 관련 데이터터
```


### 🛠️ 기술 스택

- Next.js

- Tailwind CSS + Shadcn/ui

- MDX

- Vercel


### ⚠️ 이슈

- toc 동작이 안됨 : 기존 라이브러리의 호환성 문제로 인해 라이브러리 사용하지 않고 수정 할 계획

- 빌드 시 일어나는 타입에러 해결 : 현재는 임시로 빌드 시 타입에러 무시하도록 설정


