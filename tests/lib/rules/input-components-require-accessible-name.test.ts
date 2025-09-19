// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { Rule } from "eslint";
import ruleTester from "./helper/ruleTester";
import rule from "../../../lib/rules/input-components-require-accessible-name";
import { applicableComponents } from "../../../lib/applicableComponents/inputBasedComponents";
import { labelBasedComponents, elementsUsedAsLabels } from "../../../lib/applicableComponents/labelBasedComponents";

//------------------------------------------------------------------------------
// Helper function to generate test cases
//------------------------------------------------------------------------------
function generateTestCases(labelComponent: string, componentName: string) {
    return {
        valid: [
            `<><${labelComponent} id="test-span">Some Label</${labelComponent}><${componentName} id="some-id" aria-labelledby="test-span"/></>`,
            // expression forms: binary concatenation and template literal (cover expression-literal forms)
            "<><" +
                labelComponent +
                ' id={"my-label" + 1}>Some Label</' +
                labelComponent +
                "><" +
                componentName +
                ' aria-labelledby={"my-label" + 1}/></>',
            "<><" +
                labelComponent +
                " id={`my-label-${value}`}>Some Label</" +
                labelComponent +
                "><" +
                componentName +
                " aria-labelledby={`my-label-${value}`}/></>"
        ],
        invalid: [
            {
                code: `<><${labelComponent} id="test-span-2">Some Label</${labelComponent}><${componentName} id="some-id" aria-labelledby="test-span"/></>`,
                errors: [{ messageId: "missingLabelOnInput" }]
            }
        ]
    };
}

function generateTestCasesLabel(labelComponent: string, componentName: string) {
    return {
        valid: [
            `<><${labelComponent} htmlFor="some-id">Some Label</${labelComponent}><${componentName} id="some-id"/></>`,
            `<><${labelComponent} id="test-span">Some Label</${labelComponent}><${componentName} id="some-id" aria-labelledby="test-span"/></>`,
            `<${labelComponent}>test</${labelComponent}>`,
            `<${labelComponent}>test<${componentName} /></${labelComponent}>`,
            `<${labelComponent}>test<SomeNesting><${componentName} /></SomeNesting></${labelComponent}>`,
            `<Field label="this is my label"><${componentName} /></Field>`,
            `<${componentName} aria-label="this is my component" />`,
            `<><${labelComponent} id="paragraph_label-2">type here</${labelComponent}><${componentName} aria-labelledby="paragraph_label-2"></${componentName}><${labelComponent} id="paragraph_label-3">type here</${labelComponent}><${componentName} aria-labelledby="paragraph_label-3"></${componentName}></>`,
            // expression forms for htmlFor/id pairing
            "<><" +
                labelComponent +
                ' htmlFor={"my-input" + 1}>Some Label</' +
                labelComponent +
                "><" +
                componentName +
                ' id={"my-input" + 1}/></>',
            "<><" +
                labelComponent +
                " htmlFor={`my-input-${value}`}>Some Label</" +
                labelComponent +
                "><" +
                componentName +
                " id={`my-input-${value}`}/></>"
        ],
        invalid: [
            {
                code: `<><${componentName}/></>`,
                errors: [{ messageId: "missingLabelOnInput" }]
            },
            {
                code: `<><${labelComponent}/><${componentName}/></>`,
                errors: [{ messageId: "missingLabelOnInput" }]
            },
            {
                code: `<><${labelComponent} htmlFor="id"/><${componentName} /></>`,
                errors: [{ messageId: "missingLabelOnInput" }]
            },
            {
                code: `<${componentName} id="some-id"/>`,
                errors: [{ messageId: "missingLabelOnInput" }]
            },
            {
                code: `<><${labelComponent}>Some Label</${labelComponent}><${componentName} id="some-id"/></>`,
                errors: [{ messageId: "missingLabelOnInput" }]
            },
            {
                code: `<><Field></Field><${componentName} id="some-id"/></>`,
                errors: [{ messageId: "missingLabelOnInput" }]
            }
        ]
    };
}

function generateAllTestCases() {
    const testSets: any[] = [];

    // For each input-based component, generate test cases

    applicableComponents.forEach(components => {
        elementsUsedAsLabels.forEach(labels => {
            testSets.push(generateTestCases(labels, components));
        });

        // Also generate test cases for each native DOM element
        labelBasedComponents.forEach(labels => {
            testSets.push(generateTestCasesLabel(labels, components));
        });
    });

    return testSets;
}

// Collect all test cases for all applicable components
const allTestCases = generateAllTestCases();

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
allTestCases.forEach((testCaseSet, index) => {
    ruleTester.run(`input-missing-label test set ${index + 1}`, rule as unknown as Rule.RuleModule, {
        valid: testCaseSet.valid,
        invalid: testCaseSet.invalid
    });
});
