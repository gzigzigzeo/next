import { PluggableList } from "unified";
import rehypeFixTags from "./rehype-fix-tags";
import rehypeHighlight from "rehype-highlight";
import remarkFrontmatter from "remark-frontmatter";
import remarkGFM from "remark-gfm";
import remarkLayout from "./remark-layout";
import remarkImportFiles from "./remark-import-files";

interface MdxConfig {
  rehypePlugins: PluggableList;
  remarkPlugins: PluggableList;
}

const config: MdxConfig = {
  remarkPlugins: [
    remarkFrontmatter,
    [
      remarkLayout,
      {
        layouts: {
          default: "components/SitePage",
          content: "layouts/ContentPage",
        },
      },
    ],
    remarkGFM,
    remarkImportFiles,
  ],
  rehypePlugins: [rehypeFixTags, [rehypeHighlight, { plainText: ["text"] }]],
};

export default config;