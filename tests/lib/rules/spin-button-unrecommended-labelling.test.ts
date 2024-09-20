// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { Rule } from "eslint";
import ruleTester from "./helper/ruleTester";
import rule from "../../../lib/rules/spin-button-unrecommended-labelling";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run("spin-button-unrecommended-labelling", rule as unknown as Rule.RuleModule, {
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
