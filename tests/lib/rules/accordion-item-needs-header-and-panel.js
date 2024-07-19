// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/accordion-item-needs-header-and-panel"),
    RuleTester = require("eslint").RuleTester;

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
ruleTester.run("accordion-item-needs-header-and-panel", rule, {
    valid: [
        `<AccordionItem><AccordionHeader>Accordion Header 1</AccordionHeader><AccordionPanel><div>Accordion Panel 1</div></AccordionPanel></AccordionItem>`
    ],

    invalid: [
        {
            code: `<AccordionItem><AccordionHeader>Accordion Header 2</AccordionHeader></AccordionItem>`,
            errors: [{ messageId: "accordionItemOneHeaderOnePanel" }]
        },
        {
            code: `<AccordionItem><AccordionPanel><div>Accordion Panel 3</div></AccordionPanel></AccordionItem>`,
            errors: [{ messageId: "accordionItemOneHeaderOnePanel" }]
        },
        {
            code: `<AccordionItem><AccordionHeader>Accordion Header 1</AccordionHeader><AccordionHeader>Accordion Header 2</AccordionHeader><AccordionPanel><div>Accordion Panel 3</div></AccordionPanel></AccordionItem>`,
            errors: [{ messageId: "accordionItemOneHeaderOnePanel" }]
        },
        {
            code: `<AccordionItem><AccordionHeader>Accordion Header 1</AccordionHeader><AccordionPanel><div>Accordion Panel 1</div></AccordionPanel><AccordionPanel><div>Accordion Panel 2</div></AccordionPanel></AccordionItem>`,
            errors: [{ messageId: "accordionItemOneHeaderOnePanel" }]
        }
    ]
});
