import { PluggableList } from "unified";
import rehypeFixTags from "./rehype-fix-tags";
import rehypeHeaders from "./rehype-headers";
import rehypeHighlight from "rehype-highlight";
import rehypeImages from "./rehype-images";
import rehypeSlug from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";
import remarkGFM from "remark-gfm";
import remarkImportVariables from "./remark-import-variables";
import remarkIncludes from "./remark-includes";
import remarkLayout from "./remark-layout";
import remarkLinks from "./remark-links";
import remarkVariables from "./remark-variables";
import remarkCodeSnippet from "./remark-code-snippet";
import remarkImportFiles from "./remark-import-files";
import { fetchVideoMeta } from "./youtube-meta";

const defaultExportTemplate = () => `
export default function Wrapper (props) {
  return (<Layout
    {...props}
    meta={meta}
    navigation={navigation}
    versions={versions}
    tableOfConents={tableOfConents}
    githubUrl={githubUrl}
  />);
};
`;
interface MdxConfig {
  rehypePlugins: PluggableList;
  remarkPlugins: PluggableList;
}

const config: MdxConfig = {
  remarkPlugins: [
    remarkFrontmatter,
    remarkImportVariables,
    [
      remarkLayout,
      {
        defaultLayout: "layouts/DocsPage",
        defaultExportTemplate,
        metaProcessor: async (config: Record<string, unknown>) => {
          const { videoBanner } = config;

          if (typeof videoBanner === "string") {
            config.videoBanner = await fetchVideoMeta(videoBanner);
          }

          return config;
        },
      },
    ],
    remarkCodeSnippet,
    remarkIncludes,
    remarkVariables,
    remarkGFM,
    remarkImportFiles,
    remarkLinks,
  ],
  rehypePlugins: [
    rehypeFixTags,
    rehypeSlug,
    rehypeImages,
    [
      rehypeHighlight,
      {
        aliases: { bash: ["bsh", "systemd", "code"], yaml: ["conf", "toml"] },
      },
    ],
    [rehypeHeaders, { maxLevel: 2 }],
  ],
};

export default config;
