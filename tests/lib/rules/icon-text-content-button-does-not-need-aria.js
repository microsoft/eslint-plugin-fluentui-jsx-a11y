// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const RuleTester = require("eslint").RuleTester;

const rule = require("../../../lib/rules/icon-text-content-button-does-not-need-aria");

RuleTester.setDefaultConfig({
    parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {
            jsx: true
        }
    }
});

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("icon-text-content-button-does-not-need-aria", rule, {
    valid: [
        // give me some code that won't trigger a warning
        '<Button content="Close" icon={<CloseIcon />} />',
        '<Button content="Close" icon={<CloseIcon />}></Button>',
        '<Button content="Close" icon={<CloseIcon />} iconOnly />',
        '<Button content="Close" icon={<CloseIcon />} iconOnly></Button>',
        "<Image />",
        '<Datepicker daysToSelectInDayView={0} popup="Compress program" />'
    ],
    invalid: [
        {
            code: "<Button content='Close' aria-label='Submit' icon={<CloseIcon />}></Button>",
            errors: [{ messageId: "unnecessaryAriaLabelling" }]
        },
        {
            code: "<Button content='Close' aria-label='Submit' icon={<CloseIcon />} />",
            errors: [{ messageId: "unnecessaryAriaLabelling" }]
        },
        {
            code: "<Button content='Close' aria-label='Submit' icon={<CloseIcon />} iconOnly></Button>",
            errors: [{ messageId: "unnecessaryAriaLabelling" }]
        },
        {
            code: "<Button content='Close' aria-label='Submit' icon={<CloseIcon />} iconOnly />",
            errors: [{ messageId: "unnecessaryAriaLabelling" }]
        },
        {
            code: "<Button content='Close' aria-labelledby='label-id-2' icon={<CloseIcon />}></Button>",
            errors: [{ messageId: "unnecessaryAriaLabelling" }]
        },
        {
            code: "<Button content='Close' aria-labelledby='label-id-2' icon={<CloseIcon />}/>",
            errors: [{ messageId: "unnecessaryAriaLabelling" }]
        },
        {
            code: "<Button content='Close' aria-labelledby='label-id-2' icon={<CloseIcon />} iconOnly></Button>",
            errors: [{ messageId: "unnecessaryAriaLabelling" }]
        },
        {
            code: "<Button content='Close' aria-labelledby='label-id-2' icon={<CloseIcon />} iconOnly />",
            errors: [{ messageId: "unnecessaryAriaLabelling" }]
        }
    ]
});
