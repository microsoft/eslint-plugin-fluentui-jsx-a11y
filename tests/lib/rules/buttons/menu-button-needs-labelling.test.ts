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
        // MenuButton with aria-label
        `<MenuButton aria-label="Menu options" />`,
        // MenuButton with text content
        `<MenuButton>Options</MenuButton>`,
        // MenuButton with aria-labelledby that references existing element
        `<><Label id="menu-label">Menu</Label><MenuButton aria-labelledby="menu-label" /></>`,
        // MenuButton wrapped in Tooltip
        `<Tooltip content="Menu options" relationship="label"><MenuButton /></Tooltip>`
        // TODO: Uncomment when hasLabeledChild is implemented
        // MenuButton with labeled child
        // `<MenuButton><img alt="Menu icon" /></MenuButton>`,
        // MenuButton with Icon child
        // `<MenuButton><MenuIcon /></MenuButton>`
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
