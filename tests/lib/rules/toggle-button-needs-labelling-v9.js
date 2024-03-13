// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/toggle-button-needs-labelling-v9"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("toggle-button-needs-labelling-v9", rule, {
    valid: [
        '<ToggleButton aria-label="Toggle Example" />',
        '<ToggleButton aria-label="Toggle Example"></ToggleButton>',
        "<ToggleButton>Example</ToggleButton>",
        '<ToggleButton title="Toggle Example"></ToggleButton>',
        '<Tooltip content="Toggle Example" relationship="label"><ToggleButton/></Tooltip>',
        '<><Label id="label-id-4">Toggle Example</Label><ToggleButton aria-labelledby="label-id-4"></ToggleButton></>',
        '<><Label id="label-id-4">Toggle Example</Label><ToggleButton aria-labelledby="label-id-4" /></>',
        '<><label id="label-id-4">Toggle Example</label><ToggleButton aria-labelledby="label-id-4"></ToggleButton></>',
        '<><label id="label-id-4">Toggle Example</label><ToggleButton aria-labelledby="label-id-4" /></>'
    ],
    invalid: [
        {
            code: "<ToggleButton></ToggleButton>",
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: "<ToggleButton />",
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: '<ToggleButton aria-labelledby="label-id-4"></ToggleButton>',
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: '<><Label id="label-id-4">Toggle Example</Label><ToggleButton aria-labelledby="label-id-5" /></>',
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: "<><Label>Toggle Example</Label><ToggleButton/></>",
            errors: [{ messageId: "missingAriaLabel" }]
        }
    ]
});

