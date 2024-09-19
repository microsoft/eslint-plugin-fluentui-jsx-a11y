// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const RuleTester = require("eslint").RuleTester;

const rule = require("../../../lib/rules/accordion-header-needs-labelling");

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
ruleTester.run("accordion-header-needs-labelling", rule, {
    valid: [
        "<AccordionHeader>Accordion Header 1</AccordionHeader>",
        "<AccordionHeader icon={<RocketRegular />}>Accordion Header 1</AccordionHeader>",
        "<AccordionHeader expandIcon={<RocketRegular />}>Accordion Header 1</AccordionHeader>",
        "<AccordionHeader icon={<RocketRegular />} expandIcon={openItem === 1 ? <Subtract20Filled /> : <Add20Filled />} >Accordion Header 1</AccordionHeader>",
        `<><Label id="my-label-2">This is a Header</Label><AccordionHeader aria-labelledby="my-label-2" icon={<RocketRegular />}></AccordionHeader></>`,
        '<AccordionHeader aria-label="Accordion Header 1" icon={<RocketRegular />}></AccordionHeader>',
        '<Tooltip content="With calendar icon only" relationship="label"><AccordionHeader icon={<CalendarMonthRegular />} /></Tooltip>'
    ],

    invalid: [
        {
            code: "<AccordionHeader icon={<RocketRegular />}></AccordionHeader>",
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: "<AccordionHeader icon={<RocketRegular />}/>",
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: "<AccordionHeader expandIcon={<RocketRegular />}/>",
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: "<AccordionHeader expandIcon={<RocketRegular />} icon={<RocketRegular />}/>",
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: "<AccordionHeader expandIcon={<RocketRegular />} icon={<RocketRegular />}></AccordionHeader>",
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: '<><Label id="my-label-2">This is a Header</Label><AccordionHeader aria-labelledby="my-label-1" icon={<RocketRegular />}></AccordionHeader></>',
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: "<><Label>This is a Header</Label><AccordionHeader icon={<RocketRegular />}></AccordionHeader></>",
            errors: [{ messageId: "missingAriaLabel" }]
        }
    ]
});
