// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { Rule } from "eslint";
import ruleTester from "./helper/ruleTester";
import rule from "../../../lib/rules/avatar-needs-name";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run("avatar-needs-name", rule as unknown as Rule.RuleModule, {
    valid: [
        // give me some code that won't trigger a warning
        '<Avatar name="Jane Doe" />',
        '<Avatar aria-label="Jane Doe" />',
        '<><Label id="label-id">Jane Doe</Label><Avatar aria-labelledby="label-id" /></>',
        '<Avatar name="Jane Doe"></Avatar>',
        '<Avatar aria-label="Jane Doe"></Avatar>',
        '<><Label id="label-id">Jane Doe</Label><Avatar aria-labelledby="label-id"></Avatar></>'
    ],

    invalid: [
        {
            code: "<Avatar />",
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: "<Avatar></Avatar>",
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: "<Avatar icon={<CloseIcon />}></Avatar>",
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: "<Avatar icon={<CloseIcon />} />",
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: '<Avatar image={{ src: "example-image" }}></Avatar>',
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: '<Avatar image={{ src: "example-image" }} />',
            errors: [{ messageId: "missingAriaLabel" }]
        }
    ]
});
