// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

var elementType = require('jsx-ast-utils').elementType;

//TODO: add comments
function isInsideLabelTag(context) {
    return context
        .getAncestors()
        .some(node => node.type === 'JSXElement' && elementType(node.openingElement) === 'Label');
}

/**
 * Checks if there is a Label component inside the source code with a htmlFor attribute matching that of the id parameter.
 * @param {*} idValue
 * @param {*} context
 * @returns boolean for match found or not.
 */
function hasLabelWithHtmlForId(idValue, context) {
    if (idValue === '') {
        return false;
    }
    const sourceCode = context.getSourceCode();
    const regex = /<Label[^>]*htmlFor[^>]*=[^>]*[{"|{'|"|']([^>'"}]*)['|"|'}|"}][^>]*>/gm;
    const m = regex.exec(sourceCode.text);
    return !!m && m.some(match => match === idValue);
}

/**
 * Checks if there is a Label component inside the source code with an id matching that of the id parameter.
 * @param {*} idValue
 * @param {*} context
 * @returns boolean for match found or not.
 */
function hasLabelWithHtmlId(idValue, context) {
    if (idValue === '') {
        return false;
    }
    const sourceCode = context.getSourceCode();
    const regex = /<Label[^>]*id[^>]*=[^>]*[{"|{'|"|']([^>'"}]*)['|"|'}|"}][^>]*>/gm;
    const m = regex.exec(sourceCode.text);
    return !!m && m.some(match => match === idValue);
}

module.exports = {
    isInsideLabelTag,
    hasLabelWithHtmlForId,
    hasLabelWithHtmlId,
};
