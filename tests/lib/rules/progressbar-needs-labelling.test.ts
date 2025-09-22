// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { Rule } from "eslint";
import ruleTester from "./helper/ruleTester";
import rule from "../../../lib/rules/progressbar-needs-labelling";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run("progressbar-needs-labelling", rule as unknown as Rule.RuleModule, {
    valid: [
        `<Field
            label="Example field"
            validationState="success"
            validationMessage="This is a success message."
        >
            <ProgressBar value={0.5} max={1}/>
        </Field>`,
        `<Field
            label="Example field"
            validationState="success"
            validationMessage="This is a success message."
        >
            <ProgressBar value={0.5} aria-valuemin={0} aria-valuemax={1} aria-valuenow={0.5}/>
        </Field>`,
        `<ProgressBar value={0.5} max={5} aria-describedby="desc1" aria-labelledby="color"/>`,
        `<ProgressBar value={0.5} aria-valuemin={0} aria-valuemax={1} aria-valuenow={0.5} aria-describedby="desc1" aria-labelledby="color"/>`,
        `<ProgressBar value={0.5} max={5} aria-describedby="desc1" aria-label="custom label"/>`,
        `<ProgressBar value={0.5} aria-valuemin={0} aria-valuemax={1} aria-valuenow={0.5} aria-describedby="desc1" aria-label="custom label"/>`,
        `<Field
            label="Example field"
            validationState="success"
            validationMessage="This is a warning message."
            hint="other hint"
        >
            <ProgressBar value={0.5} aria-valuemin={0} aria-valuemax={1} aria-valuenow={0.5}/>
        </Field>`,
        `<Field
            label="Example field"
            validationState="success"
            validationMessage="This is a warning message."
            hint="other hint"
        >
            <ProgressBar value={0.5} max={10}/>
        </Field>`
    ],
    invalid: [
        {
            code: `<Field
                label="Example field"
                validationState="success"
                validationMessage="This is a warning message."
                > 
                    <ProgressBar value={0.5}/>
                </Field>`,
            errors: [{ messageId: "noUnlabelledProgressbar" }],
            output: `<Field
                label="Example field"
                validationState="success"
                validationMessage="This is a warning message."
                > 
                    <ProgressBar aria-describedby="" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" value={0.5}/>
                </Field>`
        },
        {
            code: `<Field
                label="Example field"
                validationState="success"
                validationMessage="This is an error message."
                > 
                    <ProgressBar value={0.5} aria-valuemin={0} aria-valuenow={0.5} />
                </Field>`,
            errors: [{ messageId: "noUnlabelledProgressbar" }],
            output: `<Field
                label="Example field"
                validationState="success"
                validationMessage="This is an error message."
                > 
                    <ProgressBar aria-describedby="" aria-valuemax="100" value={0.5} aria-valuemin={0} aria-valuenow={0.5} />
                </Field>`
        },
        {
            code: `<Field
                label="Example field"
                validationState="success"
                validationMessage="This is a test message."
                > 
                    <ProgressBar value={0.5} aria-valuemin={0} aria-valuemax={1} aria-describedby="desc1" />
                </Field>`,
            errors: [{ messageId: "noUnlabelledProgressbar" }],
            output: `<Field
                label="Example field"
                validationState="success"
                validationMessage="This is a test message."
                > 
                    <ProgressBar aria-valuenow="0" value={0.5} aria-valuemin={0} aria-valuemax={1} aria-describedby="desc1" />
                </Field>`
        },
        {
            code: `<Field
                validationState="success"
                validationMessage="This is not a success message."
                > 
                    <ProgressBar value={0.5}/>
                </Field>`,
            errors: [{ messageId: "noUnlabelledProgressbar" }],
            output: `<Field
                validationState="success"
                validationMessage="This is not a success message."
                > 
                    <ProgressBar aria-describedby="" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" value={0.5}/>
                </Field>`
        },
        {
            code: `<ProgressBar value={0.5} max={1} />`,
            errors: [{ messageId: "noUnlabelledProgressbar" }],
            output: `<ProgressBar aria-label="Progress" aria-describedby="" value={0.5} max={1} />`
        },
        {
            code: `<ProgressBar value={0.5} max={1} aria-describedby="desc1"/>`,
            errors: [{ messageId: "noUnlabelledProgressbar" }],
            output: `<ProgressBar aria-label="Progress" value={0.5} max={1} aria-describedby="desc1"/>`
        },
        {
            code: `<ProgressBar value={0.5} max={1} aria-labelledby="desc1"/>`,
            errors: [{ messageId: "noUnlabelledProgressbar" }],
            output: `<ProgressBar aria-describedby="" value={0.5} max={1} aria-labelledby="desc1"/>`
        },
        {
            code: `<ProgressBar value={0.5} max={1} aria-label="desc1"/>`,
            errors: [{ messageId: "noUnlabelledProgressbar" }],
            output: `<ProgressBar aria-describedby="" value={0.5} max={1} aria-label="desc1"/>`
        }
    ]
});
