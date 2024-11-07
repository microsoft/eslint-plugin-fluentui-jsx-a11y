// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { Rule } from "eslint";
import ruleTester from "./helper/ruleTester";
import rule from "../../../lib/rules/input-components-require-accessible-name";
import { applicableComponents } from "../../../lib/applicableComponents/inputBasedComponents";

//------------------------------------------------------------------------------
// Helper function to generate test cases
//------------------------------------------------------------------------------
function generateTestCases(componentName: string) {
    return {
        valid: [
            `<><Label htmlFor="some-id">Some Label</Label><${componentName} id="some-id"/></>`,
            `<><Label id="test-span">Some Label</Label><${componentName} id="some-id" aria-labelledby="test-span"/></>`,
            `<Label>test</Label>`,
            `<Label>test<${componentName} /></Label>`,
            `<Label>test<SomeNesting><${componentName} /></SomeNesting></Label>`,
            `<Field label="${componentName}"><${componentName} /></Field>`,
            `<${componentName} aria-label="this is my component" />`
        ],
        invalid: [
            {
                code: `<><${componentName}/></>`,
                errors: [{ messageId: "missingLabelOnInput" }]
            },
            {
                code: `<><Label/><${componentName}/></>`,
                errors: [{ messageId: "missingLabelOnInput" }]
            },
            {
                code: `<><Label htmlFor="id"/><${componentName} /></>`,
                errors: [{ messageId: "missingLabelOnInput" }]
            },
            {
                code: `<${componentName} id="some-id"/>`,
                errors: [{ messageId: "missingLabelOnInput" }]
            },
            {
                code: `<><Label>Some Label</Label><${componentName} id="some-id"/></>`,
                errors: [{ messageId: "missingLabelOnInput" }]
            },
            {
                code: `<><Field></Field><${componentName} id="some-id"/></>`,
                errors: [{ messageId: "missingLabelOnInput" }]
            }
        ]
    };
}

// Collect all test cases for all applicable components
const allTestCases = applicableComponents.flatMap(component => generateTestCases(component));

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run("input-missing-label", rule as unknown as Rule.RuleModule, {
    valid: allTestCases.flatMap(test => test.valid),
    invalid: allTestCases.flatMap(test => test.invalid)
});
