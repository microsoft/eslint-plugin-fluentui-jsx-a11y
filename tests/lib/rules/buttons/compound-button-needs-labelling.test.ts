// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
import { Rule } from "eslint";
import ruleTester from "../helper/ruleTester";
import rule from "../../../../lib/rules/buttons/compound-button-needs-labelling";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run("compound-button-needs-labelling", rule as unknown as Rule.RuleModule, {
    valid: [
        '<CompoundButton aria-label="Compound Example" icon={<CalendarMonthRegular />}></CompoundButton>',
        "<CompoundButton>Example</CompoundButton>",
        '<CompoundButton title="Compound Example"></CompoundButton>',
        '<CompoundButton secondaryContent="secondary content"></CompoundButton>',
        '<CompoundButton secondaryContent="secondary content" icon={<CalendarMonthRegular />}></CompoundButton>',
        '<Tooltip content="Compound Example" relationship="label"><CompoundButton icon={<CalendarMonthRegular />} /></Tooltip>',
        '<><Label id="label-id-4">Compound Example</Label><CompoundButton aria-labelledby="label-id-4" icon={<CalendarMonthRegular />}></CompoundButton></>'
    ],
    invalid: [
        {
            code: "<CompoundButton icon={<CalendarMonthRegular />}></CompoundButton>",
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: "<CompoundButton />",
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: '<CompoundButton aria-labelledby="label-id-4"></CompoundButton>',
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: '<><Label id="label-id-4">Compound Example</Label><CompoundButton aria-labelledby="label-id-5" /></>',
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: "<><Label>Compound Example</Label><CompoundButton icon={<CalendarMonthRegular />}/></>",
            errors: [{ messageId: "missingAriaLabel" }]
        }
    ]
});
