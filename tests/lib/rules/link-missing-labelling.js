// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

const { linkBasedComponents } = require("../../../lib/applicableComponents/linkBasedComponents");
const RuleTester = require("eslint").RuleTester;
const rule = require("../../../lib/rules/link-missing-labelling");
const { fluentImageComponents, imageDomNodes } = require("../../../lib/applicableComponents/imageBasedComponents");

RuleTester.setDefaultConfig({
    parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {
            jsx: true
        }
    }
});

//------------------------------------------------------------------------------
// Helper function to generate test cases with abstracted Link and Image components
//------------------------------------------------------------------------------
function generateTestCases(componentName, imageName) {
    return {
        valid: [
            // Valid cases
            `<${componentName} href="https://www.bing.com">This is a link</${componentName}>`,
            `<${componentName} href="https://www.bing.com">This is a link<${imageName} src="img_girl.jpg" alt="" /></${componentName}>`,
            `<${componentName} href="https://www.bing.com">This is a link<${imageName} src="img_girl.jpg" alt="" aria-hidden="true" /></${componentName}>`,
            `<${componentName} href="https://www.bing.com"><${imageName} src="img_girl.jpg" alt="The girl with the dog." /></${componentName}>`,
            `<${componentName} href="https://www.bing.com"><${imageName} src="img_girl.jpg" aria-label="The girl with the dog." /></${componentName}>`,
            `<${componentName} href="https://www.bing.com" aria-label="The girl with the dog."><${imageName} src="img_girl.jpg" /></${componentName}>`,
            `<${componentName} href="https://www.bing.com" title="The girl with the dog."><${imageName} src="img_girl.jpg" /></${componentName}>`,
            `<><Label id="my-label-2">This is a Header</Label><${componentName} href="https://www.bing.com" aria-labelledby="my-label-2"><${imageName} src="img_girl.jpg" /></${componentName}></>`,
            `<${componentName} href="https://www.bing.com"><${imageName} src="img1.jpg" /><${imageName} src="img2.jpg" alt="The girl with the dog." /></${componentName}>`
        ],
        invalid: [
            // Invalid cases
            {
                code: `<${componentName} />`,
                errors: [{ messageId: "missingHref" }, { messageId: "missingAriaLabel" }]
            },
            {
                code: `<${componentName}><${imageName} src="img_girl.jpg" alt="The girl with the dog." /></${componentName}>`,
                errors: [{ messageId: "missingHref" }]
            },
            {
                code: `<${componentName} href="https://www.bing.com"><${imageName} src="img_girl.jpg" /></${componentName}>`,
                errors: [{ messageId: "missingAriaLabel" }]
            },
            {
                code: `<${componentName}><${imageName} src="img_girl.jpg" /></${componentName}>`,
                errors: [{ messageId: "missingHref" }, { messageId: "missingAriaLabel" }]
            },
            {
                code: `<${componentName} href="https://www.bing.com"><${imageName} src="img_girl.jpg" alt="" aria-hidden="true" /></${componentName}>`,
                errors: [{ messageId: "missingAriaLabel" }]
            },
            {
                code: `<${componentName} href="https://www.bing.com"><${imageName} src="img1.jpg" /><${imageName} src="img2.jpg" /></${componentName}>`,
                errors: [{ messageId: "missingAriaLabel" }]
            }
        ]
    };
}

//------------------------------------------------------------------------------
// Define N sets of component and image names for generating test sets
//------------------------------------------------------------------------------
// Collect all test cases for link components and image components
function generateAllTestCases() {
    const testSets = [];

    // For each link-based component, generate test cases for each fluent image component
    linkBasedComponents.forEach(linkComponent => {
        fluentImageComponents.forEach(imageComponent => {
            testSets.push(generateTestCases(linkComponent, imageComponent));
        });

        // Also generate test cases for each native DOM image node (e.g., img, svg)
        imageDomNodes.forEach(imageComponent => {
            testSets.push(generateTestCases(linkComponent, imageComponent));
        });
    });

    return testSets;
}

const allTestCases = generateAllTestCases();

//------------------------------------------------------------------------------
// Run tests for each test set
//------------------------------------------------------------------------------
const ruleTester = new RuleTester();

allTestCases.forEach((testCaseSet, index) => {
    ruleTester.run(`link-missing-labelling test set ${index + 1}`, rule, {
        valid: testCaseSet.valid,
        invalid: testCaseSet.invalid
    });
});