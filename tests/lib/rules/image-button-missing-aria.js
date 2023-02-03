/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const RuleTester = require("eslint").RuleTester;

const rule = require("../../../lib/rules/image-button-missing-aria");

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
ruleTester.run("image-button-missing-aria", rule, {
    valid: [
        // give me some code that won't trigger a warning
        '<Button icon={<CloseIcon />} iconOnly aria-label="Close" />',
        '<Button content="anything" />',
        '<Button icon={<CloseIcon />} iconOnly aria-label="Close"></Button>',
        '<Button content="anything"></Button>',
        "<Image />",
        '<Datepicker daysToSelectInDayView={0} popup="Compress program" />',
        '<Button icon={<CloseIcon />} iconOnly aria-labelledby="label-id-4"></Button>',
        '<Button icon={<CloseIcon />} iconOnly aria-describedby="label-id-4"></Button>'
    ],

    invalid: [
        {
            code: "<Button icon={<CloseIcon />} iconOnly></Button>",
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: "<Button icon={<CloseIcon />} iconOnly />",
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: "<Button icon={<CloseIcon />} />",
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: "<Button icon={<CloseIcon />}></Button>",
            errors: [{ messageId: "missingAriaLabel" }]
        }
    ]
});