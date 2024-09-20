// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { Rule } from "eslint";
import ruleTester from "./helper/ruleTester";
import rule from "../../../lib/rules/tooltip-not-recommended";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run("tooltip-not-recommended", rule as unknown as Rule.RuleModule, {
    valid: [
        // Valid cases
        '<div><label id="my-label">More option</label><SpinButton aria-labelledby="my-label"/></div>',
        '<div><label id="my-label">More option</label><MenuItem aria-labelledby="my-label"/></div>'
    ],
    invalid: [
        // Invalid cases
        {
            code: '<Tooltip content="menu item" relationship="label"><MenuItem/></Tooltip>',
            errors: [{ messageId: "tooltipNotRecommended" }]
        },
        {
            code: '<Tooltip content="menu item" relationship="label"><SpinButton/></Tooltip>',
            errors: [{ messageId: "tooltipNotRecommended" }]
        }
    ]
});
