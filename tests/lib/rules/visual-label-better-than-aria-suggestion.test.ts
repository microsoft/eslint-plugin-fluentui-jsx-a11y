// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Rule } from "eslint";
import ruleTester from "./helper/ruleTester";
import rule from "../../../lib/rules/visual-label-better-than-aria-suggestion";

import { applicableComponents } from "../../../lib/applicableComponents/buttonBasedComponents";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// Helper function to generate test cases
//------------------------------------------------------------------------------
const generateTestCases = (componentName: string) => {
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
};

// Collect all test cases for all applicable components
const allTestCases = applicableComponents.flatMap(component => generateTestCases(component));

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run("visual-label-better-than-aria-suggestion", rule as unknown as Rule.RuleModule, {
    valid: allTestCases.flatMap(test => test.valid),
    invalid: allTestCases.flatMap(test => test.invalid)
});
