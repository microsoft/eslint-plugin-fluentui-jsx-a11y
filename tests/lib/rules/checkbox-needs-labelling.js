// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const RuleTester = require("eslint").RuleTester;

const rule = require("../../../lib/rules/checkbox-needs-labelling");

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
ruleTester.run("checkbox-needs-labelling", rule, {
    valid: [
        "<><Label>This is a Checkbox<Checkbox checked={true} /></Label></>",
        `<><Label htmlFor="my-label-1">This is a Checkbox</Label><Checkbox id="my-label-1" checked={true} /></>`,
        `<Checkbox label="This is a Checkbox" checked={true} />`,
        `<Checkbox label="This is a Checkbox" checked={true}></Checkbox>`,
        `<><Label id="my-label-1">This is a Checkbox</Label><Checkbox aria-labelledby="my-label-1" checked={true} /></>`,
        `<><Label id="my-label-1">This is a Checkbox</Label><Checkbox aria-labelledby="my-label-1" checked={true}></Checkbox></>`,
        `<><Label id="my-label-1">This is a Checkbox</Label><Label id="my-label-3">This is a Checkbox</Label><Checkbox aria-labelledby="my-label-1" checked={true}></Checkbox></>`,
        `<><Label id="my-label-1">This is a Checkbox</Label><Image src={"https://msn.com"} /><Checkbox aria-labelledby="my-label-1" checked={true}></Checkbox></>`,
        '<Field label="Input"><Checkbox /></Field>'
    ],
    invalid: [
        {
            code: `<Checkbox checked={true} />`,
            errors: [{ messageId: "noUnlabelledCheckbox" }]
        },
        {
            code: `<><Label id="my-label-2">This is a Checkbox</Label><Checkbox aria-labelledby="my-label-1" checked={true} /></>`,
            errors: [{ messageId: "noUnlabelledCheckbox" }]
        },
        {
            code: `<><Label id="my-label-2">This is a Checkbox</Label><Checkbox aria-labelledby="my-label-1" checked={true}></Checkbox></>`,
            errors: [{ messageId: "noUnlabelledCheckbox" }]
        },
        {
            code: `<><Label id="my-label-1">This is a Checkbox</Label><Label id="my-label-3">This is a Checkbox</Label><Checkbox aria-labelledby="my-label-4" checked={true}></Checkbox></>`,
            errors: [{ messageId: "noUnlabelledCheckbox" }]
        },
        {
            code: "<><Field></Field><Checkbox /></>",
            errors: [{ messageId: "noUnlabelledCheckbox" }]
        }
    ]
});
