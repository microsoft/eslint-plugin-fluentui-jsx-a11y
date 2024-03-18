// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/badge-missing-aria-v9"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("badge-missing-aria-v9", rule, {
    valid: [
        '<Badge aria-label="Done" />',
        '<Badge aria-label="Done"><SomeNesting /></Badge>',
        '<><Label id="some-id">Some Label</Label><SomeNesting /><Badge aria-labelledby="some-id"><SomeNesting /></Badge></>'
    ],

    invalid: [
        {
            code: "<Badge />",
            errors: [{ messageId: "missingLabelOnBadge" }]
        },
        {
            code: "<Badge><SomeNesting /></Badge>",
            errors: [{ messageId: "missingLabelOnBadge" }]
        },
        {
            code: "<><Label/><Badge/></>",
            errors: [{ messageId: "missingLabelOnBadge" }]
        },
        {
            code: '<><Label htmlFor="id"/><Badge /></>',
            errors: [{ messageId: "missingLabelOnBadge" }]
        },
        {
            code: '<Badge aria-labelledby="some-id"/>',
            errors: [{ messageId: "missingLabelOnBadge" }]
        },
        {
            code: '<><Label>Some Label</Label><Badge aria-labelledby="some-id"/></>',
            errors: [{ messageId: "missingLabelOnBadge" }]
        },
        {
            code: '<><Label>Some Label</Label><Badge aria-labelledby="some-id"><SomeNesting /></Badge></>',
            errors: [{ messageId: "missingLabelOnBadge" }]
        }
    ]
});

