// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const RuleTester = require("eslint").RuleTester;

const rule = require("../../../lib/rules/radio-button-missing-label");

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
ruleTester.run("radio-button-missing-label", rule, {
    valid: [
        "<><Label>This is a Radio<Radio checked={true} /></Label></>",
        `<><Label htmlFor="my-label-1">This is a Radio</Label><Radio id="my-label-1" checked={true} /></>`,
        `<Radio label="This is a Radio" checked={true} />`,
        `<Radio label="This is a Radio" checked={true}></Radio>`,
        `<Radio aria-label="This is a aria-label for the link" checked={true} />`,
        `<Radio aria-label="This is a aria-label for the link" checked={true} ></Radio>`,
        `<><Label id="my-label-1">This is a Radio</Label><Radio aria-labelledby="my-label-1" checked={true} /></>`,
        `<><Label id="my-label-1">This is a Radio</Label><Radio aria-labelledby="my-label-1" checked={true}></Radio></>`,
        `<><Label id="my-label-1">This is a Radio</Label><Label id="my-label-3">This is a Radio</Label><Radio aria-labelledby="my-label-1" checked={true}></Radio></>`
    ],
    invalid: [
        {
            code: `<Radio checked={true} />`,
            errors: [{ messageId: "noUnlabeledRadioButton" }]
        },
        {
            code: `<><Label id="my-label-2">This is a Radio</Label><Radio aria-labelledby="my-label-1" checked={true} /></>`,
            errors: [{ messageId: "noUnlabeledRadioButton" }]
        },
        {
            code: `<><Label id="my-label-2">This is a Radio</Label><Radio aria-labelledby="my-label-1" checked={true}></Radio></>`,
            errors: [{ messageId: "noUnlabeledRadioButton" }]
        },
        {
            code: `<><Label id="my-label-1">This is a Radio</Label><Label id="my-label-3">This is a Radio</Label><Radio aria-labelledby="my-label-4" checked={true}></Radio></>`,
            errors: [{ messageId: "noUnlabeledRadioButton" }]
        }
    ]
});
