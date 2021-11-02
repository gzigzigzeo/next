import { Transformer } from "unified";
import { createMdxjsEsmExportNode } from "./mdx-helpers";
import { loadDocsConfig, loadSiteConfig } from "./config";
import { getVersion, getGithubURL } from "./docs-helpers";

const { versions, latest } = loadSiteConfig();

export default function remarkImportVariables(): Transformer {
  return (root: MdxastRootNode, vfile) => {
    const current = getVersion(vfile.path);
    const { navigation } = loadDocsConfig(current);

    root.children.unshift(
      createMdxjsEsmExportNode(
        "navigation",
        navigation as unknown as Record<string, unknown>
      )
    );
    root.children.unshift(
      createMdxjsEsmExportNode("githubUrl", getGithubURL(vfile.path))
    );
    root.children.unshift(
      createMdxjsEsmExportNode("versions", {
        current,
        latest,
        available: versions,
      })
    );
  };
}
