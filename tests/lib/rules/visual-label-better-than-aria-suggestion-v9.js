// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/visual-label-better-than-aria-suggestion-v9"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("visual-label-better-than-aria-suggestion-v9", rule, {
    valid: [
        `<><Label id="my-dropdownid">This is the visual label</Label><Dropdown aria-labelledby="my-dropdownid" /></>`,
        `<><Label id="id2">This is the visual label<SpinButton aria-labelledby="id2" /></Label></>`,
        `<><Label id="id3">This is the visual label</Label><CompoundButton aria-labelledby="id3" /></>`
    ],

    invalid: [
        {
            code: '<Dropdown aria-label="This is a Dropdown" />',
            errors: [{ messageId: "visualLabelSuggestion" }]
        },
        {
            code: '<SpinButton aria-label="This is a Dropdown" />',
            errors: [{ messageId: "visualLabelSuggestion" }]
        },
        {
            code: '<CompoundButton aria-label="This is a Dropdown" />',
            errors: [{ messageId: "visualLabelSuggestion" }]
        }
    ]
});
