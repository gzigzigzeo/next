declare type RehypeRoot = import("hast").Root;
declare type RehypeElement = import("hast").Element;
declare type RehypeDocType = import("hast").DocType;
declare type RehypeComment = import("hast").Comment;
declare type RehypeText = import("hast").Text;
declare type UnistParent = import("unist").Parent;
declare type UnistNode = import("unist").Node;
declare type UnistLiteral = import("unist").Literal;
declare type MdastContent = import("mdast").Content;
declare type EstreeJstProgram = import("estree-jsx");

declare type MdxJsxAttributeValue =
  | boolean
  | number
  | string
  | null
  | undefined
  | Array<string | number>
  | ProgramEsmNode;
declare interface MdxJsxAttribute {
  type: "mdxJsxAttribute";
  name: string;
  value: MdxJsxAttributeValue;
}

declare interface MdxElement extends UnistParent {
  attributes: MdxJsxAttribute[];
}
declare interface MdxBlockElement extends MdxElement {
  type: "mdxBlockElement";
}

declare interface MdxSpanElement extends MdxElement {
  type: "mdxSpanElement";
}

declare interface MdxJsxFlowElement extends MdxElement {
  type: "mdxJsxFlowElement";
}

declare interface MdxJsxTextElement extends MdxElement {
  type: "mdxJsxTextElement";
}

declare interface ProgramEsmNode extends UnistNode {
  type: "mdxjsEsm" | "mdxJsxAttributeValueExpression";
  value?: string;
  data: {
    estree?: EstreeJstProgram;
  } & UnistLiteral["data"];
}

declare interface PlainEsmNode extends UnistNode {
  type: "mdxjsEsm";
  value: string;
}
declare type EsmNode = PlainEsmNode | ProgramEsmNode;

declare type MdxAnyElement =
  | MdxBlockElement
  | MdxSpanElement
  | MdxJsxFlowElement
  | MdxJsxTextElement;

declare type RehypeNode =
  | RehypeRoot
  | RehypeElement
  | RehypeDocType
  | RehypeComment
  | RehypeText;

declare type MdxhastNode = RehypeNode | EsmNode | MdxAnyElement;

declare interface MdxhastRootNode extends UnistNode {
  type: "root";
  children: MdxhastNode[];
}

declare type MdxastNode = MdastContent | MdxAnyElement | EsmNode;

declare interface MdxastRootNode extends UnistNode {
  type: "root";
  children?: MdxastNode[];
}
