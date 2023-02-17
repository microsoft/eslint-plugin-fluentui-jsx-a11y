// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/image-button-missing-aria-v9"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("image-button-missing-aria-v9", rule, {
    valid: [
        // give me some code that won't trigger a warning
        '<Button icon={<CloseIcon />} aria-label="Close" />',
        '<Button icon={<CloseIcon />} aria-label="Close"></Button>',
        "<Button>Example</Button>",
        '<Button icon={<CloseIcon />} title="Close"></Button>',
        "<Button icon={<CloseIcon />}>Close</Button>",
        "<Image />",
        '<Datepicker daysToSelectInDayView={0} popup="Compress program" />',
        // '<Tooltip content="With calendar icon only" relationship="label"><Button icon={<CalendarMonthRegular />} /></Tooltip>'
        // '<Label id="label-id-4">Close</Label><Button icon={<CloseIcon />} aria-labelledby="label-id-4"></Button>',
        '<Button icon={<CloseIcon />} aria-describedby="label-id-4"></Button>'
    ],
    invalid: [
        {
            code: "<Button icon={<CloseIcon />}></Button>",
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: "<Button icon={<CloseIcon />} />",
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: "<Button></Button>",
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: '<Button icon={<CloseIcon />} aria-labelledby="label-id-4"></Button>',
            errors: [{ messageId: "missingAriaLabel" }]
        }
    ]
});
