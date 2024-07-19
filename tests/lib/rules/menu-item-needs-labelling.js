// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/menu-item-needs-labelling"),
    RuleTester = require("eslint").RuleTester;

RuleTester.setDefaultConfig({
    parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {
            jsx: true
        }
    }
});

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("menuitem-needs-labelling", rule, {
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
