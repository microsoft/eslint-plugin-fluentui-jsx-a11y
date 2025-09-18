// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ESLintUtils } from "@typescript-eslint/utils";
import { makeLabeledControlRule } from "../util/ruleFactory";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export default ESLintUtils.RuleCreator.withoutDocs(
    makeLabeledControlRule({
        component: "ImageSwatch",
        messageId: "noUnlabeledImageSwatch",
        description: "Accessibility: ImageSwatch must have an accessible name via aria-label, Tooltip, aria-labelledby, etc..",
        labelProps: ["aria-label"],
        allowFieldParent: false,
        allowHtmlFor: false,
        allowLabelledBy: true,
        allowWrappingLabel: true,
        allowTooltipParent: true,
        allowDescribedBy: false,
        allowLabeledChild: false,
        allowTextContentChild: false
    })
);
