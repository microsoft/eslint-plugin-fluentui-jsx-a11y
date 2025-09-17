// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Rule } from "eslint";
import ruleTester from "./helper/ruleTester";
import rule from "../../../lib/rules/tag-needs-name";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run("tag-needs-name", rule as unknown as Rule.RuleModule, {
    valid: [
        // Valid cases for Tag component
        "<Tag>Tag with some text</Tag>",
        "<Tag>Some text</Tag>",
        '<Tag aria-label="Accessible tag name"></Tag>',
        '<Tag aria-label="Tag label">Some text</Tag>',
        '<Tag icon={<SettingsIcon />}>Tag with icon and text</Tag>',
        '<Tag icon={<SettingsIcon />} aria-label="Settings tag"></Tag>'
    ],

    invalid: [
        // Invalid cases for Tag component
        {
            code: "<Tag></Tag>",
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: "<Tag />",
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: '<Tag aria-label=""></Tag>',
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: '<Tag icon={<SettingsIcon />}></Tag>',
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: '<Tag icon={<SettingsIcon />} />',
            errors: [{ messageId: "missingAriaLabel" }]
        }
    ]
});
