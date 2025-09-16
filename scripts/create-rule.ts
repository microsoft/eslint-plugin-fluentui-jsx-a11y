// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable no-console */
import { resolve } from "path";
import { existsSync, writeFileSync } from "fs";
import { exec } from "child_process";
// @ts-ignore: yargs has no default export
import yargs from "yargs/yargs";
// @ts-ignore: yargs/helpers has no default export
import { hideBin } from "yargs/helpers";
// Use require for boilerplate generators (CommonJS)
// @ts-ignore
const ruleBoilerplateGenerator = require("./boilerplate/rule");
// @ts-ignore
const testBoilerplateGenerator = require("./boilerplate/test");
// @ts-ignore
const docBoilerplateGenerator = require("./boilerplate/doc");

// Define the yargs configuration
const argv = yargs(hideBin(process.argv))
    .options({
        author: {
            alias: "a",
            type: "string",
            describe: "Author of the rule",
            default: "$AUTHOR"
        },
        description: {
            alias: "d",
            type: "string",
            describe: "Description of the rule",
            default: "$DESCRIPTION"
        }
    })
    .demandCommand(1, "You must provide the rule name.").argv as any; // Type assertion for yargs

const ruleName: string = argv._[0];
const author: string = argv.author || "$AUTHOR";
const description: string = argv.description || "$DESCRIPTION";

const rulePath = resolve(`lib/rules/${ruleName}.ts`);
const testPath = resolve(`tests/lib/rules/${ruleName}-test.ts`);
const docsPath = resolve(`docs/rules/${ruleName}.md`);

// Validate
if (!ruleName) {
    throw new Error("Rule name is required");
} else if (existsSync(rulePath)) {
    throw new Error("Rule already exists!");
}

// Generate file boilerplate
const ruleBoilerplate = ruleBoilerplateGenerator(ruleName, description);
const testBoilerplate = testBoilerplateGenerator(ruleName);
const docBoilerplate = docBoilerplateGenerator(ruleName, description);

// Create new files
writeFileSync(rulePath, ruleBoilerplate);
writeFileSync(testPath, testBoilerplate);
writeFileSync(docsPath, docBoilerplate);

// Paths to the transformers
const indexTransformerPath = "./scripts/addRuleToIndex.js"; // Transformer for main index.ts
const exportIndexTransformerPath = "./scripts/addRuleToExportIndex.js"; // Transformer for the export index.ts

// Paths to your files
const mainIndexFilePath = "./lib/index.ts"; // Path to main index.ts
const exportIndexFilePath = "./lib/rules/index.ts"; // Path to the export index.ts
const jscodeshiftPath = "./node_modules/.bin/jscodeshift"; // Use the local jscodeshift

// Command to run the main index transformer (Transformer 1)
const commandForMainIndex = [
    `"${jscodeshiftPath}"`,
    mainIndexFilePath, // Main index.ts file to transform
    `-t ${indexTransformerPath}`, // Transformer for main index.ts
    "--extensions ts", // Target TypeScript files
    "--parser flow", // Use the Flow parser (if needed)
    `--ruleName=${ruleName}`, // Pass rule name
    `--rulePath=${rulePath}` // Pass rule path
].join(" ");

// Command to run the export index transformer (Transformer 2)
const commandForExportIndex = [
    `"${jscodeshiftPath}"`,
    exportIndexFilePath, // Export index.ts file to transform
    `-t ${exportIndexTransformerPath}`, // Transformer for export index.ts
    "--extensions ts", // Target TypeScript files
    "--parser flow", // Use the Flow parser (if needed)
    `--ruleName=${ruleName}`, // Pass rule name
    `--exportIndexFilePath=${exportIndexFilePath}` // Path to export index file
].join(" ");

// Execute the main index transformer
exec(commandForMainIndex, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error during main index transformation: ${error.message}`);
        console.error(`stderr: ${stderr}`);
        return;
    }
    console.log("Main index transformation completed.");
    console.log(`stdout: ${stdout}`);

    // After the main index transformer completes, run the export index transformer
    exec(commandForExportIndex, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error during export index transformation: ${error.message}`);
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log("Export index transformation completed.");
        console.log(`stdout: ${stdout}`);
    });
});

