// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/spin-button-unrecommended-labelling"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("spin-button-unrecommended-labelling", rule, {
    valid: [],
    invalid: [
        {
            code: `<SpinButton defaultValue={10} min={0} max={20} aria-label={"my-aria-label-1"}/>`,
            errors: [{ messageId: "unRecommendedlabellingSpinButton" }]
        },
        {
            code: `<><Tooltip id="my-label-2">This is a spin button<SpinButton defaultValue={10} min={0} max={20} /></Tooltip></>`,
            errors: [{ messageId: "unRecommendedlabellingSpinButton" }]
        }
    ]
});
