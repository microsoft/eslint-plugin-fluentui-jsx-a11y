// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const kebabToCamelCase = str => {
    return str.replace(/[-_](.)/g, (_, char) => char.toUpperCase()).replace(/^(.)/, (_, char) => char.toLowerCase());
};
