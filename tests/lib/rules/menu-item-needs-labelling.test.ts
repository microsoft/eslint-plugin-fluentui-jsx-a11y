// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { Rule } from "eslint";
import ruleTester from "./helper/ruleTester";
import rule from "../../../lib/rules/menu-item-needs-labelling";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run("menuitem-needs-labelling", rule as unknown as Rule.RuleModule, {
    valid: [
        // Valid cases
        '<MenuItem aria-label="Settings" icon={<SettingsIcon />} onClick={handleClick}></MenuItem>',
        "<MenuItem>Settings</MenuItem>",
        '<div><label id="my-label">More option</label><MenuItem aria-labelledby="my-label"></MenuItem></div>',
        '<div><Label id="my-label">More option</Label><MenuItem aria-labelledby="my-label" icon={<SettingsIcon />} onClick={handleClick}>Settings</MenuItem></div>',
        '<Tooltip content="menu item" relationship="label"><SpinButton/></Tooltip>'
    ],
    invalid: [
        // Invalid cases
        {
            code: "<MenuItem/>",
            errors: [{ messageId: "noUnlabelledMenuItem" }]
        },
        {
            code: "<MenuItem icon={<SettingsIcon />} onClick={handleClick}></MenuItem>",
            errors: [{ messageId: "noUnlabelledMenuItem" }]
        },
        {
            code: "<div><label>Settings</label><MenuItem icon={<SettingsIcon />} onClick={handleClick}></MenuItem></div>",
            errors: [{ messageId: "noUnlabelledMenuItem" }]
        },
        {
            code: "<label>Settings<MenuItem icon={<SettingsIcon />} onClick={handleClick}></MenuItem></label>",
            errors: [{ messageId: "noUnlabelledMenuItem" }]
        }
    ]
});
