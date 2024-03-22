// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const RuleTester = require("eslint").RuleTester;

const rule = require("../../../lib/rules/radiogroup-missing-label-v9");

RuleTester.setDefaultConfig({
    parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {
            jsx: true
        }
    }
});

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("radioGroup-missing-label-v9", rule, {
    valid: [
        "<><Label>This is a RadioGroup<RadioGroup checked={true} /></Label></>",
        `<><Label htmlFor="my-label-1">This is a RadioGroup</Label><RadioGroup id="my-label-1" checked={true} /></>`,
        `<RadioGroup label="This is a RadioGroup" checked={true} />`,
        `<RadioGroup label="This is a RadioGroup" checked={true}></RadioGroup>`,
        `<RadioGroup aria-label="This is a aria-label for the link" checked={true} />`,
        `<RadioGroup aria-label="This is a aria-label for the link" checked={true} ></RadioGroup>`,
        `<><Label id="my-label-1">This is a RadioGroup</Label><RadioGroup aria-labelledby="my-label-1" checked={true} /></>`,
        `<><Label id="my-label-1">This is a RadioGroup</Label><RadioGroup aria-labelledby="my-label-1" checked={true}></RadioGroup></>`,
        `<><Label id="my-label-1">This is a RadioGroup</Label><Label id="my-label-3">This is a RadioGroup</Label><RadioGroup aria-labelledby="my-label-1" checked={true}></RadioGroup></>`,
        `<Field><Label>This is a radiogroup inside Field</Label><RadioGroup checked={true}></RadioGroup></Field>`,
        `<Field label="Radio group label"><RadioGroup checked={true}></RadioGroup></Field>`,
        `<Field><RadioGroup label="Radio group label" checked={true}></RadioGroup></Field>`,
        `<Field><RadioGroup aria-label="Radio group label" checked={true}></RadioGroup></Field>`
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
