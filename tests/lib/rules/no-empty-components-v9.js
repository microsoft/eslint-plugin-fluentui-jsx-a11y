// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-empty-components-v9"),
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
ruleTester.run("no-empty-components-v9", rule, {
    valid: [
        "<Text>Hello</Text>",
        "<Label>Hello</Label>",
        '<Text font="base">This is the default font</Text>',
        '<Label size="small">Small</Label>',
        '<Combobox aria-labelledby={comboId} placeholder="Select an animal" {...props}>{options.map((option) => (<Option key={option} disabled={option === "Ferret"}>{option}</Option>))}</Combobox>'
    ],

    invalid: [
        {
            code: "<Text></Text>",
            errors: [{ messageId: "noEmptyComponents" }]
        },
        {
            code: "<Label></Label>",
            errors: [{ messageId: "noEmptyComponents" }]
        },
        {
            code: '<Text font="base"></Text>',
            errors: [{ messageId: "noEmptyComponents" }]
        },
        {
            code: '<Label size="small"></Label>',
            errors: [{ messageId: "noEmptyComponents" }]
        },
        {
            code: "<Text />",
            errors: [{ messageId: "noEmptyComponents" }]
        },
        {
            code: "<Label />",
            errors: [{ messageId: "noEmptyComponents" }]
        },
        {
            code: '<Combobox aria-labelledby={comboId} placeholder="Select an animal" {...props}></Combobox>',
            errors: [{ messageId: "noEmptyComponents" }]
        }
    ]
});

