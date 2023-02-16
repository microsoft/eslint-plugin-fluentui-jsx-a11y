// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.



"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const RuleTester = require("eslint").RuleTester;

const rule = require("../../../lib/rules/input-missing-label-v9");

RuleTester.setDefaultConfig({
    parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {
            jsx: true
        }
    }
});



//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("input-missing-label", rule, {
  valid: [
    '<><Label htmlFor="some-id">Some Label</Label><Input id="some-id"/></>',
    '<><Label htmlFor="some-id">Some Label<Input id="some-id"/></Label></>',
    '<><Input id="some-id" aria-label="Test"/></>',
    '<><Span id="test-span">Some Label</Span><Input id="some-id" aria-labelledby="test-span"/></>',
    '<><Input id="some-id" label="Test"/></>',
  ],

  invalid: [
    {
      code: "<><Input/></>",
      errors: [{ messageId: "missingLabelOnInput" }],
    },
    {
      code: "<><Label/><Input/></>",
      errors: [{ messageId: "missingLabelOnInput" }],
    },
    {
      code: '<><Label htmlFor="id"/><Input /></>',
      errors: [{ messageId: "missingLabelOnInput" }],
    },
    {
      code: '<Input id="some-id"/>',
      errors: [{ messageId: "missingLabelOnInput" }],
    },
    {
      code: '<><Label>Some Label</Label><Input id="some-id"/></>',
      errors: [{ messageId: "missingLabelOnInput" }],
    }
  ],
});
