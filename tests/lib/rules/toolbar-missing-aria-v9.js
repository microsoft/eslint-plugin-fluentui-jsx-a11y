// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/toolbar-missing-aria-v9"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("toolbar-missing-aria-v9", rule, {
    valid: [
        '<Toolbar aria-label="Controls" />',
        '<Toolbar aria-label="Controls"><SomeNesting /></Toolbar>',
        '<><Label id="some-id">Some Label</Label><SomeNesting /><Toolbar aria-labelledby="some-id"><SomeNesting /></Toolbar></>'
    ],

    invalid: [
        {
            code: "<Toolbar />",
            errors: [{ messageId: "missingLabelOnToolbar" }]
        },
        {
            code: "<Toolbar><SomeNesting /></Toolbar>",
            errors: [{ messageId: "missingLabelOnToolbar" }]
        },
        {
            code: "<><Label/><Toolbar/></>",
            errors: [{ messageId: "missingLabelOnToolbar" }]
        },
        {
            code: '<><Label htmlFor="id"/><Toolbar /></>',
            errors: [{ messageId: "missingLabelOnToolbar" }]
        },
        {
            code: '<Toolbar aria-labelledby="some-id"/>',
            errors: [{ messageId: "missingLabelOnToolbar" }]
        },
        {
            code: '<><Label>Some Label</Label><Toolbar aria-labelledby="some-id"/></>',
            errors: [{ messageId: "missingLabelOnToolbar" }]
        },
        {
            code: '<><Label>Some Label</Label><Toolbar aria-labelledby="some-id"><SomeNesting /></Toolbar></>',
            errors: [{ messageId: "missingLabelOnToolbar" }]
        }
    ]
});

