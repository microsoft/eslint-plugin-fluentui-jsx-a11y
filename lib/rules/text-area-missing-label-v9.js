// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

var hasProp = require("jsx-ast-utils").hasProp;
var elementType = require("jsx-ast-utils").elementType;
var getProp = require("jsx-ast-utils").getProp;
var getPropValue = require("jsx-ast-utils").getPropValue;

const {isInsideLabelTag, hasLabelWithHtmlForId} = require("../util/labelUtils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        // possible error messages for the rule
        messages: {
            missingLabel: "Textarea must have a label associated with it"
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
    // create (function) returns an object with methods that ESLint calls to “visit” nodes while traversing the abstract syntax tree
    create(context) {
        const isInsideLabelTag = () =>
            context.getAncestors().some(node => node.type === "JSXElement" && elementType(node.openingElement) === "Label");

  create(context) {
    
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

            if (isInsideLabelTag(context)) {
              return;
            }

            if (!hasId) {
              reportError(node);
              return;
            }

            const idValue = getPropValue(getProp(node.attributes, "id"));
            const hasHtmlFor = hasLabelWithHtmlForId(idValue, context);

            if (!hasHtmlFor) {
              reportError(node);
              return;
            }
        }
    };
  }
};
