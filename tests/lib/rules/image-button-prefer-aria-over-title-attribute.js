/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const RuleTester = require("eslint").RuleTester;

const rule = require("../../../lib/rules/image-button-prefer-aria-over-title-attribute");

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
ruleTester.run("image-button-prefer-aria-over-title-attribute", rule, {
    valid: [
        // sample code that won't trigger a warning
        '<Button icon={<CloseIcon />} iconOnly aria-label="Close" />',
        '<Button icon={<CloseIcon />} iconOnly aria-label="Close" title="Close" />',
        '<Button content="anything" />',
        '<Button icon={<CloseIcon />} iconOnly aria-label="Close"></Button>',
        '<Button icon={<CloseIcon />} iconOnly aria-label="Close" title="Close"></Button>',
        '<Button content="anything"></Button>',
        "<Image />",
        '<Datepicker daysToSelectInDayView={0} popup="Compress program" />',
        '<Button icon={<CloseIcon />} iconOnly aria-labelledby="label-id-4"></Button>',
        '<Button icon={<CloseIcon />} iconOnly aria-describedby="label-id-4"></Button>'
    ],
    invalid: [
        {
            code: '<Button icon={<CloseIcon />} iconOnly title="Close"></Button>',
            errors: [{ messageId: "preferAriaOverTitle" }]
        },
        {
            code: '<Button icon={<CloseIcon />} iconOnly title="Close"/>',
            errors: [{ messageId: "preferAriaOverTitle" }]
        }
    ]
});
