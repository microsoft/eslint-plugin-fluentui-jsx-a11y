// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.



"use strict";

const { getProp, getPropValue } = require("jsx-ast-utils");

var hasProp = require("jsx-ast-utils").hasProp;
var elementType = require("jsx-ast-utils").elementType;

const {isInsideLabelTag, hasLabelWithHtmlForId} = require("../util/labelUtils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    // possible error messages for the rule
    messages: {
        missingLabelOnInput: "Input must have a aria label associated with it",
    },
    // "problem" means the rule is identifying code that either will cause an error or may cause a confusing behavior: https://eslint.org/docs/latest/developer-guide/working-with-rules
    type: "problem",
    // docs for the rule
    docs: {
        description: "Accessibility: Inputs must have accessible labelling: aria-label, aria-labelledby or an associated label",
        recommended: true,
        url: "https://www.w3.org/WAI/tutorials/forms/labels/" // URL to the documentation page for this rule
    },
    schema: []
},

  create(context) {

    const reportError = (node) => {
      context.report({
          node,
          messageId: `missingLabelOnInput`
      });
    }

    return {
        // visitor functions for different types of nodes
        JSXOpeningElement(node) {
            // if it is not a button, return
            if (elementType(node) !== "Input") {
              return;
            }

            const hasLabelOnInput = 
            hasProp(node.attributes, "label") ||
            hasProp(node.attributes, "title");


            const hasAccessibleLabelling =
            hasProp(node.attributes, "aria-label") ||
            hasProp(node.attributes, "aria-labelledby");

            const idValue = getPropValue(getProp(node.attributes, "id"));

            if (isInsideLabelTag(context) || hasLabelWithHtmlForId(idValue, context) || hasAccessibleLabelling || hasLabelOnInput) {
              return;
            }

            reportError(node);
            return;
        }
    };
  }
};
