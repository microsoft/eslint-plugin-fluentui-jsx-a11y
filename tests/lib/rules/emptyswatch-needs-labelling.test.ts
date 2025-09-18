// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Rule } from "eslint";
import ruleTester from "./helper/ruleTester";
import rule from "../../../lib/rules/emptyswatch-needs-labelling";

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

ruleTester.run("emptyswatch-needs-labelling", rule as unknown as Rule.RuleModule, {
    valid: [
        // ✅ aria-label on the EmptySwatch
        `
        <SwatchPicker>
          <EmptySwatch value="none" aria-label="No color" />
          <EmptySwatch value="brand" aria-label="Brand color" />
        </SwatchPicker>
      `,

        // ✅ aria-labelledby
        `
        <>
          <span id="noColorLabel">No color</span>
          <SwatchPicker>
            <EmptySwatch value="none" aria-labelledby="noColorLabel" />
          </SwatchPicker>
        </>
      `,

        // ✅ htmlFor (label -> element by id)
        `
        <>
          <label htmlFor="emptyOption">No color</label>
          <SwatchPicker>
            <EmptySwatch id="emptyOption" value="none" />
          </SwatchPicker>
        </>
      `,

        // ✅ wrapped in native <label>
        `
        <label>
          No color
          <EmptySwatch value="none" />
        </label>
      `,

        // ✅ tooltip parent (acts as label)
        `
        <SwatchPicker>
          <Tooltip relationship="label" content="No color">
            <EmptySwatch value="none" />
          </Tooltip>
        </SwatchPicker>
      `,

        // ✅ text content child
        `
        <SwatchPicker>
          <EmptySwatch value="none">No color</EmptySwatch>
        </SwatchPicker>
      `
    ],

    invalid: [
        // ❌ no labels at all
        {
            code: `
          <SwatchPicker>
            <EmptySwatch value="none" />
          </SwatchPicker>
        `,
            errors: [{ messageId: "noUnlabeledEmptySwatch" }]
        },

        // ❌ Field wrapper with label prop is NOT allowed for EmptySwatch
        {
            code: `
          <SwatchPicker>
            <Field label="No color">
              <EmptySwatch value="none" />
            </Field>
          </SwatchPicker>
        `,
            errors: [{ messageId: "noUnlabeledEmptySwatch" }]
        },

        // ❌ Only the container (SwatchPicker) has a label; the EmptySwatch itself isn’t named
        {
            code: `
          <SwatchPicker aria-label="Color picker">
            <EmptySwatch value="none" />
          </SwatchPicker>
        `,
            errors: [{ messageId: "noUnlabeledEmptySwatch" }]
        }
    ]
});
