// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const RuleTester = require("eslint").RuleTester;

const rule = require("../../../lib/rules/image-link-missing-aria-v9");

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
ruleTester.run("image-link-missing-aria", rule, {
  valid: [
    '<Link href="#test"><Image src="/test.png"/>This is a label link</Link>',
    '<Link href="#test"><Image src="/test.png"/><span>This is a label link</span></Link>',
    '<Link href="#test"><Image src="/test.png"/><div><span>This is a label link</span></div></Link>',
    '<Link href="#test" title="This is a title for the link"><Image src="/test.png"/></Link>',
    '<Link href="#test" aria-label="This is a aria-label for the link"><Image src="/test.png"/></Link>',
    '<Link href="#test" aria-labelledby="This is a aria-labelledby for the link"><Image src="/test.png"/></Link>',
    '<Link href="#test"><Image src="/test.png" title="This is a title for the image link"/></Link>',
    '<Link href="#test"><div><Image src="/test.png" title="This is a title for the image link"/></div></Link>',
    '<Link href="#test"><Image src="/test.png" aria-label="This is an aria-label for the image link"/></Link>',
    '<Link href="#test"><Image src="/test.png" aria-labelledby="id1"/></Link>',
    '<Link href="#test"><div><Image src="/test.png" aria-labelledby="id1"/></div></Link>',
    '<Link href="#test"><div><Image src="/test.png"/>This is a label link</div></Link>',
  ],
  invalid: [
    {
      code: '<Link href="#test"><Image src="/test.png"/></Link>',
      errors: [{ messageId: "missingAriaLabel" }],
    },
    {
      code: '<Link href="#test" title=""><Image src="/test.png"/></Link>',
      errors: [{ messageId: "missingAriaLabel" }],
    },
    {
      code: '<Link href="#test"><Image src="/test.png" title=""/></Link>',
      errors: [{ messageId: "missingAriaLabel" }],
    },
    {
      code: '<Link href="#test"><Image src="/test.png" aria-hidden="true" aria-label="This is aria label"/></Link>',
      errors: [{ messageId: "missingAriaLabel" }],
    },
  ],
});
