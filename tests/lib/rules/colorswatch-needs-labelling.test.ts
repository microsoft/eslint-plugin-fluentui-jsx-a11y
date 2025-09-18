// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Rule } from "eslint";
import ruleTester from "./helper/ruleTester";
import rule from "../../../lib/rules/colorswatch-needs-labelling";

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

ruleTester.run("colorswatch-needs-labelling", rule as unknown as Rule.RuleModule, {
    valid: [
        // aria-label
        `<SwatchPicker aria-label="Choose color" selectedValue="00B053" onSelectionChange={onSel}>
        <ColorSwatch color="#FF1921" value="FF1921" aria-label="red" />
        <ColorSwatch color="#00B053" value="00B053" aria-label="green" />
      </SwatchPicker>`,

        // Field wrapper with label prop
        `
        <SwatchPicker>
          <Field label="red">
            <ColorSwatch color="#FF1921" value="FF1921" />
          </Field>
          <ColorSwatch color="#00B053" value="00B053" aria-label="green" />
        </SwatchPicker>
      `,

        // tooltip parent
        `
        <SwatchPicker>
          <Tooltip relationship="label" content="red">
            <ColorSwatch color="#FF1921" value="FF1921" />
          </Tooltip>
          <ColorSwatch color="#00B053" value="00B053" aria-label="green" />
        </SwatchPicker>
      `,

        // htmlFor
        `
        <>
          <label htmlFor="colorPicker">red</label>
          <ColorSwatch color="#FF1921" value="FF1921" id="colorPicker" />
        </>
      `,

        // wrapped in label
        `<label>red<ColorSwatch color="#FF1921" value="FF1921" /></label>`,

        // text content child
        `<ColorSwatch color="#FF1921" value="FF1921">red</ColorSwatch>`
    ],

    invalid: [
        {
            // no labels
            code: `
          <SwatchPicker>
            <ColorSwatch color="#FF1921" value="FF1921" />
          </SwatchPicker>
        `,
            errors: [{ messageId: "noUnlabeledColorSwatch" }]
        },
        {
            // aria-labelledby
            code: `
          <>
            <label id="colorPicker">red</label>
            <SwatchPicker>
              <ColorSwatch color="#FF1921" value="FF1921" aria-labelledby="colorPicker" />
            </SwatchPicker>
          </>
        `,
            errors: [{ messageId: "noUnlabeledColorSwatch" }]
        }
    ]
});
