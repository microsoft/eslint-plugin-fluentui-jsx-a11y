// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { flattenChildren } = require("./flattenChildren");
const { hasProp, getPropValue } = require("jsx-ast-utils");
const { hasNonEmptyProp } = require("./hasNonEmptyProp");
const { fluentImageComponents, imageDomNodes } = require("../applicableComponents/imageBasedComponents");

const mergedImageComponents = [...fluentImageComponents, ...imageDomNodes];

/**
 * hasLabelledChildImage - determines if a component has text content as a child e.g. <Link href="https://www.bing.com" {...props}><Image src="https://www.w3schools.com/images/img_girl.jpg" alt="abc"></Image></Link>
 * @param {*} node JSXElement
 * @returns boolean
 */
function hasLabelledChildImage(node) {
    // no children
    if (node.children == null || node.children == undefined || node.children.length === 0) {
        return false;
    }

    // Check if there is an accessible image
    const hasAccessibleImage = flattenChildren(node).some(child => {
        console.log(
            "mergedImageComponents.includes(child.openingElement.name.name)::: ",
            mergedImageComponents.includes(child.openingElement.name.name)
        );
        if (child.type === "JSXElement" && mergedImageComponents.includes(child.openingElement.name.name)) {
            console.log("here 3");
            return hasProp(child.openingElement.attributes, "aria-hidden") || getPropValue(child.openingElement.attributes, "alt")
                ? false
                : hasNonEmptyProp(child.openingElement.attributes, "title") ||
                      hasNonEmptyProp(child.openingElement.attributes, "alt") ||
                      hasNonEmptyProp(child.openingElement.attributes, "aria-label") ||
                      hasNonEmptyProp(child.openingElement.attributes, "aria-labelledby");
        }
        return false;
    });

    return hasAccessibleImage;
}

module.exports = {
    hasLabelledChildImage
};
