// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const RuleTester = require("eslint").RuleTester;

const rule = require("../../../lib/rules/text-area-missing-label-v9");

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
ruleTester.run("text-area-missing-label", rule, {
  valid: [
    '<><Label htmlFor="some-id">Some Label</Label><Textarea id="some-id"/></>',
    '<><Label htmlFor="some-id">Some Label</Label><SomeNesting><Textarea id="some-id"/></SomeNesting></>',
    '<Label>test</Label>',
    '<Label>test<Textarea/></Label>',
    '<Label>test<SomeNesting><Textarea/></SomeNesting></Label>'
  ],

  invalid: [
    {
      code: "<Textarea/>",
      errors: [{ messageId: "missingLabel" }],
    },
    {
      code: "<><Label/><Textarea/></>",
      errors: [{ messageId: "missingLabel" }],
    },
    {
      code: '<><Label htmlFor="id"/><Textarea /></>',
      errors: [{ messageId: "missingLabel" }],
    },
    {
      code: '<Textarea id="some-id"/>',
      errors: [{ messageId: "missingLabel" }],
    },
    {
      code: '<><Label>Some Label</Label><Textarea id="some-id"/></>',
      errors: [{ messageId: "missingLabel" }],
    }
  ],
});
