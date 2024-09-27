import { TSESTree } from "@typescript-eslint/utils";
declare const rule: import("@typescript-eslint/utils/dist/ts-eslint").RuleModule<"badgeNeedsAccessibleName" | "colourOnlyBadgesNeedAttributes" | "badgeIconNeedsLabelling", [], {
    JSXElement(node: TSESTree.JSXElement): void;
}>;
export default rule;
