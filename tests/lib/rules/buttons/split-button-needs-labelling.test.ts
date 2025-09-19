// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { Rule } from "eslint";
import ruleTester from "../helper/ruleTester";
import rule from "../../../../lib/rules/buttons/split-button-needs-labelling";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run("split-button-needs-labelling", rule as unknown as Rule.RuleModule, {
    valid: [
        // SplitButton with text content
        `<SplitButton>Save</SplitButton>`,
        // SplitButton with aria-label
        `<SplitButton aria-label="Save options" />`,
        // SplitButton with aria-labelledby
        `<><Label id="save-label">Save</Label><SplitButton aria-labelledby="save-label" /></>`,
        // SplitButton wrapped in Label
        `<label>Save<SplitButton /></label>`,
        // SplitButton wrapped in Tooltip
        `<Tooltip content="Save with options" relationship="label"><SplitButton /></Tooltip>`,
        // SplitButton with labeled child
        `<SplitButton><img alt="Save icon" /></SplitButton>`,
        // SplitButton with Icon child
        `<SplitButton><SaveIcon /></SplitButton>`
    ],
    invalid: [
        {
            code: `<SplitButton />`,
            errors: [{ messageId: "splitButtonNeedsLabelling" }]
        },
        {
            code: `<SplitButton></SplitButton>`,
            errors: [{ messageId: "splitButtonNeedsLabelling" }]
        },
        {
            code: `<SplitButton aria-label="" />`,
            errors: [{ messageId: "splitButtonNeedsLabelling" }]
        },
        {
            code: `<><Label id="wrong-id">Save</Label><SplitButton aria-labelledby="save-label" /></>`,
            errors: [{ messageId: "splitButtonNeedsLabelling" }]
        }
    ]
});
