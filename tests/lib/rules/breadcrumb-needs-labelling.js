// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/breadcrumb-needs-labelling"),
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
ruleTester.run("breadcrumb-needs-labelling", rule, {
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
