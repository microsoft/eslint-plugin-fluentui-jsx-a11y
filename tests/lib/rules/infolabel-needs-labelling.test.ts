// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { Rule } from "eslint";
import ruleTester from "./helper/ruleTester";
import rule from "../../../lib/rules/infolabel-needs-labelling";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run("infolabel-needs-labelling", rule as unknown as Rule.RuleModule, {
    valid: [
        // InfoLabel with aria-label
        `<InfoLabel aria-label="Additional information" />`,
        // InfoLabel with text content
        `<InfoLabel>Help text</InfoLabel>`,
        `<InfoLabel>?</InfoLabel>`,
        `<InfoLabel>ℹ️</InfoLabel>`,
        // InfoLabel with aria-labelledby that references existing element
        `<><Label id="info-label">Information</Label><InfoLabel aria-labelledby="info-label" /></>`,
        // InfoLabel wrapped in Tooltip
        `<Tooltip content="Help information" relationship="label"><InfoLabel /></Tooltip>`
        // TODO: Uncomment when hasLabeledChild is implemented
        // InfoLabel with labeled child
        // `<InfoLabel><img alt="Help icon" /></InfoLabel>`,
        // InfoLabel with Icon child
        // `<InfoLabel><InfoIcon /></InfoLabel>`
    ],
    invalid: [
        {
            code: `<InfoLabel />`,
            errors: [{ messageId: "infoLabelNeedsLabelling" }]
        },
        {
            code: `<InfoLabel></InfoLabel>`,
            errors: [{ messageId: "infoLabelNeedsLabelling" }]
        },
        {
            code: `<InfoLabel aria-label="" />`,
            errors: [{ messageId: "infoLabelNeedsLabelling" }]
        },
        {
            code: `<InfoLabel aria-labelledby="non-existent-id" />`,
            errors: [{ messageId: "infoLabelNeedsLabelling" }]
        },
        {
            // aria-labelledby references ID that doesn't exist
            code: `<><Label id="wrong-id">Information</Label><InfoLabel aria-labelledby="info-label" /></>`,
            errors: [{ messageId: "infoLabelNeedsLabelling" }]
        }
    ]
});
