// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { Rule } from "eslint";
import ruleTester from "./helper/ruleTester";
import rule from "../../../lib/rules/rating-needs-name";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run("rating-needs-name", rule as unknown as Rule.RuleModule, {
    valid: [
        // give me some code that won't trigger a warning
        "<Rating itemLabel={itemLabel} />",
        '<Rating name="Rating" />',
        '<Rating aria-label="Rating" />',
        '<><Label id="label-id">Rating</Label><Rating aria-labelledby="label-id" /></>',
        "<Rating itemLabel={itemLabel}></Rating>",
        '<Rating name="Rating"></Rating>',
        '<Rating aria-label="Rating"></Rating>',
        '<><Label id="label-id">Rating</Label><Rating aria-labelledby="label-id"></Rating></>'
    ],

    invalid: [
        {
            code: "<Rating />",
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: "<Rating></Rating>",
            errors: [{ messageId: "missingAriaLabel" }]
        }
    ]
});
