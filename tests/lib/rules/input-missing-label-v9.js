// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const RuleTester = require("eslint").RuleTester;

const rule = require("../../../lib/rules/input-missing-label-v9");

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
ruleTester.run("input-missing-label-v9", rule, {
    valid: [
        '<><Label htmlFor="some-id">Some Label</Label><Input id="some-id"/></>',
        '<><Label id="test-span">Some Label</Label><Input id="some-id" aria-labelledby="test-span"/></>',
        "<Label>test</Label>",
        "<Label>test<Input/></Label>",
        "<Label>test<SomeNesting><Input/></SomeNesting></Label>"
    ],

    invalid: [
        {
            code: "<><Input/></>",
            errors: [{ messageId: "missingLabelOnInput" }]
        },
        {
            code: "<><Label/><Input/></>",
            errors: [{ messageId: "missingLabelOnInput" }]
        },
        {
            code: '<><Label htmlFor="id"/><Input /></>',
            errors: [{ messageId: "missingLabelOnInput" }]
        },
        {
            code: '<Input id="some-id"/>',
            errors: [{ messageId: "missingLabelOnInput" }]
        },
        {
            code: '<><Label>Some Label</Label><Input id="some-id"/></>',
            errors: [{ messageId: "missingLabelOnInput" }]
        }
    ]
});
