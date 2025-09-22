// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { makeLabeledControlRule } from "../../util/ruleFactory";
import { hasNonEmptyProp } from "../../util/hasNonEmptyProp";
import { elementType } from "jsx-ast-utils";
import { JSXOpeningElement } from "estree-jsx";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export default ESLintUtils.RuleCreator.withoutDocs(
    makeLabeledControlRule({
        component: "Button",
        messageId: "noUnlabeledButton",
        description: "Button must have an accessible name.",
        labelProps: ["aria-label", "title"],
        allowFieldParent: true,
        allowHtmlFor: false,
        allowLabelledBy: true,
        allowWrappingLabel: true,
        allowTooltipParent: true,
        allowDescribedBy: false,
        allowLabeledChild: true,
        allowTextContentChild: true,
        customValidator: (opening: TSESTree.JSXOpeningElement) =>
            // Allow icon-only buttons with explicit `aria-hidden` icon and `data-icon-name`
            hasNonEmptyProp(opening.attributes, "iconOnly") ||
            // Treat `aria-roledescription="close"` as labeled for specific CloseButton
            (elementType(opening as unknown as JSXOpeningElement) === "CloseButton" &&
                hasNonEmptyProp(opening.attributes, "aria-roledescription")) ||
            // Project-specific: allow when `data-a11y-labeled` truthy (escape hatch)
            hasNonEmptyProp(opening.attributes, "data-a11y-labeled")
    })
);
