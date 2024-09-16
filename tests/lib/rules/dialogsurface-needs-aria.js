// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const RuleTester = require("eslint").RuleTester;

const rule = require("../../../lib/rules/dialogsurface-needs-aria")

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
ruleTester.run("dialogsurface-needs-aria", rule, {
    valid: [
        `<>
            <span id="dialoge-test-id">My Label</span>
            <DialogSurface aria-describedby="dialoge-test-id">
                <DialogBody>
                    <DialogTitle>Dialog title</DialogTitle>
                    <DialogContent>Test</DialogContent>
                    <DialogActions>
                        <Button>Close</Button>
                        <Button>Do Something</Button>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </>`,
        `<>
        <Label id="dialoge-test-id">My Label</Label>
        <DialogSurface aria-describedby="dialoge-test-id" aria-label="test-label">
            <DialogBody>
                <DialogTitle></DialogTitle>
                <DialogContent>Test</DialogContent>
                <DialogActions>
                        <Button>Close</Button>
                        <Button>Do Something</Button>
                </DialogActions>
            </DialogBody>
        </DialogSurface>
         </>`,
        `<>
            <div id="dialoge-test-id-desc">My Label1</div>
            <span id="dialoge-test-id-label">My Label2</span>
            <DialogSurface aria-describedby="dialoge-test-id-desc" aria-labelledby="dialoge-test-id-label">
                <DialogBody>
                    <DialogTitle></DialogTitle>
                    <DialogContent>Test</DialogContent>
                    <DialogActions>
                        <Button>Close</Button>
                        <Button>Do Something</Button>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </>`
    ],

    invalid: [
        {
            code:
                `<>
                    <DialogSurface>
                        <DialogBody>
                            <DialogTitle>Dialog title</DialogTitle>
                            <DialogContent>Test</DialogContent>
                            <DialogActions>
                                <Button>Close</Button>
                                <Button>Do Something</Button>
                            </DialogActions>
                        </DialogBody>
                    </DialogSurface>
                </>`,
            errors: [{ messageId: "missingAriaOnDialogSurface" }]
        },
        {
            code:
                `<>
                    <Label id="dialoge-test-id">My Label</Label>
                    <DialogSurface aria-describedby="dialoge-test-id">
                        <DialogBody>
                            <DialogTitle></DialogTitle>
                            <DialogContent>Test</DialogContent>
                            <DialogActions>
                                <Button>Close</Button>
                                <Button>Do Something</Button>
                            </DialogActions>
                        </DialogBody>
                    </DialogSurface>
                </>`,
            errors: [{ messageId: "missingAriaOnDialogSurface" }]
        }
    ]
});
