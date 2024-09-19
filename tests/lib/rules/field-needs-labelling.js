// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/field-needs-labelling"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("field-needs-labelling", rule, {
    valid: [
        `<Field
                label="Example field"
                validationState="success"
                validationMessage="This is a success message."
        >
            <ProgressBar value={0.5} max={1} />
        </Field>`,
        `<Field
                label="Example field"
                validationState="success"
                hint="This is a hint."
        >
            <ProgressBar value={0.5} max={1} />
        </Field>`
    ],
    invalid: [
        {
            code: `<Field
                label="Example field"
                validationState="success"
            >
                <ProgressBar value={0.5} max={1} />
            </Field>`,
            errors: [{ messageId: "noUnlabelledField" }]
        },
        {
            code: `<Field
                validationState="success"
                hint="This is a hint."
            >
                <ProgressBar value={0.5} max={1} />
            </Field>`,
            errors: [{ messageId: "noUnlabelledField" }]
        }
    ]
});

