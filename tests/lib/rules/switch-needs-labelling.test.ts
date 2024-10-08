// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { Rule } from "eslint";
import ruleTester from "./helper/ruleTester";
import rule from "../../../lib/rules/switch-needs-labelling";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run("switch-needs-labelling", rule as unknown as Rule.RuleModule, {
    valid: [
        "<><Label>This is a Switch<Switch checked={true} /></Label></>",
        `<Switch label="This is a switch" checked={true} />`,
        `<Switch label="This is a switch" checked={true}></Switch>`,
        `<><Label htmlFor="my-label-1">This is a switch</Label><Switch id="my-label-1" checked={true} /></>`,
        `<><Label id="my-label-1">This is a switch</Label><Switch aria-labelledby="my-label-1" checked={true} /></>`,
        `<><Label id="my-label-1">This is a switch</Label><Switch aria-labelledby="my-label-1" checked={true}></Switch></>`,
        `<><Label id="my-label-1">This is a switch</Label><Label id="my-label-3">This is a switch</Label><Switch aria-labelledby="my-label-1" checked={true}></Switch></>`,
        `<><Label id="my-label-1">This is a switch</Label><Image src={"https://msn.com"} /><Switch aria-labelledby="my-label-1" checked={true}></Switch></>`
    ],
    invalid: [
        {
            code: `<Switch checked={true} />`,
            errors: [{ messageId: "noUnlabelledSwitch" }]
        },
        {
            code: `<><Label id="my-label-2">This is a switch</Label><Switch aria-labelledby="my-label-1" checked={true} /></>`,
            errors: [{ messageId: "noUnlabelledSwitch" }]
        },
        {
            code: `<><Label id="my-label-2">This is a switch</Label><Switch aria-labelledby="my-label-1" checked={true}></Switch></>`,
            errors: [{ messageId: "noUnlabelledSwitch" }]
        },
        {
            code: `<><Label id="my-label-1">This is a switch</Label><Label id="my-label-3">This is a switch</Label><Switch aria-labelledby="my-label-4" checked={true}></Switch></>`,
            errors: [{ messageId: "noUnlabelledSwitch" }]
        }
    ]
});
