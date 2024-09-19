// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

const { linkBasedComponents } = require("../../../lib/applicableComponents/linkBasedComponents");
const RuleTester = require("eslint").RuleTester;
const rule = require("../../../lib/rules/input-components-require-accessible-name");
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
                code: "<${componentName} />".replace("${componentName}", componentName),
                errors: [{ messageId: "missingHref" }, { messageId: "missingAriaLabel" }]
            } //,
            // {
            //     code: `<${componentName}><${imageName} src="img_girl.jpg" alt="The girl with the dog." /></${componentName}>`,
            //     errors: [{ messageId: "missingHref" }]
            // },
            // {
            //     code: `<${componentName} href="https://www.bing.com"><${imageName} src="img_girl.jpg" /></${componentName}>`,
            //     errors: [{ messageId: "missingAriaLabel" }]
            // },
            // {
            //     code: `<${componentName}><${imageName} src="img_girl.jpg" /></${componentName}>`,
            //     errors: [{ messageId: "missingHref" }, { messageId: "missingAriaLabel" }]
            // },
            // {
            //     code: `<${componentName} href="https://www.bing.com"><${imageName} src="img_girl.jpg" alt="" aria-hidden="true" /></${componentName}>`,
            //     errors: [{ messageId: "missingAriaLabel" }]
            // },
            // {
            //     code: `<${componentName} href="https://www.bing.com"><${imageName} src="img1.jpg" /><${imageName} src="img2.jpg" /></${componentName}>`,
            //     errors: [{ messageId: "missingAriaLabel" }]
            // }
        ]
    };
}

//------------------------------------------------------------------------------
// Define N sets of component and image names for generating test sets
//------------------------------------------------------------------------------
// Collect all test cases for link components and image components
const testCases = generateTestCases("Link", "Image");

//------------------------------------------------------------------------------
// Run tests for each test set
//------------------------------------------------------------------------------
const ruleTester = new RuleTester();

ruleTester.run("link-missing-labelling", rule, {
    valid: testCases.valid,
    invalid: testCases.invalid
});
