// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/spin-button-needs-labelling-v9"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("spin-button-needs-labelling-v9", rule, {
    valid: [
        "<><Label>This is a SpinButton<SpinButton checked={true} /></Label></>",
        `<SpinButton label="This is a spin button" checked={true} />`,
        `<SpinButton label="This is a spin button" checked={true}></SpinButton>`,
        `<><Label htmlFor="my-label-1">This is a spin button</Label><SpinButton id="my-label-1" checked={true} /></>`,
        `<><Label id="my-label-1">This is a spin button</Label><SpinButton aria-labelledby="my-label-1" checked={true} /></>`,
        `<><Label id="my-label-1">This is a spin button</Label><SpinButton aria-labelledby="my-label-1" checked={true}></SpinButton></>`,
        `<><Label id="my-label-1">This is a spin button</Label><Label id="my-label-3">This is a spin button</Label><SpinButton aria-labelledby="my-label-1" checked={true}></SpinButton></>`,
        `<><Label id="my-label-1">This is a spin button</Label><Image src={"https://msn.com"} /><SpinButton aria-labelledby="my-label-1" checked={true}></SpinButton></>`
    ],
    invalid: [
        {
            code: `<SpinButton checked={true} />`,
            errors: [{ messageId: "noUnlabelledSpinButton" }]
        },
        {
            code: `<><Label id="my-label-2">This is a spin button</Label><SpinButton aria-labelledby="my-label-1" checked={true} /></>`,
            errors: [{ messageId: "noUnlabelledSpinButton" }]
        },
        {
            code: `<><Label id="my-label-2">This is a spin button</Label><SpinButton aria-labelledby="my-label-1" checked={true}></SpinButton></>`,
            errors: [{ messageId: "noUnlabelledSpinButton" }]
        },
        {
            code: `<><Label id="my-label-1">This is a spin button</Label><Label id="my-label-3">This is a spin button</Label><SpinButton aria-labelledby="my-label-4" checked={true}></SpinButton></>`,
            errors: [{ messageId: "noUnlabelledSpinButton" }]
        }
    ]
});

