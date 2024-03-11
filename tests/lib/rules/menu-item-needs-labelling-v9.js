// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/menu-item-needs-labelling-v9"),
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
ruleTester.run("menuitem-needs-labelling-v9", rule, {
    valid: [
        // Valid cases
        '<MenuItem aria-label="Settings" icon={<SettingsIcon />} onClick={handleClick}>Settings</MenuItem>',
        '<div><label id="my-label">More option</label><MenuItem aria-labelledby="my-label" icon={<SettingsIcon />} onClick={handleClick}>Settings</MenuItem></div>',
        '<div><label htmlFor="my-input">More option</label><MenuItem id="my-input" icon={<SettingsIcon />} onClick={handleClick}>Settings</MenuItem></div>',
        "<div><Label htmlFor={myInputId}>More option</Label><MenuItem id={myInputId} icon={<SettingsIcon />} onClick={handleClick}>Settings</MenuItem></div>"
    ],
    invalid: [
        // Invalid cases
        {
            code: "<MenuItem icon={<SettingsIcon />} onClick={handleClick}>Settings</MenuItem>",
            errors: [{ messageId: "noUnlabelledMenuItem" }]
        },
        {
            code: "<div><label>Settings</label><MenuItem icon={<SettingsIcon />} onClick={handleClick}>Settings</MenuItem></div>",
            errors: [{ messageId: "noUnlabelledMenuItem" }]
        },
        {
            code: '<div><label htmlFor="my-label2">Settings</label><MenuItem id="my-menuitem" icon={<SettingsIcon />} onClick={handleClick}>Settings</MenuItem></div>',
            errors: [{ messageId: "noUnlabelledMenuItem" }]
        }
    ]
});
