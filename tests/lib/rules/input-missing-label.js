// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

const { applicableComponents } = require("../../../lib/applicableComponents/inputBasedComponents");

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const RuleTester = require("eslint").RuleTester;

const rule = require("../../../lib/rules/input-missing-label");

RuleTester.setDefaultConfig({
    parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {
            jsx: true
        }
    }
});

//------------------------------------------------------------------------------
// Helper function to generate test cases
//------------------------------------------------------------------------------
function generateTestCases(componentName) {
    return {
        valid: [
            `<><Label htmlFor="some-id">Some Label</Label><${componentName} id="some-id"/></>`,
            `<><Label id="test-span">Some Label</Label><${componentName} id="some-id" aria-labelledby="test-span"/></>`,
            `<Label>test</Label>`,
            `<Label>test<${componentName} /></Label>`,
            `<Label>test<SomeNesting><${componentName} /></SomeNesting></Label>`,
            `<Field label="${componentName}"><${componentName} /></Field>`
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

const ruleTester = new RuleTester();
ruleTester.run("input-missing-label", rule, {
    valid: allTestCases.flatMap(test => test.valid),
    invalid: allTestCases.flatMap(test => test.invalid)
});
