// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { Rule } from "eslint";
import ruleTester from "./helper/ruleTester";
import rule from "../../../lib/rules/breadcrumb-needs-labelling";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run("breadcrumb-needs-labelling", rule as unknown as Rule.RuleModule, {
    valid: [
        // give me some code that won't trigger a warning
        '<Breadcrumb aria-label="Breadcrumb default example"></Breadcrumb>',
        '<div><label id="my-label">Breadcrumb default example</label><Breadcrumb aria-labelledby="my-label"></Breadcrumb></div>',
        '<div><Label id="my-label">Breadcrumb default example</Label><Breadcrumb aria-labelledby="my-label"></Breadcrumb></div>'
    ],
    invalid: [
        {
            code: '<div><Label id="my-label">Breadcrumb default example</Label><Breadcrumb></Breadcrumb></div>',
            errors: [{ messageId: "noUnlabelledBreadcrumb" }]
        },
        {
            code: "<label>Breadcrumb default example<Breadcrumb></Breadcrumb></label>",
            errors: [{ messageId: "noUnlabelledBreadcrumb" }]
        },
        {
            code: "<Breadcrumb></Breadcrumb>",
            errors: [{ messageId: "noUnlabelledBreadcrumb" }]
        }
    ]
});
