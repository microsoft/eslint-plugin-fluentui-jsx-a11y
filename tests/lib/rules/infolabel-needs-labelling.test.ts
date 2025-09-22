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
        `<InfoLabel aria-label="Additional information" />`,
        `<InfoLabel>Help text</InfoLabel>`,
        `<InfoLabel>?</InfoLabel>`,
        `<InfoLabel>ℹ️</InfoLabel>`,
        `<><Label id="info-label">Information</Label><InfoLabel aria-labelledby="info-label" /></>`,
        `<Tooltip content="Help information" relationship="label"><InfoLabel /></Tooltip>`,
        `<InfoLabel><img alt="Help icon" /></InfoLabel>`,
        `<InfoLabel><InfoIcon /></InfoLabel>`
    ],
    invalid: [
        {
            code: `<InfoLabel />`,
            errors: [{ messageId: "infoLabelNeedsLabelling" }],
            output: `<InfoLabel aria-label="Info" />`
        },
        {
            code: `<InfoLabel></InfoLabel>`,
            errors: [{ messageId: "infoLabelNeedsLabelling" }],
            output: `<InfoLabel aria-label="Info"></InfoLabel>`
        },
        {
            code: `<InfoLabel aria-label="" />`,
            errors: [{ messageId: "infoLabelNeedsLabelling" }],
            output: `<InfoLabel aria-label="Info" aria-label="" />`
        },
        {
            code: `<InfoLabel aria-labelledby="non-existent-id" />`,
            errors: [{ messageId: "infoLabelNeedsLabelling" }],
            output: `<InfoLabel aria-label="Info" aria-labelledby="non-existent-id" />`
        },
        {
            code: `<><Label id="wrong-id">Information</Label><InfoLabel aria-labelledby="info-label" /></>`,
            errors: [{ messageId: "infoLabelNeedsLabelling" }],
            output: `<><Label id="wrong-id">Information</Label><InfoLabel aria-label="Info" aria-labelledby="info-label" /></>`
        },
        {
            code: `<InfoLabel><img /></InfoLabel>`,
            errors: [{ messageId: "infoLabelNeedsLabelling" }],
            output: `<InfoLabel aria-label="Info"><img /></InfoLabel>`
        },
        {
            code: `<InfoLabel><img alt="" /></InfoLabel>`,
            errors: [{ messageId: "infoLabelNeedsLabelling" }],
            output: `<InfoLabel aria-label="Info"><img alt="" /></InfoLabel>`
        }
    ]
});
