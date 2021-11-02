import { Transformer } from "unified";
import visit from "unist-util-visit";
import { VFile } from "vfile";
import { isLocalAssetFile, relatify } from "../utils/url";
import {
  updateOrCreateAttribute,
  filterByAttibuteName,
  createMdxjsEsmImportNode,
  createMdxJsxFlowElement,
  createMdxJsxAttributeValueExpression,
} from "./mdx-helpers";
import {
  createIdentifier,
  createLiteral,
  createObjectExpression,
} from "./estree-helpers";
import { getValidAssetPath, getDimensions } from "./image-helpers";
import { visitImagePaths } from "./estree-images";

interface RemarkImportFilesOptions {
  propsList?: string[];
  extWhiteList?: string[];
  extBlackList?: string[];
}

const isMdxNode = ({ type }) =>
  [
    "mdxJsxTextElement",
    "mdxJsxFlowElement",
    "mdxBlockElement",
    "mdxSpanElement",
  ].includes(type);

const isMDXNodeWithAttributes = (
  node: MdxastNode,
  { extWhiteList, extBlackList, propsList }: RemarkImportFilesOptions
): boolean =>
  isMdxNode(node) &&
  !!filterByAttibuteName((node as MdxJsxFlowElement).attributes, propsList) &&
  isLocalAssetFile(
    filterByAttibuteName((node as MdxJsxFlowElement).attributes, propsList)
      .value,
    { extWhiteList, extBlackList }
  );

const isLink = (
  node: MdxastNode,
  { extWhiteList, extBlackList }: RemarkImportFilesOptions
): boolean =>
  node.type === "link" &&
  isLocalAssetFile(node.url, { extWhiteList, extBlackList });

const isImage = (
  node: UnistNode,
  { extWhiteList, extBlackList }: RemarkImportFilesOptions
): boolean =>
  node.type === "image" &&
  isLocalAssetFile(node.url, { extWhiteList, extBlackList });

const isMetaNode = (node: MdxastNode) =>
  node.type === "mdxjsEsm" && /export const meta = /.test(node.value);

const importFactory = () => {
  const imports: Record<string, string> = {};

  const createImport = (url: string) => {
    let name = imports[url];

    if (!name) {
      name = `__${url.replace(/\W/g, "_")}__`;

      imports[url] = name;
    }

    return name;
  };

  return { imports, createImport };
};

interface UpdateFilePathOptions {
  vfile: VFile;
  node: MdxJsxFlowElement;
  propsList: string[];
  createImport: (path: string) => string;
}

const updateFilePath = ({
  vfile,
  node,
  propsList,
  createImport,
}: UpdateFilePathOptions) => {
  const attribute = filterByAttibuteName(node.attributes, propsList);

  if (!attribute || !attribute.value) {
    return;
  }

  const path = relatify(attribute.value as string);
  const fullAssetPath = getValidAssetPath(vfile.path, path);

  if (!fullAssetPath) {
    return;
  }

  const name = createImport(path);

  updateOrCreateAttribute(
    node,
    attribute.name,
    createMdxJsxAttributeValueExpression(name)
  );

  if (node.name === "img") {
    const { width, height } = getDimensions(vfile.path, path);

    updateOrCreateAttribute(node, "width", width);
    updateOrCreateAttribute(node, "height", height);
  }
};

const defaultOptions = {
  propsList: ["src", "href", "poster", "image"],
  extWhiteList: [],
  extBlackList: ["mdx", "md", "css", "ts", "tsx", "js", "jsx"],
};

export default function remarkImportFiles(
  options: RemarkImportFilesOptions
): Transformer {
  return (root: MdxastRootNode, vfile: VFile) => {
    const { imports, createImport } = importFactory();

    const pluginOptions = { ...defaultOptions, ...options };

    const { propsList, extWhiteList, extBlackList } = pluginOptions;

    visit(root, (node: MdxastNode, index, parent) => {
      if (isMetaNode(node)) {
        visitImagePaths({
          tree: node.data.estree,
          path: vfile.path,
          propsList,
          extWhiteList,
          extBlackList,
          callback: (node) => {
            const name = createImport(node.value as string);

            const { width, height } = getDimensions(
              vfile.path,
              node.value as string
            );

            return createObjectExpression([
              createIdentifier("src", name),
              createLiteral("width", width),
              createLiteral("height", height),
            ]);
          },
        });
      } else if (isImage(node, pluginOptions)) {
        const { url: src, alt = "", title } = node;

        const props: Record<string, unknown> = { src, alt };

        if (title) {
          props.title = title;
        }

        const newNode = createMdxJsxFlowElement("img", props);

        updateFilePath({ vfile, node: newNode, propsList, createImport });

        parent.children.splice(index, 1, newNode);
      } else if (isLink(node, pluginOptions)) {
        const newNode = createMdxJsxFlowElement("a", {
          href: node.url,
          children: node.children,
        });

        updateFilePath({ vfile, node: newNode, propsList, createImport });

        parent.children.splice(index, 1, newNode);
      } else if (isMDXNodeWithAttributes(node, pluginOptions)) {
        updateFilePath({
          vfile,
          node: node as MdxJsxFlowElement,
          propsList,
          createImport,
        });
      }
    });

    root.children.unshift(
      ...Object.entries(imports).map(([url, name]) =>
        createMdxjsEsmImportNode(name, url)
      )
    );
  };
}
