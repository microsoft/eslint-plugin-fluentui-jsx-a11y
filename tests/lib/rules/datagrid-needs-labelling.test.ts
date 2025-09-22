// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { Rule } from "eslint";
import ruleTester from "./helper/ruleTester";
import rule from "../../../lib/rules/datagrid-needs-labelling";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run("datagrid-needs-labelling", rule as unknown as Rule.RuleModule, {
    valid: [
        // DataGrid with aria-label
        `<DataGrid aria-label="Employee data" />`,

        // DataGrid with aria-labelledby that references existing element
        `<><Label id="grid-label">Employee Data</Label><DataGrid aria-labelledby="grid-label" /></>`,

        // DataGrid wrapped in Field (provides labeling context)
        `<Field label="Sales Report">
            <DataGrid columns={columns} items={items} />
         </Field>`,

        // DataGrid with comprehensive labeling and ARIA attributes
        `<DataGrid 
            aria-label="Sales Report Q3 2024" 
            aria-rowcount={150}
            aria-colcount={8}
            columns={columns} 
            items={items} 
         />`,

        // DataGrid with complex aria-labelledby
        `<><div id="grid-title">Financial Data</div>
           <div id="grid-description">Quarterly results</div>
           <DataGrid aria-labelledby="grid-title grid-description" /></>`,

        // DataGrid in Field with additional labeling
        `<Field label="Product Inventory">
            <DataGrid aria-label="Current stock levels" items={products} />
         </Field>`
    ],
    invalid: [
        {
            code: `<DataGrid />`,
            errors: [{ messageId: "missingDataGridLabelling" }]
        },
        {
            code: `<DataGrid columns={columns} items={items} />`,
            errors: [{ messageId: "missingDataGridLabelling" }]
        },
        {
            code: `<DataGrid aria-label="" />`,
            errors: [{ messageId: "missingDataGridLabelling" }]
        },
        {
            code: `<DataGrid aria-label="   " />`,
            errors: [{ messageId: "missingDataGridLabelling" }]
        },
        {
            code: `<DataGrid aria-labelledby="non-existent-id" />`,
            errors: [{ messageId: "missingDataGridLabelling" }]
        },
        {
            code: `<><Label id="wrong-id">Data</Label><DataGrid aria-labelledby="grid-label" /></>`,
            errors: [{ messageId: "missingDataGridLabelling" }]
        },
        {
            code: `<DataGrid 
                      aria-rowcount={100}
                      aria-colcount={5}
                      columns={columns}
                      items={items}
                   />`,
            errors: [{ messageId: "missingDataGridLabelling" }]
        },
        {
            // Empty aria-labelledby
            code: `<DataGrid aria-labelledby="" />`,
            errors: [{ messageId: "missingDataGridLabelling" }]
        }
    ]
});
