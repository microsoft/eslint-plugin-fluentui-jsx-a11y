// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ESLintUtils } from "@typescript-eslint/utils";
import { makeLabeledControlRule } from "../util/ruleFactory";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const rule = ESLintUtils.RuleCreator.withoutDocs(
    makeLabeledControlRule({
        component: "Image",
        messageId: "imageNeedsAlt",
        description: "Accessibility: Image must have alt attribute with a meaningful description of the image",
        requiredProps: ["alt"],
        allowFieldParent: false,
        allowHtmlFor: false,
        allowLabelledBy: false,
        allowWrappingLabel: false,
        allowTooltipParent: false,
        allowDescribedBy: false,
        allowLabeledChild: false
    })
);

export default rule;
