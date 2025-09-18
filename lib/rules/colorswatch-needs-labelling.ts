// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ESLintUtils } from "@typescript-eslint/utils";
import { makeLabeledControlRule } from "../util/ruleFactory";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export default ESLintUtils.RuleCreator.withoutDocs(
    makeLabeledControlRule({
        component: "ColorSwatch",
        messageId: "noUnlabeledColorSwatch",
        description: "Accessibility: ColorSwatch must have an accessible name via aria-label, Tooltip, aria-labelledby, etc..",
        labelProps: ["aria-label"],
        allowFieldParent: true,
        allowHtmlFor: true,
        allowLabelledBy: false,
        allowWrappingLabel: true,
        allowTooltipParent: true,
        allowDescribedBy: false,
        allowLabeledChild: false,
        allowTextContentChild: true
    })
);
