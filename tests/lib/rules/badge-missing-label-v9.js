// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/badge-missing-label-v9"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("badge-missing-label-v9", rule, {
    valid: [
        "<><Label>This is a Badge<Badge content='1' /></Label></>",
        `<Badge content="This is a Badge" />`,
        `<><Label htmlFor="my-label-1">This is a Badge</Label><Badge id="my-label-1" content='2' /></>`,
        `<><Label id="my-label-1">This is a Badge</Label><Badge aria-labelledby="my-label-1" content='2' /></>`
    ],
    invalid: [
        {
            code: `<Badge />`,
            errors: [{ messageId: "noUnlabelledBadge" }]
        },
        {
            code: `<><Label id="my-label-2">This is a Badge</Label><Badge aria-labelledby="my-label-1" /></>`,
            errors: [{ messageId: "noUnlabelledBadge" }]
        },
        {
            code: `<><Label id="my-label-2">This is a Badge</Label><Badge aria-labelledby="my-label-1"></Badge></>`,
            errors: [{ messageId: "noUnlabelledBadge" }]
        },
        {
            code: `<><Label id="my-label-1">This is a Badge</Label><Label id="my-label-3">This is a Badge</Label><Badge aria-labelledby="my-label-4"></Badge></>`,
            errors: [{ messageId: "noUnlabelledBadge" }]
        }
    ]
});

