// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { Rule } from "eslint";
import ruleTester from "./helper/ruleTester";
import rule from "../../../lib/rules/badge-needs-accessible-name";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run("badge-needs-accessible-name", rule as unknown as Rule.RuleModule, {
    valid: [
        `<Badge role="img" aria-label="Active" appearance="filled" color="brand" />`,
        `<Badge icon={<PasteIcon aria-label="paste" />} />`,
        `<div><Badge appearance="filled">999+</Badge></div>`
    ],

    invalid: [
        {
            code: `<Badge appearance="filled" color="brand" />`,
            errors: [{ messageId: "colourOnlyBadgesNeedAttributes" }],
            output: `<Badge role="img" aria-label="" appearance="filled" color="brand" />`
        },
        {
            code: `<Badge appearance="filled" color="brand" aria-label="Active" />`,
            errors: [{ messageId: "colourOnlyBadgesNeedAttributes" }],
            output: `<Badge role="img" appearance="filled" color="brand" aria-label="Active" />`
        },
        {
            code: `<Badge appearance="filled" color="brand" role="img" />`,
            errors: [{ messageId: "colourOnlyBadgesNeedAttributes" }],
            output: `<Badge aria-label="" appearance="filled" color="brand" role="img" />`
        },
        {
            code: `<Badge icon={<PasteIcon />} />`,
            errors: [{ messageId: "badgeIconNeedsLabelling" }],
            output: `<Badge icon={<PasteIcon aria-label="" />} />`
        },
        {
            code: `<Badge appearance="filled" color="brand"></Badge>`,
            errors: [{ messageId: "colourOnlyBadgesNeedAttributes" }],
            output: `<Badge role="img" aria-label="" appearance="filled" color="brand"></Badge>`
        },
        {
            code: `<Badge></Badge>`,
            errors: [{ messageId: "badgeNeedsAccessibleName" }],
            output: null
        },
        {
            code: `<Badge size="medium" appearance="filled"  />`,
            errors: [{ messageId: "badgeNeedsAccessibleName" }],
            output: null
        }
    ]
});
