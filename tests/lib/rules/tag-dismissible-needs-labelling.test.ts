// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Rule } from "eslint";
import ruleTester from "./helper/ruleTester";
import rule from "../../../lib/rules/tag-dismissible-needs-labelling";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
ruleTester.run("tag-dismissible-needs-labelling", rule as unknown as Rule.RuleModule, {
    valid: [
        // Valid cases for dismissible Tag component
        // Non-dismissible tags should be ignored
        "<Tag>Regular tag</Tag>",
        '<Tag icon={<SettingsIcon />}>Tag with icon</Tag>',
        
        // Dismissible tags with proper labelling
        '<Tag dismissible dismissIcon={{ "aria-label": "remove" }}>Dismissible tag</Tag>',
        '<Tag dismissible dismissIcon={{ "aria-label": "close" }} icon={<CalendarMonthRegular />}>Tag with icon</Tag>'
    ],

    invalid: [
        // Invalid cases for dismissible Tag component
        {
            code: '<Tag dismissible>Dismissible tag</Tag>',
            errors: [{ messageId: "missingDismissLabel" }]
        },
        {
            code: '<Tag dismissible dismissIcon={{}}>Dismissible tag</Tag>',
            errors: [{ messageId: "missingDismissLabel" }]
        },
        {
            code: '<Tag dismissible dismissIcon={{ "aria-label": "" }}>Dismissible tag</Tag>',
            errors: [{ messageId: "missingDismissLabel" }]
        }
    ]
});
