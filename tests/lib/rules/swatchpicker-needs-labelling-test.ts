// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Rule } from "eslint";
import ruleTester from "./helper/ruleTester";
import rule from "../../../lib/rules/swatchpicker-needs-labelling";

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

ruleTester.run("swatchpicker-needs-labelling", rule as unknown as Rule.RuleModule, {
    valid: [
        // 1) aria-label on the SwatchPicker

        `<SwatchPicker aria-label="Choose color" selectedValue="00B053" onSelectionChange={onSel}>
          <ColorSwatch color="#FF1921" value="FF1921" aria-label="red" />
          <ColorSwatch color="#00B053" value="00B053" aria-label="green" />
        </SwatchPicker>
      `,
        // 2) aria-labelledby → text element
        `
        <>
          <span id="colorLabel">Choose color</span>
          <SwatchPicker aria-labelledby="colorLabel">
            <ColorSwatch color="#FF1921" value="FF1921" aria-label="red" />
            <ColorSwatch color="#00B053" value="00B053" aria-label="green" />
          </SwatchPicker>
        </>
      `,
        // 3) aria-labelledby → Fluent Label
        `<>
          <Label id="colorLabel">Choose color</Label>
          <SwatchPicker aria-labelledby="colorLabel">
            <ColorSwatch color="#FF1921" value="FF1921" aria-label="red" />
            <ColorSwatch color="#00B053" value="00B053" aria-label="green" />
          </SwatchPicker>
        </>
      `,
        // 4) aria-labelledby with multiple ids (concatenated label)
        `<>
          <span id="a">Choose</span> <span id="b">favorite color</span>
          <SwatchPicker aria-labelledby="a b">
            <ColorSwatch color="#FF1921" value="FF1921" aria-label="red" />
            <ColorSwatch color="#00B053" value="00B053" aria-label="green" />
          </SwatchPicker>
        </>
      `,
        // 5) Field wrapper with label prop
        `
        <Field label="Choose color">
          <SwatchPicker>
            <ColorSwatch color="#FF1921" value="FF1921" aria-label="red" />
            <ColorSwatch color="#00B053" value="00B053" aria-label="green" />
          </SwatchPicker>
        </Field>
      `
    ],

    invalid: [
        // Unlabeled SwatchPicker (children present, but no accessible name)
        {
            code: `
                <SwatchPicker>
                    <ColorSwatch color="#FF1921" value="FF1921" aria-label="red" />
                    <ColorSwatch color="#00B053" value="00B053" aria-label="green" />
                </SwatchPicker>
            `,
            errors: [{ messageId: "noUnlabeledSwatchPicker" }]
        },
        {
            // 7) Native <label> wrapping (implicit label)
            code: `
                <label>
                    Choose color
                    <SwatchPicker>
                        <ColorSwatch color="#FF1921" value="FF1921" aria-label="red" />
                        <ColorSwatch color="#00B053" value="00B053" aria-label="green" />
                    </SwatchPicker>
                </label>
            `,
            errors: [{ messageId: "noUnlabeledSwatchPicker" }]
        },
        {
            code: `
                <>
                <label htmlFor="colorPicker">Choose color</label>
                <SwatchPicker id="colorPicker">
                    <ColorSwatch color="#FF1921" value="FF1921" aria-label="red" />
                    <ColorSwatch color="#00B053" value="00B053" aria-label="green" />
                </SwatchPicker>
                </>
            `,
            errors: [{ messageId: "noUnlabeledSwatchPicker" }]
        }
    ]
});
