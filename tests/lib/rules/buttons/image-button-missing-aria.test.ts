// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { Rule } from "eslint";
import ruleTester from "../helper/ruleTester";
import rule from "../../../../lib/rules/buttons/image-button-missing-aria";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run("image-button-missing-aria", rule as unknown as Rule.RuleModule, {
    valid: [
        // give me some code that won't trigger a warning
        '<Button icon={<CloseIcon />} aria-label="Close" />',
        '<Button icon={<CloseIcon />} aria-label="Close"></Button>',
        "<Button>Example</Button>",
        '<Button icon={<CloseIcon />} title="Close"></Button>',
        "<Button icon={<CloseIcon />}>Close</Button>",
        "<Image />",
        '<Datepicker daysToSelectInDayView={0} popup="Compress program" />',
        '<Tooltip content="With calendar icon only" relationship="label"><Button icon={<CalendarMonthRegular />} /></Tooltip>',
        '<Tooltip content="With calendar icon only" relationship="label"><ToggleButton icon={<CalendarMonthRegular />} /></Tooltip>',
        '<Tooltip content="icon" relationship="label"><CompoundButton icon={<CalendarMonthRegular />} /></Tooltip>',
        '<><Label id="label-id-4">Close</Label><Button icon={<CloseIcon />} aria-labelledby="label-id-4"></Button></>',
        '<><Label id="label-id-4">Close</Label><Button icon={<CloseIcon />} aria-labelledby="label-id-4" /></>'
    ],
    invalid: [
        {
            code: "<Button icon={<CloseIcon />}></Button>",
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: "<ToggleButton icon={<CloseIcon />}></ToggleButton>",
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: "<CompoundButton icon={<CloseIcon />}></CompoundButton>",
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: "<Button icon={<CloseIcon />} />",
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: '<Button icon={<CloseIcon />} aria-labelledby="label-id-4"></Button>',
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: '<><Label id="label-id-4">Close</Label><Button icon={<CloseIcon />} aria-labelledby="label-id-5" /></>',
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: "<><Label>Close</Label><Button icon={<CloseIcon />} /></>",
            errors: [{ messageId: "missingAriaLabel" }]
        }
    ]
});
