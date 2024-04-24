// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/combobox-needs-labelling-v9"),
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
ruleTester.run("combobox-needs-labelling-v9", rule, {
    valid: [
        // give me some code that won't trigger a warning
        '<Combobox aria-label="Best pet" placeholder="Select an animal" {...props}><Option>{"Cat"}</Option></Combobox>',
        '<label>Best pet<Combobox placeholder="Select an animal" {...props}><Option>{"Cat"}</Option></Combobox></label>',
        '<Label>Best pet<Combobox placeholder="Select an animal" {...props}><Option>{"Cat"}</Option></Combobox></Label>',
        '<div><label id="my-label">Best pet</label><Combobox aria-labelledby="my-label" placeholder="Select an animal" {...props}><Option>{"Cat"}</Option></Combobox></div>',
        '<div><Label id="my-label">Best pet</Label><Combobox aria-labelledby="my-label" placeholder="Select an animal" {...props}><Option>{"Cat"}</Option></Combobox></div>',
        // '<div><Label id={"my-label"}>Best pet</Label><Combobox aria-labelledby={"my-label"} placeholder="Select an animal" {...props}><Option>{"Cat"}</Option></Combobox></div>', // TODO: modify regular expression
        '<div><label htmlFor="my-input">Best pet</label><Combobox id="my-input" placeholder="Select an animal" {...props}><Option>{"Cat"}</Option></Combobox></div>',
        '<div><Label htmlFor="my-input">Best pet</Label><Combobox id="my-input" placeholder="Select an animal" {...props}><Option>{"Cat"}</Option></Combobox></div>',
        '<div><Label htmlFor={myInputId}>Best pet</Label><Combobox id={myInputId} placeholder="Select an animal" {...props}><Option>{"Cat"}</Option></Combobox></div>',
        '<Field label="Slider"><Combobox /></Field>'
    ],
    invalid: [
        {
            code: '<div><label>Best pet</label><Combobox placeholder="Select an animal" {...props}><Option>{"Cat"}</Option></Combobox></div>',
            errors: [{ messageId: "noUnlabelledCombobox" }]
        },
        {
            code: '<div><label htmlFor="my-label2">Best pet</label><Combobox id="my-combobox" placeholder="Select an animal" {...props}><Option>{"Cat"}</Option></Combobox></div>',
            errors: [{ messageId: "noUnlabelledCombobox" }]
        },
        {
            code: "<><Field></Field><Combobox /></>",
            errors: [{ messageId: "noUnlabelledCombobox" }]
        }
    ]
});

