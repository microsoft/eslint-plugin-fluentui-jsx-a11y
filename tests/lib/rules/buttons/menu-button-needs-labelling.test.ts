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
        // MenuButton with text content
        `<MenuButton>Menu</MenuButton>`,
        // MenuButton with aria-label
        `<MenuButton aria-label="Open menu" />`,
        // MenuButton with aria-labelledby
        `<><Label id="menu-label">Options</Label><MenuButton aria-labelledby="menu-label" /></>`,
        // MenuButton wrapped in Label
        `<label>Options<MenuButton /></label>`,
        // MenuButton wrapped in Tooltip
        `<Tooltip content="Menu options" relationship="label"><MenuButton /></Tooltip>`,
        // MenuButton with labeled child
        `<MenuButton><img alt="Menu icon" /></MenuButton>`,
        // MenuButton with Icon child
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
