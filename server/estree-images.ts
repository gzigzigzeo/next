import { resolve, dirname } from "path";
import { existsSync } from "fs";
import { Property, Literal, Identifier, ObjectExpression } from "estree";
import { Node } from "acorn";
import { simple, base } from "acorn-walk";
import { isLocalAssetFile } from "../utils/url";

interface VisitImagePathsParams {
  tree: Node;
  path: string;
  callback: (node: Literal) => Literal | ObjectExpression;
  propsList?: string[];
  extWhiteList: string[];
  extBlackList: string[];
}

export const visitImagePaths = ({
  tree,
  path,
  callback,
  propsList,
  extWhiteList,
  extBlackList,
}: VisitImagePathsParams) => {
  simple(
    tree,
    {
      Property(baseNode) {
        const node = baseNode as unknown as Property;

        if (
          node.value.type === "Literal" &&
          (propsList
            ? propsList.includes((node.key as Identifier).name)
            : true) &&
          isLocalAssetFile(node.value.value as string, {
            extWhiteList,
            extBlackList,
          }) &&
          existsSync(resolve(dirname(path), node.value.value as string))
        ) {
          node.value = callback(node.value);
        }
      },
    },
    {
      ...base,
      JSXElement: () => undefined,
    }
  );
};
