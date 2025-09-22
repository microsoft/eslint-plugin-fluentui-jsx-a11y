// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Rule } from "eslint";
import ruleTester from "./helper/ruleTester";
import rule from "../../../lib/rules/image-needs-alt";

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

ruleTester.run("image-needs-alt", rule as unknown as Rule.RuleModule, {
    valid: [
        // Not an Image
        "<div></div>",
        // Valid string test
        '<Image src="image.png" alt="Description of image" />',
        // Valid expression test
        '<Image src="image.png" alt={altText} />',
        // Decorative image with empty alt
        '<Image src="image.png" alt="" />'
    ],
    invalid: [
        {
            // No alt attribute
            code: '<Image src="image.png" />',
            errors: [{ messageId: "imageNeedsAlt" }],
            output: '<Image alt="" src="image.png" />'
        },
        {
            // Null alt attribute
            code: '<Image src="image.png" alt={null} />',
            errors: [{ messageId: "imageNeedsAlt" }],
            output: '<Image alt="" src="image.png" alt={null} />'
        },
        {
            // Undefined alt attribute
            code: '<Image src="image.png" alt={undefined} />',
            errors: [{ messageId: "imageNeedsAlt" }],
            output: '<Image alt="" src="image.png" alt={undefined} />'
        }
    ]
});
