// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const RuleTester = require("eslint").RuleTester;

const rule = require("../../../lib/rules/no-empty-buttons");

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
ruleTester.run("no-empty-buttons", rule, {
    valid: [
        // sample code that won't trigger a warning
        '<Button icon={<CloseIcon />} iconOnly aria-label="Close" />',
        '<Button content="anything" />',
        '<Button icon={<CloseIcon />} iconOnly aria-label="Close"></Button>',
        '<Button content="anything"></Button>',
        "<Button>Hello</Button>",
        "<Image />",
        '<Datepicker daysToSelectInDayView={0} popup="Compress program" />'
    ],
    invalid: [
        {
            code: "<Button></Button>",
            errors: [{ messageId: "noEmptyButtons" }]
        },
        {
            code: "<Button />",
            errors: [{ messageId: "noEmptyButtons" }]
        }
    ]
});
