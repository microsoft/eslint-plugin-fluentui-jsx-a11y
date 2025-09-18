// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import fs from "fs";
import { kebabToCamelCase } from "./utils/kebabToKamelCase";

// @ts-ignore: No types for jscodeshift
import { FileInfo, API, Options } from "jscodeshift";

interface TransformerOptions {
    ruleName: string;
    exportIndexFilePath: string;
}

export function transformer(file: FileInfo, api: API, options: TransformerOptions): string {
    const j = api.jscodeshift;
    const { ruleName, exportIndexFilePath } = options;

    // Read the export index file content
    const exportIndexSource = j(fs.readFileSync(exportIndexFilePath, "utf8"));

    // Convert the rule name to camelCase for the export statement
    const exportRuleName = kebabToCamelCase(ruleName);

    // Validate ruleName and exportRuleName
    if (!ruleName || !exportRuleName) {
        throw new Error(`Invalid rule name or export rule name: ${ruleName}, ${exportRuleName}`);
    }

    // Create the new export specifier
    const specifier = j.exportSpecifier.from({
        exported: j.identifier(exportRuleName),
        local: j.identifier("default")
    });

    // Create the new export statement
    const newExportStatement = j.exportNamedDeclaration(null, [specifier], j.stringLiteral(`./${ruleName}`));

    // Find all export statements
    const exportStatements = exportIndexSource.find(j.ExportNamedDeclaration);

    if (exportStatements.size() === 0) {
        // No export statements found, so insert at the beginning of the file
        exportIndexSource.get().node.program.body.unshift(newExportStatement);
    } else {
        // Insert the new export statement after the last one
        const lastExportStatement = exportStatements.paths()[exportStatements.size() - 1];
        j(lastExportStatement).insertAfter(newExportStatement);

        // Re-query the export statements after the insertion
        const updatedExportStatements = exportIndexSource.find(j.ExportNamedDeclaration);

        // Manually sort the export statements alphabetically
        const sortedExports = updatedExportStatements
            .nodes()

            .map((node: any) => {
                if (node.specifiers && node.specifiers[0] && node.specifiers[0].exported) {
                    return node;
                }
                return null; // Ignore nodes without valid specifiers
            })
            .filter((node: any) => node !== null) // Remove nulls
            .sort((a: any, b: any) => {
                const aName = a.specifiers[0].exported.name;
                const bName = b.specifiers[0].exported.name;
                return aName.localeCompare(bName);
            });

        // Remove all the original export statements
        exportIndexSource.find(j.ExportNamedDeclaration).remove();

        // Now insert the sorted export statements back into the AST
        const body = exportIndexSource.get().node.program.body;
        sortedExports.forEach((exportNode: any) => {
            body.push(exportNode); // Insert each export statement at the end of the body
        });
    }

    // Write the modified index file back to the filesystem
    fs.writeFileSync(exportIndexFilePath, exportIndexSource.toSource({ quote: "double" }), "utf8");

    // Return the original file source (this is for the main file passed in)
    return file.source;
}

