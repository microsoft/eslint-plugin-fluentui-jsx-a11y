// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { kebabToCamelCase } from "./utils/kebabToKamelCase";

// Sort function to keep rules and config sorted alphabetically
const nameSort = (a: any, b: any) => {
    const aName = a.key.type === "Literal" ? a.key.value : a.key.name;
    const bName = b.key.type === "Literal" ? b.key.value : b.key.name;
    if (aName < bName) return -1;
    if (aName > bName) return 1;
    return 0;
};

interface TransformerOptions {
    ruleName: string;
}

export const transformer = (file: any, api: any, options: any): string | null => {
    const j = api.jscodeshift;
    const root = j(file.source);
    const { ruleName } = options;

    let changesMade = 0;

    // Step 1: Add rule to the `rules` object (without parentheses)
    root.find(j.Property, { key: { name: "rules" } })
        .at(0)
        .forEach((path: any) => {
            const properties = path.value.value.properties;
            properties.unshift(
                j.property("init", j.literal(ruleName), j.memberExpression(j.identifier("rules"), j.identifier(kebabToCamelCase(ruleName))))
            );
            properties.sort(nameSort);
            changesMade += 1;
        });

    // Step 2: Find and modify `configs.recommended.rules`
    root.find(j.Property, { key: { name: "configs" } }).forEach((configPath: any) => {
        const recommendedConfig = configPath.value.value.properties.find((prop: any) => prop.key.name === "recommended");

        if (recommendedConfig) {
            const recommendedRules = recommendedConfig.value.properties.find((prop: any) => prop.key.name === "rules");

            if (recommendedRules) {
                const rulesProps = recommendedRules.value.properties;
                rulesProps.unshift(j.property("init", j.literal(`@microsoft/fluentui-jsx-a11y/${ruleName}`), j.literal("error")));
                rulesProps.sort(nameSort);
                changesMade += 1;
            }
        }
    });

    if (changesMade === 0) {
        return null;
    }

    return root.toSource({ quote: "double", trailingComma: false });
};

