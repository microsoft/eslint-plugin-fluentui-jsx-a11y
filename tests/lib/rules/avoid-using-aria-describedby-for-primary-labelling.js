// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/avoid-using-aria-describedby-for-primary-labelling"),
    RuleTester = require("eslint").RuleTester;

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
ruleTester.run("avoid-using-aria-describedby-for-primary-labelling", rule, {
    valid: [
        '<><Button aria-label="submit" aria-describedby="submitDesc" icon={<CalendarMonthRegular />} /><Label id="submitDesc">Click to submit your form. This will save your data.</Label></>',
        '<><Button aria-describedby="submitDesc">Submit</Button><Label id="submitDesc">Click to submit your form. This will save your data.</Label></>',
        '<><Label htmlFor="myInput">Name</Label><TextField id="myInput" aria-describedby="nameDesc" placeholder="Enter your name" /><Label id="nameDesc">This field is for your full legal name.</Label></>'
    ],
    invalid: [
        {
            code: '<><Button aria-describedby="submitDesc" icon={<CalendarMonthRegular />} /><Label id="submitDesc">Click to submit your form. This will save your data.</Label></>',
            errors: [{ messageId: "noAriaDescribedbyAsLabel" }]
        },
        {
            code: '<><TextField id="myInput" aria-describedby="nameDesc" /><Label id="nameDesc">Name</Label></>',
            errors: [{ messageId: "noAriaDescribedbyAsLabel" }]
        },
        {
            code: '<><Input type="text" aria-describedby="nameDesc" /><Label id="nameDesc">Name</Label></>',
            errors: [{ messageId: "noAriaDescribedbyAsLabel" }]
        }
    ]
});
