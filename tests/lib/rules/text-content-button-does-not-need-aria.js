/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const RuleTester = require("eslint").RuleTester;

const rule = require("../../../lib/rules/text-content-button-does-not-need-aria");

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
ruleTester.run("text-content-button-does-not-need-aria", rule, {
    valid: [
        // give me some code that won't trigger a warning
        '<Button content="anything" />',
        '<Button content="anything"></Button>',
        "<Image />",
        '<Datepicker daysToSelectInDayView={0} popup="Compress program" />'
    ],

    invalid: [
        {
            code: "<Button content='Submit' aria-label='Close button'></Button>",
            errors: [{ messageId: "unnecessaryAriaLabelling" }]
        },
        {
            code: "<Button content='Submit' aria-label='Close button' />",
            errors: [{ messageId: "unnecessaryAriaLabelling" }]
        },
        {
            code: "<Button content='Submit' aria-labelledby='label-id-2'></Button>",
            errors: [{ messageId: "unnecessaryAriaLabelling" }]
        },
        {
            code: "<Button content='Submit' aria-labelledby='label-id-2' />",
            errors: [{ messageId: "unnecessaryAriaLabelling" }]
        }
    ]
});
