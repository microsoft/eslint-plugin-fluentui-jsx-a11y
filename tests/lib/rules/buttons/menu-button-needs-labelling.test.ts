// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { Rule } from "eslint";
import ruleTester from "../helper/ruleTester";
import rule from "../../../../lib/rules/buttons/menu-button-needs-labelling";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run("menu-button-needs-labelling", rule as unknown as Rule.RuleModule, {
    valid: [
        `<MenuButton aria-label="Menu options" />`,
        `<MenuButton>Options</MenuButton>`,
        `<><Label id="menu-label">Menu</Label><MenuButton aria-labelledby="menu-label" /></>`,
        `<Tooltip content="Menu options" relationship="label"><MenuButton /></Tooltip>`,
        `<MenuButton><img alt="Menu icon" /></MenuButton>`,
        `<MenuButton><MenuIcon /></MenuButton>`
    ],
    invalid: [
        {
            code: `<MenuButton />`,
            errors: [{ messageId: "menuButtonNeedsLabelling" }]
        },
        {
            code: `<MenuButton></MenuButton>`,
            errors: [{ messageId: "menuButtonNeedsLabelling" }]
        },
        {
            code: `<MenuButton aria-label="" />`,
            errors: [{ messageId: "menuButtonNeedsLabelling" }]
        },
        {
            code: `<><Label id="wrong-id">Options</Label><MenuButton aria-labelledby="menu-label" /></>`,
            errors: [{ messageId: "menuButtonNeedsLabelling" }]
        }
    ]
});
