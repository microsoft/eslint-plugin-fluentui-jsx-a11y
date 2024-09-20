import { TSESTree } from "@typescript-eslint/utils";
declare const rule: import("@typescript-eslint/utils/dist/ts-eslint").RuleModule<"noEmptyComponents", [], {
    JSXElement(node: TSESTree.JSXElement): void;
}>;
export default rule;
