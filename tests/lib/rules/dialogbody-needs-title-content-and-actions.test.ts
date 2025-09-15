// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { Rule } from "eslint";
import ruleTester from "./helper/ruleTester";
import rule from "../../../lib/rules/dialogbody-needs-title-content-and-actions";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run("dialogbody-needs-title-content-and-actions", rule as any as Rule.RuleModule, {
    valid: [
        `<DialogBody>
            <DialogTitle>Dialog title</DialogTitle>
            <DialogContent>Test</DialogContent>
            <DialogActions>
                <Button>Close</Button>
                <Button>Do Something</Button>
            </DialogActions>
        </DialogBody>`,
        `<React.StrictMode><Component /></React.StrictMode>`
    ],

    invalid: [
        {
            code: `<DialogBody>
                    <DialogContent>Test</DialogContent>
                    <DialogActions>
                        <Button>Close</Button>
                        <Button>Do Something</Button>
                    </DialogActions>
                </DialogBody>`,
            errors: [{ messageId: "dialogBodyOneTitleOneContentOneFooter" }]
        },
        {
            code: `<DialogBody>
                    <DialogTitle>Dialog title</DialogTitle>
                    <DialogActions>
                        <Button>Close</Button>
                        <Button>Do Something</Button>
                    </DialogActions>
                </DialogBody>`,
            errors: [{ messageId: "dialogBodyOneTitleOneContentOneFooter" }]
        },
        {
            code: `<DialogBody>
                    <DialogTitle>Dialog title</DialogTitle>
                    <DialogContent>Test</DialogContent>
                </DialogBody>`,
            errors: [{ messageId: "dialogBodyOneTitleOneContentOneFooter" }]
        }
    ]
});
