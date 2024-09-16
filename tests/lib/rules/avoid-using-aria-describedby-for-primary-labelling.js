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
        '<><Button aria-label="submit" aria-describedby="submitDesc" icon={<CalendarMonthRegular />} /><p id="submitDesc">Click to submit your form. This will save your data.</p></>',
        '<><Button aria-describedby="submitDesc">Submit</Button><p id="submitDesc">Click to submit your form. This will save your data.</p></>',
        '<><Label htmlFor="myInput">Name</Label><TextField id="myInput" aria-describedby="nameDesc" placeholder="Enter your name" /><p id="nameDesc">This field is for your full legal name.</p></>'
    ],
    invalid: [
        {
            code: '<><Button aria-describedby="submitDesc" icon={<CalendarMonthRegular />} /><p id="submitDesc">Click to submit your form. This will save your data.</p></>',
            errors: [{ messageId: "noAriaDescribedbyAsLabel" }]
        },
        {
            code: '<><TextField id="myInput" aria-describedby="nameDesc" /><p id="nameDesc">Name</p></>',
            errors: [{ messageId: "noAriaDescribedbyAsLabel" }]
        },
        {
            code: '<><Input type="text" aria-describedby="nameDesc" /><Label id="nameDesc">Name</Label></>',
            errors: [{ messageId: "noAriaDescribedbyAsLabel" }]
        },
        {
            code: '<><Input type="text" aria-describedby="nameDesc" /><p id="nameDesc">Name</p></>',
            errors: [{ messageId: "noAriaDescribedbyAsLabel" }]
        }
    ]
});

