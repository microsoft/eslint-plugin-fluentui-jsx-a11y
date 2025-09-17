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
        "<Tag icon={<SettingsIcon />}>Tag with icon</Tag>",
        // Option 1: dismissIcon with aria-label
        '<Tag dismissible dismissIcon={{ "aria-label": "remove" }}>Dismissible tag</Tag>',
        '<Tag dismissible dismissIcon={{ "aria-label": "close" }} icon={<CalendarMonthRegular />}>Tag with icon</Tag>',
        // Option 2: Tag with aria-label and dismissIcon with role
        '<Tag dismissible aria-label="Dismissible tag" dismissIcon={{ role: "presentation" }}>Dismissible tag</Tag>'
    ],

    invalid: [
        // Invalid cases for dismissible Tag component
        {
            code: "<Tag dismissible>Dismissible tag</Tag>",
            errors: [{ messageId: "missingDismissLabel" }]
        },
        {
            code: "<Tag dismissible dismissIcon={{}}>Dismissible tag</Tag>",
            errors: [{ messageId: "missingDismissLabel" }]
        },
        {
            code: '<Tag dismissible dismissIcon={{ "aria-label": "" }}>Dismissible tag</Tag>',
            errors: [{ messageId: "missingDismissLabel" }]
        },
        // Missing aria-label on Tag when dismissIcon has role
        {
            code: '<Tag dismissible dismissIcon={{ role: "presentation" }}>Dismissible tag</Tag>',
            errors: [{ messageId: "missingDismissLabel" }]
        },
        // Empty aria-label on Tag with dismissIcon role
        {
            code: '<Tag dismissible aria-label="" dismissIcon={{ role: "presentation" }}>Dismissible tag</Tag>',
            errors: [{ messageId: "missingDismissLabel" }]
        },
        // Tag has aria-label but dismissIcon has empty role
        {
            code: '<Tag dismissible aria-label="Dismissible tag" dismissIcon={{ role: "" }}>Dismissible tag</Tag>',
            errors: [{ messageId: "missingDismissLabel" }]
        }
    ]
});
