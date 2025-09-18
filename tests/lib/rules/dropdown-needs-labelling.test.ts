// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { Rule } from "eslint";
import ruleTester from "./helper/ruleTester";
import rule from "../../../lib/rules/dropdown-needs-labelling";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run("dropdown-needs-labelling", rule as unknown as Rule.RuleModule, {
    valid: [
        `<><Label htmlFor={comboId}>Best pet</Label> <Dropdown id={comboId} multiselect={true} placeholder="Select an animal" {...props} > {options.map((option) => ( <Option key={option} disabled={option === "Ferret"}> {option} </Option> ))}</Dropdown></>`,
        `<><Label id="my-dropdownid" /><Dropdown aria-labelledby="my-dropdownid" /></>`,

        // expression forms: binary concatenation and template literal (cover expression-literal forms)
        `<><Label id={"my-label" + 1}>Best pet</Label> <Dropdown aria-labelledby={"my-label" + 1} multiselect={true} placeholder="Select an animal" {...props} > {options.map((option) => ( <Option key={option} disabled={option === "Ferret"}> {option} </Option> ))}</Dropdown></>`,
        `<><Label id={\`my-label-\${value}\`}>Best pet</Label> <Dropdown aria-labelledby={\`my-label-\${value}\`} multiselect={true} placeholder="Select an animal" {...props} > {options.map((option) => ( <Option key={option} disabled={option === "Ferret"}> {option} </Option> ))}</Dropdown></>`,

        `<><Label id={comboId}>Best pet</Label> <Dropdown aria-labelledby={comboId} multiselect={true} placeholder="Select an animal" {...props} > {options.map((option) => ( <Option key={option} disabled={option === "Ferret"}> {option} </Option> ))}</Dropdown></>`,
        `<><Label id={comboId2}>This is a Dropdown</Label><Dropdown aria-labelledby={comboId2} /></>`,
        `<Dropdown aria-label="This is a Dropdown" />`,
        `<Label>This is a Dropdown <Dropdown/> </Label>`
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
        },
        {
            code: `<><Label htmlFor="id1">This is a Dropdown</Label><Dropdown aria-labelledby={id1} multiselect={true} placeholder="Select an animal" {...props} > {options.map((option) => ( <Option key={option} disabled={option === "Ferret"}> {option} </Option> ))}</Dropdown></>`,
            errors: [{ messageId: "missingLabelOrAriaLabeledByInDropdown" }]
        }
    ]
});
