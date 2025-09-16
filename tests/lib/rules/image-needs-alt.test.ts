// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Rule } from "eslint";
import ruleTester from "./helper/ruleTester";
import rule from "../../../lib/rules/image-needs-alt";

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

ruleTester.run("image-needs-alt", rule as unknown as Rule.RuleModule, {
    valid: ['<Image src="image.png" alt="Description of image" />', '<Image src="image.png" alt={altText} />'],
    invalid: [
        {
            // No alt attribute
            code: '<Image src="image.png" />',
            errors: [{ messageId: "imageNeedsAlt" }]
        },
        {
            // Empty alt attribute
            code: '<Image src="image.png" alt="" />',
            errors: [{ messageId: "imageNeedsAlt" }]
        },
        {
            // Null alt attribute
            code: '<Image src="image.png" alt={null} />',
            errors: [{ messageId: "imageNeedsAlt" }]
        },
        {
            // Undefined alt attribute
            code: '<Image src="image.png" alt={undefined} />',
            errors: [{ messageId: "imageNeedsAlt" }]
        }
    ]
});
