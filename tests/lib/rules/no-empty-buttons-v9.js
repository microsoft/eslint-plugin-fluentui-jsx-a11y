// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const RuleTester = require("eslint").RuleTester;

const rule = require("../../../lib/rules/no-empty-buttons-v9");

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
ruleTester.run("no-empty-buttons-v9", rule, {
    valid: [
        // sample code that won't trigger a warning
        "<Button>Example</Button>",
        '<Button title="Toggle Example">Example</Button>',
        '<Button icon={<CloseIcon />} aria-label="Close" />',
        "<Button icon={<CloseIcon />}>Button</Button>",
        "<ToggleButton>Example</ToggleButton>",
        '<ToggleButton title="Toggle Example">Example</ToggleButton>',
        '<ToggleButton icon={<CloseIcon />} aria-label="Close" />',
        "<ToggleButton icon={<CloseIcon />}>ToggleButton</ToggleButton>",
        "<CompoundButton>Example</CompoundButton>",
        '<CompoundButton title="Toggle Example">Example</CompoundButton>',
        '<CompoundButton icon={<CloseIcon />} secondaryContent="Close" />',
        '<CompoundButton icon={<CloseIcon />} aria-label="Close" />',
        "<CompoundButton icon={<CloseIcon />}>CompoundButton</CompoundButton>",
        "<SplitButton>Example</SplitButton>",
        '<SplitButton title="Toggle Example">Example</SplitButton>',
        '<SplitButton icon={<CloseIcon />} aria-label="Close" />',
        "<SplitButton icon={<CloseIcon />}>SplitButton</SplitButton>"
    ],
    invalid: [
        {
            code: "<Button></Button>",
            errors: [{ messageId: "noEmptyButtons" }]
        },
        {
            code: "<Button />",
            errors: [{ messageId: "noEmptyButtons" }]
        },
        {
            code: '<Button title="Button Example"></Button>',
            errors: [{ messageId: "noEmptyButtons" }]
        },
        {
            code: '<Button aria-label="Button Example"></Button>',
            errors: [{ messageId: "noEmptyButtons" }]
        },
        {
            code: "<ToggleButton></ToggleButton>",
            errors: [{ messageId: "noEmptyButtons" }]
        },
        {
            code: "<ToggleButton />",
            errors: [{ messageId: "noEmptyButtons" }]
        },
        {
            code: '<ToggleButton title="Toggle Example"></ToggleButton>',
            errors: [{ messageId: "noEmptyButtons" }]
        },
        {
            code: '<ToggleButton aria-label="Toggle Example"></ToggleButton>',
            errors: [{ messageId: "noEmptyButtons" }]
        },
        {
            code: "<CompoundButton></CompoundButton>",
            errors: [{ messageId: "noEmptyButtons" }]
        },
        {
            code: "<CompoundButton />",
            errors: [{ messageId: "noEmptyButtons" }]
        },
        {
            code: '<CompoundButton secondaryContent=""></CompoundButton>',
            errors: [{ messageId: "noEmptyButtons" }]
        },
        {
            code: '<CompoundButton title="Compound Button Example"></CompoundButton>',
            errors: [{ messageId: "noEmptyButtons" }]
        },
        {
            code: '<CompoundButton aria-label="Compound Button Example"></CompoundButton>',
            errors: [{ messageId: "noEmptyButtons" }]
        },
        {
            code: "<SplitButton></SplitButton>",
            errors: [{ messageId: "noEmptyButtons" }]
        },
        {
            code: "<SplitButton />",
            errors: [{ messageId: "noEmptyButtons" }]
        },
        {
            code: '<SplitButton title="SplitButton Example"></SplitButton>',
            errors: [{ messageId: "noEmptyButtons" }]
        },
        {
            code: '<SplitButton aria-label="SplitButton Example"></SplitButton>',
            errors: [{ messageId: "noEmptyButtons" }]
        }
    ]
});

