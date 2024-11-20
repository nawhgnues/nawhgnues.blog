import { Callout } from "./Callout";
import { Image } from "./Image";
import { ExternalLink } from "./Link";
import { MDXComponents } from "mdx/types";

export const MdxComponents: MDXComponents = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  a: ExternalLink as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  img: Image as any,
  blockquote: Callout,
  Callout,
};
