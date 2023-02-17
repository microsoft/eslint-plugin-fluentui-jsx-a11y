// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const RuleTester = require("eslint").RuleTester;

const rule = require("../../../lib/rules/unlabelled-checkbox");

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
ruleTester.run("checkbox-missing-aria", rule, {
    valid: [
        // sample code that won't trigger a warning
        '<Checkbox label="anything" />',
        '<Checkbox aria-label="Select instance" />',
        '<Checkbox aria-labelledby="label-id-2" />',
        '<Checkbox aria-describedby="label-id-2" />'
    ],
    invalid: [
        {
            code: "<Checkbox></Checkbox>",
            errors: [{ messageId: "noUnlabelledCheckboxes" }]
        },
        {
            code: "<Checkbox />",
            errors: [{ messageId: "noUnlabelledCheckboxes" }]
        }
    ]
});
