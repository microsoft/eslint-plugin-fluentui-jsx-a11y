// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/compound-button-needs-labelling-v9"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("compound-button-needs-labelling-v9", rule, {
    valid: [
        '<CompoundButton aria-label="Compound Example" />',
        '<CompoundButton aria-label="Compound Example"></CompoundButton>',
        "<CompoundButton>Example</CompoundButton>",
        '<CompoundButton title="Compound Example"></CompoundButton>',
        '<CompoundButton secondaryContent="secondary content"></CompoundButton>',
        '<Tooltip content="Compound Example" relationship="label"><CompoundButton/></Tooltip>',
        '<><Label id="label-id-4">Compound Example</Label><CompoundButton aria-labelledby="label-id-4"></CompoundButton></>',
        '<><Label id="label-id-4">Compound Example</Label><CompoundButton aria-labelledby="label-id-4" /></>',
        '<><label id="label-id-4">Compound Example</label><CompoundButton aria-labelledby="label-id-4"></CompoundButton></>',
        '<><label id="label-id-4">Compound Example</label><CompoundButton aria-labelledby="label-id-4" /></>'
    ],
    invalid: [
        {
            code: "<CompoundButton></CompoundButton>",
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: "<CompoundButton />",
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: '<CompoundButton aria-labelledby="label-id-4"></CompoundButton>',
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: '<><Label id="label-id-4">Compound Example</Label><CompoundButton aria-labelledby="label-id-5" /></>',
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: "<><Label>Compound Example</Label><CompoundButton/></>",
            errors: [{ messageId: "missingAriaLabel" }]
        }
    ]
});
