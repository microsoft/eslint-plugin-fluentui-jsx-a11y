//Copyright (c) Microsoft Corporation.
//Licensed under the MIT License.

"use strict";

var hasProp = require("jsx-ast-utils").hasProp;
var elementType = require("jsx-ast-utils").elementType;
var getProp = require("jsx-ast-utils").getProp;
var getPropValue = require("jsx-ast-utils").getPropValue;

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    // possible error messages for the rule
    messages: {
        missingLabel: "Textarea must have a label associated with it",
    },
    // "problem" means the rule is identifying code that either will cause an error or may cause a confusing behavior: https://eslint.org/docs/latest/developer-guide/working-with-rules
    type: "problem",
    // docs for the rule
    docs: {
        description: "Accessibility: Textarea must have an accessible name",
        recommended: true,
        url: "https://www.w3.org/TR/html-aria/" // URL to the documentation page for this rule
    },
    schema: []
},

  create(context) {
    const isInsideLabelTag = () =>
    context.getAncestors().some((node) => 
      node.type === "JSXElement" && elementType(node.openingElement) === "Label"
    );

    const hasLabelWithHtmlForId = (idValue) => {
      const sourceCode = context.getSourceCode();
      const regex = /<Label[^>]*htmlFor[^>]*=[^>]*[{"|{'|"|']([^>'"}]*)['|"|'}|"}][^>]*>/gm;
        const m = regex.exec(sourceCode.text);
        return !!m && m.some((match) => match === idValue);
    }
    
    const reportError = (node) => {
      context.report({
          node,
          messageId: `missingLabel`
      });
    }

    return {
        // visitor functions for different types of nodes
        JSXOpeningElement(node) {
          
            // if it is not a button, return
            if (elementType(node) !== "Textarea") {
              return;
            }

            const hasId = hasProp(node.attributes, "id");

            if (isInsideLabelTag()) {
              return;
            }

            if (!hasId) {
              reportError(node);
              return;
            }

            const idValue = getPropValue(getProp(node.attributes, "id"));
            const hasHtmlFor = hasLabelWithHtmlForId(idValue);

            if (!hasHtmlFor) {
              reportError(node);
              return;
            }
        }
    };
  }
};
