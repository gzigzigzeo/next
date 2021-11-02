import { PluggableList } from "unified";
import rehypeFixTags from "./rehype-fix-tags";
import rehypeHighlight from "rehype-highlight";
import remarkFrontmatter from "remark-frontmatter";
import remarkImportFiles from "./remark-import-files";
import remarkLayout from "./remark-layout";

interface MdxConfig {
  rehypePlugins: PluggableList;
  remarkPlugins: PluggableList;
}

// This config will be used for mdx files inside components

const config: MdxConfig = {
  remarkPlugins: [
    remarkFrontmatter,
    [
      remarkLayout,
      {
        skipLayout: true,
      },
    ],
  ],
  rehypePlugins: [rehypeFixTags, rehypeHighlight],
};

export default config;
