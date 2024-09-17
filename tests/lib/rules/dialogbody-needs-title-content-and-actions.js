// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const RuleTester = require("eslint").RuleTester;

const rule = require("../../../lib/rules/dialogbody-needs-title-content-and-actions");

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
ruleTester.run("dialogbody-needs-title-content-and-actions", rule, {
    valid: [
        `<DialogBody>
            <DialogTitle>Dialog title</DialogTitle>
            <DialogContent>Test</DialogContent>
            <DialogActions>
                <Button>Close</Button>
                <Button>Do Something</Button>
            </DialogActions>
        </DialogBody>`
    ],

    invalid: [
        {
            code:
                `<DialogBody>
                    <DialogContent>Test</DialogContent>
                    <DialogActions>
                        <Button>Close</Button>
                        <Button>Do Something</Button>
                    </DialogActions>
                </DialogBody>`,
            errors: [{ messageId: "dialogBodyOneTitleOneContentOneFooter" }]
        },
        {
            code:
                `<DialogBody>
                    <DialogTitle>Dialog title</DialogTitle>
                    <DialogActions>
                        <Button>Close</Button>
                        <Button>Do Something</Button>
                    </DialogActions>
                </DialogBody>`,
            errors: [{ messageId: "dialogBodyOneTitleOneContentOneFooter" }]
        },
        {
            code:
                `<DialogBody>
                    <DialogTitle>Dialog title</DialogTitle>
                    <DialogContent>Test</DialogContent>
                </DialogBody>`,
            errors: [{ messageId: "dialogBodyOneTitleOneContentOneFooter" }]
        },
    ]
});
