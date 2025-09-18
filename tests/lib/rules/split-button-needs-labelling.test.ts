// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Rule } from "eslint";
import ruleTester from "./helper/ruleTester";
import rule from "../../../lib/rules/split-button-needs-labelling";
// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

ruleTester.run("split-button-needs-labelling", rule as unknown as Rule.RuleModule, {
    valid: [
        // 1) aria-label on the SplitButton

        `<SplitButton
          menuButton={triggerProps}
          primaryActionButton={primaryActionButtonProps}
        >
          Example
        </SplitButton>
      `,
        // 2) with primaryActionButton prop having aria-label
        `
        <SplitButton
         menuButton={triggerProps}
         primaryActionButton={{
           ref: setPrimaryActionButtonRef,
           "aria-label": "With calendar icon only",
         }}
         icon={<CalendarMonthRegular />}
       />
      `
    ],

    invalid: [
        // Unlabeled SplitButton
        {
            code: `
                <SplitButton
                menuButton={triggerProps}
                primaryActionButton={primaryActionButtonProps}
                 />
            `,
            errors: [{ messageId: "noUnlabeledSplitButton" }]
        },
        // SplitButton empty aria-label
        {
            code: `
               <SplitButton
                menuButton={triggerProps}
                primaryActionButton={{
                    ref: setPrimaryActionButtonRef,
                    "aria-label": "",
                }}
                 />
            `,
            errors: [{ messageId: "noUnlabeledSplitButton" }]
        },
        // SplitButton with aria-label null
        {
            code: `
                <SplitButton
                menuButton={triggerProps}
                primaryActionButton={{
                    ref: setPrimaryActionButtonRef,
                    "aria-label": null,
                }}
                 />
            `,
            errors: [{ messageId: "noUnlabeledSplitButton" }]
        },
        // SplitButton with aria-label undefined
        {
            code: `
               <SplitButton
                menuButton={triggerProps}
                primaryActionButton={{
                    ref: setPrimaryActionButtonRef,
                    "aria-label": undefined,
                }}
                 />
            `,
            errors: [{ messageId: "noUnlabeledSplitButton" }]
        }
    ]
});
