// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

const { applicableComponents } = require("../../../lib/applicableComponents/buttonBasedComponents");

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const RuleTester = require("eslint").RuleTester;

const rule = require("../../../lib/rules/visual-label-better-than-aria-suggestion");

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
            `<Label>test<${componentName} /></Label>`,
            `<><Label id="id1">This is the visual label</Label><${componentName} aria-labelledby="id1" /></>`
        ],
        invalid: [
            {
                code: `<${componentName} aria-label="This is a component with aria-label" />`,
                errors: [{ messageId: "visualLabelSuggestion" }]
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
ruleTester.run("visual-label-better-than-aria-suggestion", rule, {
    valid: allTestCases.flatMap(test => test.valid),
    invalid: allTestCases.flatMap(test => test.invalid)
});
