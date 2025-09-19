// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { Rule } from "eslint";
import ruleTester from "./helper/ruleTester";
import rule from "../../../lib/rules/table-needs-labelling";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run("table-needs-labelling", rule as unknown as Rule.RuleModule, {
    valid: [
        // Table with aria-label
        `<Table aria-label="Product inventory" />`,

        // Table with aria-labelledby that references existing element
        `<><Label id="table-label">Inventory</Label><Table aria-labelledby="table-label" /></>`,

        // Table with caption element (semantic labeling)
        `<Table>
            <caption>Sales Data for Q3 2024</caption>
            <TableHeader />
            <TableBody />
         </Table>`,

        // Table wrapped in Field
        `<Field label="Financial Summary">
            <Table>
                <TableHeader />
                <TableBody />
            </Table>
         </Field>`,

        // Table with comprehensive structure
        `<Table aria-label="Employee Directory">
            <TableHeader>
                <TableRow>
                    <TableHeaderCell>Name</TableHeaderCell>
                    <TableHeaderCell>Department</TableHeaderCell>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>John Doe</TableCell>
                    <TableCell>Engineering</TableCell>
                </TableRow>
            </TableBody>
         </Table>`,

        // Table with both caption and aria-label (redundant but valid)
        `<Table aria-label="Data summary">
            <caption>Detailed breakdown</caption>
            <TableHeader />
            <TableBody />
         </Table>`,

        // Complex aria-labelledby
        `<><h2 id="table-title">Sales Report</h2>
           <p id="table-desc">Monthly performance data</p>
           <Table aria-labelledby="table-title table-desc">
               <TableHeader />
               <TableBody />
           </Table></>`
    ],
    invalid: [
        {
            code: `<Table />`,
            errors: [{ messageId: "missingTableLabelling" }]
        },
        {
            code: `<Table>
                     <TableHeader />
                     <TableBody />
                   </Table>`,
            errors: [{ messageId: "missingTableLabelling" }]
        },
        {
            code: `<Table aria-label="" />`,
            errors: [{ messageId: "missingTableLabelling" }]
        },
        {
            code: `<Table aria-label="   " />`,
            errors: [{ messageId: "missingTableLabelling" }]
        },
        {
            code: `<Table aria-labelledby="non-existent-id" />`,
            errors: [{ messageId: "missingTableLabelling" }]
        },
        {
            code: `<><Label id="wrong-id">Data</Label><Table aria-labelledby="table-label" /></>`,
            errors: [{ messageId: "missingTableLabelling" }]
        },
        {
            code: `<Table>
                     <TableRow>
                         <TableCell>Data</TableCell>
                     </TableRow>
                   </Table>`,
            errors: [{ messageId: "missingTableLabelling" }]
        },
        {
            // Empty caption doesn't count as valid labeling
            code: `<Table>
                     <caption></caption>
                     <TableHeader />
                   </Table>`,
            errors: [{ messageId: "missingTableLabelling" }]
        },
        {
            // Whitespace-only caption
            code: `<Table>
                     <caption>   </caption>
                     <TableHeader />
                   </Table>`,
            errors: [{ messageId: "missingTableLabelling" }]
        }
    ]
});
