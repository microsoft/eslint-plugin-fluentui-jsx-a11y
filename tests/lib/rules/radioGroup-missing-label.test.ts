// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { Rule } from "eslint";
import ruleTester from "./helper/ruleTester";
import rule from "../../../lib/rules/radiogroup-missing-label";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run("radioGroup-missing-label", rule as unknown as Rule.RuleModule, {
    valid: [
        "<><Label>This is a RadioGroup<RadioGroup checked={true} /></Label></>",
        `<><Label htmlFor="my-label-1">This is a RadioGroup</Label><RadioGroup id="my-label-1" checked={true} /></>`,
        `<RadioGroup label="This is a RadioGroup" checked={true} />`,
        `<RadioGroup label="This is a RadioGroup" checked={true}></RadioGroup>`,
        `<RadioGroup aria-label="This is a aria-label for the link" checked={true} />`,
        `<RadioGroup aria-label="This is a aria-label for the link" checked={true} ></RadioGroup>`,
        `<><Label id="my-label-1">This is a RadioGroup</Label><RadioGroup aria-labelledby="my-label-1" checked={true} /></>`,
        `<><Label id="my-label-1">This is a RadioGroup</Label><RadioGroup aria-labelledby="my-label-1" checked={true}></RadioGroup></>`,
        `<><Label id="my-label-1">This is a RadioGroup</Label><Label id="my-label-3">This is a RadioGroup</Label><RadioGroup aria-labelledby="my-label-1" checked={true}></RadioGroup></>`
    ],
    invalid: [
        {
            code: `<RadioGroup checked={true} />`,
            errors: [{ messageId: "noUnlabeledRadioGroup" }]
        },
        {
            code: `<><Label id="my-label-2">This is a RadioGroup</Label><RadioGroup aria-labelledby="my-label-1" checked={true} /></>`,
            errors: [{ messageId: "noUnlabeledRadioGroup" }]
        },
        {
            code: `<><Label id="my-label-2">This is a RadioGroup</Label><RadioGroup aria-labelledby="my-label-1" checked={true}></RadioGroup></>`,
            errors: [{ messageId: "noUnlabeledRadioGroup" }]
        },
        {
            code: `<><Label id="my-label-1">This is a RadioGroup</Label><Label id="my-label-3">This is a RadioGroup</Label><RadioGroup aria-labelledby="my-label-4" checked={true}></RadioGroup></>`,
            errors: [{ messageId: "noUnlabeledRadioGroup" }]
        }
    ]
});
