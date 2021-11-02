/*
 * This plugin injects page wrapper component based on the value on `layout` field in frontmatter.
 * All fronmatter fields except `layout` and privded to the wrapper component as `meta` prop.
 */

import { Transformer } from "unified";
import yaml from "js-yaml";
import stringifyObject from "stringify-object";
import find from "unist-util-find";
import { createMdxjsEsmNode } from "./mdx-helpers";
import { Node } from "unist";

type Meta = Record<string, unknown>;
type ImportTemplate = (layoutPath: string) => string;
type ExportTemplate = (metaKey: string) => string;

interface LayoutOptions {
  path: string;
  importTemplate?: ImportTemplate;
  exportTemplate?: ExportTemplate;
}

interface RemarkLayoutOptions {
  layouts?: Record<string, string | LayoutOptions>;
  defaultLayout?: string | LayoutOptions;
  defaultImportTemplate?: ImportTemplate;
  defaultExportTemplate?: ExportTemplate;
  skipMeta?: boolean;
  skipLayout?: boolean;
  metaKey?: string;
  metaProcessor?: (meta: Meta) => Promise<Meta>;
}

const importTemplatePlaceholder: ImportTemplate = (layoutPath: string) =>
  `import Layout from "${layoutPath}";`;

const exportTemplateWithoutMetaPlacehoder: ExportTemplate = () => `
export default function Wrapper (props) {
  return <Layout {...props} />;
};
`;

const exportTemplateWithMetaPlacehoder: ExportTemplate = (metaKey: string) => `
export default function Wrapper (props) {
  return <Layout {...props} ${metaKey}={meta} />;
};
`;

export default function remarkLayout({
  layouts = {},
  defaultLayout,
  defaultImportTemplate = importTemplatePlaceholder,
  defaultExportTemplate,
  skipMeta = false,
  skipLayout = false,
  metaKey = "meta",
  metaProcessor = (meta) => Promise.resolve(meta),
}: RemarkLayoutOptions): Transformer {
  return async (root: MdxastRootNode) => {
    const node = find(root, (node: Node) => node.type === "yaml");

    if (!node) {
      return;
    }

    const meta = yaml.load(node.value as string) as Meta;

    const layout =
      (meta.layout && layouts[meta.layout as string]) || defaultLayout;

    if (!skipMeta) {
      root.children.push(
        createMdxjsEsmNode(
          `export const ${metaKey} = ${stringifyObject(
            await metaProcessor(meta)
          )};`
        )
      );
    }

    if (!skipLayout) {
      if (!layout) {
        console.error(
          'Neither named layout, nor "defaultLayout" found in config.'
        );

        return;
      }

      let path: string;
      let importTemplate: ImportTemplate = defaultImportTemplate;
      let exportTemplate: ExportTemplate =
        defaultExportTemplate ||
        (skipMeta
          ? exportTemplateWithoutMetaPlacehoder
          : exportTemplateWithMetaPlacehoder);

      if (typeof layout === "string") {
        path = layout;
      } else {
        path = layout.path;
        importTemplate = layout.importTemplate || importTemplate;
        exportTemplate = layout.exportTemplate || exportTemplate;
      }

      root.children.unshift(createMdxjsEsmNode(importTemplate(path)));
      root.children.push(createMdxjsEsmNode(exportTemplate(metaKey)));
    }
  };
}
