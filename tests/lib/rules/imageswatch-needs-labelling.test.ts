// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Rule } from "eslint";
import ruleTester from "./helper/ruleTester";
import rule from "../../../lib/rules/imageswatch-needs-labelling";

// -----------------------------------------------------------------------------
// Tests (ImageSwatch)
// ✅ allow: aria-label, aria-labelledby, wrapping <label>, Tooltip parent
// ❌ disallow: Field parent, htmlFor, text content child, container-only labels
// -----------------------------------------------------------------------------

ruleTester.run("imageswatch-needs-labelling", rule as unknown as Rule.RuleModule, {
    valid: [
        // ✅ aria-label on ImageSwatch
        `
        <SwatchPicker>
          <ImageSwatch src="/none.png" value="none" aria-label="No color" />
          <ImageSwatch src="/brand.png" value="brand" aria-label="Brand color" />
        </SwatchPicker>
      `,

        // ✅ aria-labelledby
        `
        <>
          <span id="imgNoColor">No color</span>
          <SwatchPicker>
            <ImageSwatch src="/none.png" value="none" aria-labelledby="imgNoColor" />
          </SwatchPicker>
        </>
      `,

        // ✅ wrapped in native <label>
        `
        <label>
          No color
          <ImageSwatch src="/none.png" value="none" />
        </label>
      `,

        // ✅ Tooltip parent provides label
        `
        <SwatchPicker>
          <Tooltip relationship="label" content="No color">
            <ImageSwatch src="/none.png" value="none" />
          </Tooltip>
        </SwatchPicker>
      `
    ],

    invalid: [
        // ❌ no labels at all
        {
            code: `
          <SwatchPicker>
            <ImageSwatch src="/none.png" value="none" />
          </SwatchPicker>
        `,
            errors: [{ messageId: "noUnlabeledImageSwatch" }]
        },

        // ❌ Field wrapper with label prop (not allowed)
        {
            code: `
          <SwatchPicker>
            <Field label="No color">
              <ImageSwatch src="/none.png" value="none" />
            </Field>
          </SwatchPicker>
        `,
            errors: [{ messageId: "noUnlabeledImageSwatch" }]
        },

        // ❌ htmlFor (not allowed for ImageSwatch)
        {
            code: `
          <>
            <label htmlFor="imgNone">No color</label>
            <SwatchPicker>
              <ImageSwatch id="imgNone" src="/none.png" value="none" />
            </SwatchPicker>
          </>
        `,
            errors: [{ messageId: "noUnlabeledImageSwatch" }]
        },

        // ❌ text content child (not allowed)
        {
            code: `
          <SwatchPicker>
            <ImageSwatch src="/none.png" value="none">No color</ImageSwatch>
          </SwatchPicker>
        `,
            errors: [{ messageId: "noUnlabeledImageSwatch" }]
        },

        // ❌ Only the container is labelled; ImageSwatch itself isn’t named
        {
            code: `
          <SwatchPicker aria-label="Color picker">
            <ImageSwatch src="/none.png" value="none" />
          </SwatchPicker>
        `,
            errors: [{ messageId: "noUnlabeledImageSwatch" }]
        }
    ]
});
