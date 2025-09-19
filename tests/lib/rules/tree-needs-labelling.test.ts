// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { Rule } from "eslint";
import ruleTester from "./helper/ruleTester";
import rule from "../../../lib/rules/tree-needs-labelling";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run("tree-needs-labelling", rule as unknown as Rule.RuleModule, {
    valid: [
        // Tree with aria-label
        `<Tree aria-label="File explorer" />`,

        // Tree with aria-labelledby that references existing element
        `<><Label id="tree-label">Project Files</Label><Tree aria-labelledby="tree-label" /></>`,

        // Tree wrapped in Field
        `<Field label="Navigation Menu">
            <Tree>
                <TreeItem>Home</TreeItem>
                <TreeItem>About</TreeItem>
            </Tree>
         </Field>`,

        // Tree with comprehensive structure (nested trees inherit context)
        `<Tree aria-label="Organization Chart">
            <TreeItem>
                <TreeItemLayout>CEO</TreeItemLayout>
                <Tree>
                    <TreeItem>VP Engineering</TreeItem>
                    <TreeItem>VP Sales</TreeItem>
                </Tree>
            </TreeItem>
         </Tree>`,

        // Tree with additional ARIA attributes
        `<Tree 
            aria-label="File system browser"
            aria-describedby="tree-help"
            aria-multiselectable="true"
         >
            <TreeItem>Documents</TreeItem>
            <TreeItem>Pictures</TreeItem>
         </Tree>`,

        // Complex labeling scenario
        `<><h3 id="nav-title">Site Navigation</h3>
           <p id="nav-desc">Use arrow keys to navigate</p>
           <Tree aria-labelledby="nav-title nav-desc">
               <TreeItem>Home</TreeItem>
               <TreeItem>Products</TreeItem>
           </Tree></>`
    ],
    invalid: [
        {
            code: `<Tree />`,
            errors: [{ messageId: "missingTreeLabelling" }]
        },
        {
            code: `<Tree>
                     <TreeItem>Item 1</TreeItem>
                     <TreeItem>Item 2</TreeItem>
                   </Tree>`,
            errors: [{ messageId: "missingTreeLabelling" }]
        },
        {
            code: `<Tree aria-label="" />`,
            errors: [{ messageId: "missingTreeLabelling" }]
        },
        {
            code: `<Tree aria-label="   " />`,
            errors: [{ messageId: "missingTreeLabelling" }]
        },
        {
            code: `<Tree aria-labelledby="non-existent-id" />`,
            errors: [{ messageId: "missingTreeLabelling" }]
        },
        {
            code: `<><Label id="wrong-id">Files</Label><Tree aria-labelledby="tree-label" /></>`,
            errors: [{ messageId: "missingTreeLabelling" }]
        },
        {
            code: `<Tree aria-multiselectable="true">
                     <TreeItem>Folder 1</TreeItem>
                     <TreeItem>Folder 2</TreeItem>
                   </Tree>`,
            errors: [{ messageId: "missingTreeLabelling" }]
        },
        {
            // Empty aria-labelledby
            code: `<Tree aria-labelledby="" />`,
            errors: [{ messageId: "missingTreeLabelling" }]
        }
    ]
});
