// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/badge-needs-name-v9"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("badge-needs-name-v9", rule, {
    valid: [
        '<Badge icon={<CloseIcon />} aria-label="Close icon"></Badge>',
        "<Badge>Example</Badge>",
        '<Tooltip content="example"><Badge></Badge></Tooltip>',
        '<><Label id="button-id-4">Close</Label><Badge icon={<CloseIcon />} aria-labelledby="button-id-4"></Badge></>'
    ],
    invalid: [
        {
            code: "<Badge />",
            errors: [{ messageId: "noAccessibleNameBadge" }]
        },
        {
            code: "<Badge icon={<CloseIcon />}></Badge>",
            errors: [{ messageId: "noAccessibleNameBadge" }]
        },
        {
            code: "<Badge icon={<CloseIcon />} />",
            errors: [{ messageId: "noAccessibleNameBadge" }]
        },
        {
            code: '<Badge icon={<CloseIcon />} aria-labelledby="label-id-4"></Badge>',
            errors: [{ messageId: "noAccessibleNameBadge" }]
        },
        {
            code: '<><Button id="Button-id-4">Close</Button><Badge icon={<CloseIcon />} aria-labelledby="label-id-5" /></>',
            errors: [{ messageId: "noAccessibleNameBadge" }]
        },
        {
            code: "<><Tooltip>Close</Tooltip><Badge icon={<CloseIcon />} /></>",
            errors: [{ messageId: "noAccessibleNameBadge" }]
        }
    ]
});

