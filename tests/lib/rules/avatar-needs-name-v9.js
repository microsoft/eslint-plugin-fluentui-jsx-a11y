// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const RuleTester = require("eslint").RuleTester;

const rule = require("../../../lib/rules/avatar-needs-name-v9");

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
ruleTester.run("avatar-needs-name-v9", rule, {
    valid: [
        // give me some code that won't trigger a warning
        '<Avatar name="Jane Doe" />',
        '<Avatar aria-label="Jane Doe" />',
        '<><Label id="label-id">Jane Doe</Label><Avatar aria-labelledby="label-id" /></>',
        '<Avatar name="Jane Doe"></Avatar>',
        '<Avatar aria-label="Jane Doe"></Avatar>',
        '<><Label id="label-id">Jane Doe</Label><Avatar aria-labelledby="label-id"></Avatar></>'
    ],

    invalid: [
        {
            code: "<Avatar />",
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: "<Avatar></Avatar>",
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: "<Avatar icon={<CloseIcon />}></Avatar>",
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: "<Avatar icon={<CloseIcon />} />",
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: "<Avatar image={{ src: \"example-image\" }}></Avatar>",
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: "<Avatar image={{ src: \"example-image\" }} />",
            errors: [{ messageId: "missingAriaLabel" }]
        }
    ]
});
