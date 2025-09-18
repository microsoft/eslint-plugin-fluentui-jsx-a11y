// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ESLintUtils } from "@typescript-eslint/utils";
import { makeLabeledControlRule } from "../util/ruleFactory";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export default ESLintUtils.RuleCreator.withoutDocs(
    makeLabeledControlRule({
        component: "SplitButton",
        messageId: "noUnlabeledSplitButton",
        description: "Accessibility: SplitButton must have an accessible name via title, aria-label",
        labelProps: ["aria-label"],
        allowFieldParent: true,
        allowHtmlFor: false,
        allowLabelledBy: true,
        allowWrappingLabel: false,
        allowTooltipParent: false,
        allowDescribedBy: false,
        allowLabeledChild: false
    })
);
