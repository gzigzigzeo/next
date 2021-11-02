import { createEstree } from "./estree-helpers";
import stringifyObject from "stringify-object";

export const createMdxjsEsmNode = (value: string): EsmNode => {
  return {
    type: "mdxjsEsm",
    value,
    data: {
      estree: createEstree(value),
    },
  };
};

export const createMdxJsxAttributeValueExpression = (
  value: string
): ProgramEsmNode => {
  return {
    type: "mdxJsxAttributeValueExpression",
    value: `"${value}"`,
    data: {
      // For some reason estre parser didn't add "comments" field
      // and mdx@2.0.0-next.9 is throwing error without it.
      // Will be fixed in mdx@2.0.0-rc.1
      estree: { ...createEstree(value), comments: [] },
    },
  };
};

export const createMdxJsxAttribute = (
  name: string,
  value: MdxJsxAttributeValue
): MdxJsxAttribute => ({
  type: "mdxJsxAttribute",
  name,
  value,
});

export const createMdxjsEsmExportNode = (
  name: string,
  data: unknown
): EsmNode => {
  return createMdxjsEsmNode(`export const ${name} = ${stringifyObject(data)};`);
};

export const createMdxjsEsmImportNode = (
  name: string,
  path: string
): EsmNode => {
  return createMdxjsEsmNode(`import ${name} from "${path}";`);
};

export const createMdxJsxFlowElement = (
  name: string,
  { children = [], ...props }: Record<string, unknown>
): MdxJsxFlowElement => {
  return {
    type: "mdxJsxFlowElement",
    name,
    children: children as UnistNode[],
    attributes: Object.entries(props)
      .filter(([, value]) => typeof value !== undefined)
      .map(([name, value]) => ({
        type: "mdxJsxAttribute",
        name,
        value,
      })) as MdxJsxAttribute[],
  };
};

// Attribute helpers

export const hasAttribute = (
  attributes: MdxJsxAttribute[] = [],
  name: string
): boolean => !!attributes.some((attr) => attr.name === name);

export const getAttribute = (attributes: MdxJsxAttribute[], name: string) => {
  const localPath = attributes.find((attribute) => attribute.name === name);

  return (localPath?.value as string) ?? "";
};

export const updateOrCreateAttribute = (
  node: MdxJsxFlowElement,
  name: string,
  value: MdxJsxAttributeValue
) => {
  if (hasAttribute(node.attributes, name)) {
    node.attributes = node.attributes.map((attribute) => {
      if (attribute.name === name) {
        return { ...attribute, value: value };
      }

      return attribute;
    });
  } else {
    node.attributes.push(createMdxJsxAttribute(name, value));
  }
};

export const filterByAttibuteName = (
  attributes: MdxJsxAttribute[] = [],
  whiteList: string[]
): MdxJsxAttribute | undefined =>
  attributes.find(({ name }) => whiteList.includes(name));
