import glob from "glob";
import { resolve, join } from "path";
import type { VFile } from "vfile";
import { readSync } from "to-vfile";
import matter from "gray-matter";

export const extensions = ["md", "mdx", "ts", "tsx", "js", "jsx"];

export const pagesRoot = resolve("pages");

export const getURIFromPath = (path: string): string => {
  return path
    .replace(pagesRoot, "")
    .replace(new RegExp(`(/index)?.(${extensions.join("|")})$`), "/");
};

/* next build happens in the single process so we can cache file data */

const cache: Record<string, VFile> = {};

export interface PageData {
  uri: string;
  frontmatter: Record<string, unknown>;
}

export const getPageInfo = (path: string): VFile => {
  let result: VFile = cache[path];

  if (!result) {
    const file: VFile = readSync(path, "utf-8");

    const { data } = matter(file.contents as string);

    file.data = {
      frontmatter: data,
      uri: getURIFromPath(path),
    } as PageData;

    result = cache[path] = file;
  }

  return result;
};

export const getPagesInfo = (pagesGlob: string): VFile[] =>
  glob.sync(join(pagesRoot, pagesGlob)).map((path) => getPageInfo(path));
