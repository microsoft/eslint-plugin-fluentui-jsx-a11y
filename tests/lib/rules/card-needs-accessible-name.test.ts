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
        // Card with aria-label
        `<Card aria-label="Product details" />`,
        // Card with aria-labelledby that references existing element
        `<><Label id="card-label">Product</Label><Card aria-labelledby="card-label" /></>`
        // TODO: Uncomment when hasLabeledChild is implemented
        // Card with labeled child
        // `<Card><img alt="Product image" /></Card>`,
        // Card with Icon child
        // `<Card><ProductIcon /></Card>`
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
