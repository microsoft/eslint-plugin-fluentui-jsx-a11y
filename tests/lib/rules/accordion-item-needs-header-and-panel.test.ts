// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { Rule } from "eslint";
import ruleTester from "./helper/ruleTester";
import rule from "../../../lib/rules/accordion-item-needs-header-and-panel";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run("accordion-item-needs-header-and-panel", rule as unknown as Rule.RuleModule, {
    valid: [
        `<AccordionItem><AccordionHeader>Accordion Header 1</AccordionHeader><AccordionPanel><div>Accordion Panel 1</div></AccordionPanel></AccordionItem>`,
        `<React.StrictMode><Component /></React.StrictMode>`
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
