// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const RuleTester = require("eslint").RuleTester;

const rule = require("../../../lib/rules/dropdown-needs-arialabeledby-and-label-v9");

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
ruleTester.run("dropdown-needs-arialabeledby-and-label-v9", rule, {
    valid: [
        `<><Label id={comboId}>Best pet</Label> <Dropdown aria-labelledby={comboId} multiselect={true} placeholder="Select an animal" {...props} > {options.map((option) => ( <Option key={option} disabled={option === "Ferret"}> {option} </Option> ))}</Dropdown></>`,
        `<><Label id={comboId2}>This is a Dropdown</Label><Dropdown aria-labelledby={comboId2} /></>`
    ],
    invalid: [
        {
            code: `<Dropdown multiselect={true} placeholder="Select an animal" {...props} > {options.map((option) => ( <Option key={option} disabled={option === "Ferret"}> {option} </Option> ))}</Dropdown>`,
            errors: [{ messageId: "missingLabelOrAriaLabeledByInDropdown" }]
        },
        {
            code: `<Dropdown aria-labelledby={comboId} multiselect={true} placeholder="Select an animal" {...props} > {options.map((option) => ( <Option key={option} disabled={option === "Ferret"}> {option} </Option> ))}</Dropdown>`,
            errors: [{ messageId: "missingLabelOrAriaLabeledByInDropdown" }]
        },
        {
            code: `<><Label>This is a Dropdown</Label><Dropdown aria-labelledby={comboId} multiselect={true} placeholder="Select an animal" {...props} > {options.map((option) => ( <Option key={option} disabled={option === "Ferret"}> {option} </Option> ))}</Dropdown></>`,
            errors: [{ messageId: "missingLabelOrAriaLabeledByInDropdown" }]
        },
        {
            code: `<><Label id="another-id">This is a Dropdown</Label><Dropdown aria-labelledby={comboId} multiselect={true} placeholder="Select an animal" {...props} > {options.map((option) => ( <Option key={option} disabled={option === "Ferret"}> {option} </Option> ))}</Dropdown></>`,
            errors: [{ messageId: "missingLabelOrAriaLabeledByInDropdown" }]
        }
    ]
});
