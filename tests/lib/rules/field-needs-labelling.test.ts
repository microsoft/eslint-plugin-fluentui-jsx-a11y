// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
import { Rule } from "eslint";
import ruleTester from "./helper/ruleTester";
import rule from "../../../lib/rules/field-needs-labelling";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run("field-needs-labelling", rule as unknown as Rule.RuleModule, {
    valid: [
        `<Field label="Example field">
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
            code: `<Field><ProgressBar value={0.5} max={1} /></Field>`,
            errors: [{ messageId: "noUnlabelledField" }]
        },
        {
            code: `<Field validationState="success" hint="This is a hint."><ProgressBar value={0.5} max={1} /></Field>`,
            errors: [{ messageId: "noUnlabelledField" }]
        }
    ]
});
