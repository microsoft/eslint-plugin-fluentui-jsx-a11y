// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ESLintUtils } from "@typescript-eslint/utils";
import { makeLabeledControlRule } from "../util/ruleFactory";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export default ESLintUtils.RuleCreator.withoutDocs(
    makeLabeledControlRule(
        {
            component: "SwatchPicker",
            labelProps: ["aria-label"],
            allowFieldParent: true,
            allowFor: false,
            allowLabelledBy: true,
            allowWrappingLabel: false
        },
        "noUnlabeledSwatchPicker",
        "Accessibility: SwatchPicker must have an accessible name via aria-label, aria-labelledby, Field component, etc.."
    )
);
