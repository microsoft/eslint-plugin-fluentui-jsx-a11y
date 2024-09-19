// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/counter-badge-needs-count"),
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
ruleTester.run("counter-badge-needs-count", rule, {
    valid: [
        `<CounterBadge count={5} appearance="filled" />`,
        `<CounterBadge icon={<PasteIcon aria-label="paste" />} count={1} />`,
        `<CounterBadge dot />`,
        `<div><CounterBadge count={10} appearance="filled" /></div>`
    ],

    invalid: [
        {
            code: `<CounterBadge appearance="filled" size="extra-large" />`,
            errors: [{ messageId: "counterBadgeNeedsCount" }],
            output: `<CounterBadge count={0} appearance="filled" size="extra-large" />`
        },
        {
            code: `<CounterBadge icon={<PasteIcon />} />`,
            errors: [
                {
                    messageId: "counterBadgeIconNeedsLabelling"
                },
                { messageId: "counterBadgeNeedsCount" }
            ],
            output: `<CounterBadge count={0} icon={<PasteIcon aria-label="" />} />`
        },
        {
            code: `<CounterBadge icon={<PasteIcon />} count={100} />`,
            errors: [{ messageId: "counterBadgeIconNeedsLabelling" }],
            output: `<CounterBadge icon={<PasteIcon aria-label="" />} count={100} />`
        },
        {
            code: `<CounterBadge></CounterBadge>`,
            errors: [{ messageId: "counterBadgeNeedsCount" }],
            output: `<CounterBadge count={0}></CounterBadge>`
        }
    ]
});
