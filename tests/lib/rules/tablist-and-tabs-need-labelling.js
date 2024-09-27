// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/tablist-and-tabs-need-labelling"),
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
ruleTester.run("tablist-and-tabs-need-labelling", rule, {
    valid: [
        // Valid cases for Tablist
        '<Tablist aria-label="settings"><Tab>Settings Tab</Tab></Tablist>',
        '<Tablist aria-labelledby="tablist-settings"><Label id="tablist-settings">Settings Label</Label><Tab>Settings Tab</Tab></Tablist>',
    
        // Valid cases
        '<Tab icon={<SettingsIcon />} aria-label="Settings" />',
        '<Tab icon={<SettingsIcon />}>Settings</Tab>',
        '<Tab>Settings</Tab>',
    ],

    invalid: [
        // Invalid cases for Tablist
        {
            code: '<Tablist><Tab>Settings Tab</Tab></Tablist>',
            errors: [{ messageId: "missingTablistLabel" }]
        },
        {
            code: '<Tablist><Label id="tablist-settings">Settings Label</Label><Tab>Settings Tab</Tab></Tablist>',
            errors: [{ messageId: "missingTablistLabel" }]
        },
        {
            code: '<Tablist><Label>Settings Label</Label><Tab>Settings Tab</Tab></Tablist>',
            errors: [{ messageId: "missingTablistLabel" }]
        },
        
        // Invalid cases for Tab
        {
            code: '<Tab icon={<SettingsIcon />} />',
            errors: [{ messageId: "missingTabLabel" }]
        },
        {
            code: '<Tab icon={<SettingsIcon />}></Tab>',
            errors: [{ messageId: "missingTabLabel" }]
        },
    ]
});
