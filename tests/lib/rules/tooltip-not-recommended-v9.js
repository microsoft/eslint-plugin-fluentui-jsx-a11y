// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/tooltip-not-recommended-v9"),
    RuleTester = require("eslint").RuleTester;

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
ruleTester.run("tooltip-not-recommended-v9", rule, {
    valid: [
        // Valid cases
        '<div><label id="my-label">More option</label><SpinButton aria-labelledby="my-label"/></div>',
        '<div><label id="my-label">More option</label><MenuItem aria-labelledby="my-label"/></div>'
    ],
    invalid: [
        // Invalid cases
        {
            code: '<Tooltip content="menu item" relationship="label"><MenuItem/></Tooltip>',
            errors: [{ messageId: "tooltipNotRecommended" }]
        },
        {
            code: '<Tooltip content="menu item" relationship="label"><SpinButton/></Tooltip>',
            errors: [{ messageId: "tooltipNotRecommended" }]
        }
    ]
});

