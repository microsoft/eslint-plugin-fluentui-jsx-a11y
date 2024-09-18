// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/progressbar-needs-labelling"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("progressbar-needs-labelling", rule, {
    valid: [
        `<Field
            label="Example field"
            validationState="success"
            validationMessage="This is a success message."
        >
            <ProgressBar value={0.5} aria-valuemin={0} aria-valuemax={1} aria-valuenow={0.5} aria-describedby="desc1" aria-label="label1"/>
        </Field>`,
        `<Field
            label="Example field"
            validationState="success"
            hint="my hint"
        >
            <ProgressBar value={0.5} aria-valuemin={0} aria-valuemax={1} aria-valuenow={0.5} aria-describedby="desc1" aria-labelledby="color"/>
        </Field>`,
        `<Field
            label="Example field"
            validationState="success"
            validationMessage="This is a warning message."
            hint="other hint"
        >
            <ProgressBar value={0.5} aria-valuemin={0} aria-valuemax={1} aria-valuenow={0.5} aria-describedby="desc3" aria-label="label2"/>
        </Field>`
    ],
    invalid: [
        {
            code: `<Field
                label="Example field"
                validationState="success"
                validationMessage="This is a warning message."
                > 
                    <ProgressBar value={0.5} aria-valuemax={1} aria-valuenow={0.5} aria-describedby="desc1" />
                </Field>`,
            errors: [{ messageId: "noUnlabelledProgressbar" }]
        },
        {
            code: `<Field
                label="Example field"
                validationState="success"
                validationMessage="This is an error message."
                > 
                    <ProgressBar value={0.5} aria-valuemin={0} aria-valuenow={0.5} />
                </Field>`,
            errors: [{ messageId: "noUnlabelledProgressbar" }]
        },
        {
            code: `<Field
                label="Example field"
                validationState="success"
                validationMessage="This is a test message."
                > 
                    <ProgressBar value={0.5} aria-valuemin={0} aria-valuemax={1} aria-describedby="desc1" />
                </Field>`,
            errors: [{ messageId: "noUnlabelledProgressbar" }]
        },
        {
            code: `<Field
                validationState="success"
                validationMessage="This is not a success message."
                > 
                    <ProgressBar value={0.5} aria-valuemin={0} aria-valuemax={1} aria-valuenow={0.5} />
                </Field>`,
            errors: [{ messageId: "noUnlabelledProgressbar" }]
        },
        {
            code: `<Field
                label="Example field"
                validationState="success"
                > 
                    <ProgressBar value={0.5} aria-valuemin={0} aria-valuemax={1} aria-valuenow={0.5} />
                </Field>`,
            errors: [{ messageId: "noUnlabelledProgressbar" }]
        },
        {
            code: `<ProgressBar value={0.5} aria-valuemin={0} aria-valuemax={1} aria-valuenow={0.5} />`,
            errors: [{ messageId: "noUnlabelledProgressbar" }]
        }
    ]
});

