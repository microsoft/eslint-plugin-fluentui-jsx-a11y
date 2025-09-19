// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { Rule } from "eslint";
import ruleTester from "./helper/ruleTester";
import rule from "../../../lib/rules/card-needs-accessible-name";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run("card-needs-accessible-name", rule as unknown as Rule.RuleModule, {
    valid: [
        `<Card aria-label="Product details" />`,
        `<><Label id="card-label">Product</Label><Card aria-labelledby="card-label" /></>`,
        `<Card><img alt="Product image" /></Card>`,
        `<Card><ProductIcon /></Card>`
    ],
    invalid: [
        {
            code: `<Card />`,
            errors: [{ messageId: "cardNeedsAccessibleName" }]
        },
        {
            code: `<Card></Card>`,
            errors: [{ messageId: "cardNeedsAccessibleName" }]
        },
        {
            code: `<Card aria-label="" />`,
            errors: [{ messageId: "cardNeedsAccessibleName" }]
        },
        {
            code: `<><Label id="wrong-id">Product</Label><Card aria-labelledby="card-label" /></>`,
            errors: [{ messageId: "cardNeedsAccessibleName" }]
        }
    ]
});
