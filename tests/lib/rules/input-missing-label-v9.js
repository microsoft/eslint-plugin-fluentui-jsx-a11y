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
        "<Label>test<SomeNesting><Input/></SomeNesting></Label>",
        '<><Label htmlFor="some-id">Some Label</Label><Slider size="medium" defaultValue={20} id="some-id"/></>',
        '<><Label id="test-span">Some Label</Label><Slider size="medium" defaultValue={20} id="some-id" aria-labelledby="test-span"/></>',
        '<Label>test<Slider size="medium" defaultValue={20}/></Label>',
        '<Label>test<SomeNesting><Slider size="medium" defaultValue={20}/></SomeNesting></Label>',
        '<Field label="Input"><Input /></Field>',
        '<Field label="Slider"><Slider defaultValue={25} /></Field>'
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
        },
        {
            code: '<><Label/><Slider size="medium" defaultValue={20}/></>',
            errors: [{ messageId: "missingLabelOnInput" }]
        },
        {
            code: '<><Label htmlFor="id"/><Slider size="medium" defaultValue={20} /></>',
            errors: [{ messageId: "missingLabelOnInput" }]
        },
        {
            code: '<Slider id="some-id"/>',
            errors: [{ messageId: "missingLabelOnInput" }]
        },
        {
            code: '<><Label>Some Label</Label><Slider id="some-id"/></>',
            errors: [{ messageId: "missingLabelOnInput" }]
        },
        {
            code: '<><Field></Field><Slider id="some-id"/></>',
            errors: [{ messageId: "missingLabelOnInput" }]
        },
        {
            code: "<><Field></Field><Input /></>",
            errors: [{ messageId: "missingLabelOnInput" }]
        }
    ]
});
