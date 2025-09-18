// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ESLintUtils } from "@typescript-eslint/utils";
import { makeLabeledControlRule } from "../util/ruleFactory";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export default ESLintUtils.RuleCreator.withoutDocs(
    makeLabeledControlRule({
        component: "Tag",
        messageId: "missingAriaLabel",
        description: "Accessibility: Tag must have an accessible name",
        labelProps: ["aria-label"],
        allowFieldParent: false,
        allowHtmlFor: false,
        allowLabelledBy: true,
        allowWrappingLabel: false,
        allowTooltipParent: false,
        allowDescribedBy: false,
        allowLabeledChild: false,
        allowTextContentChild: true
    })
);
