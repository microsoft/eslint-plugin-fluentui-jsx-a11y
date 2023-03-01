// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

'use strict';

const { hasNonEmptyProp } = require('../util/hasNonEmptyProp');
var elementType = require('jsx-ast-utils').elementType;

var getPropValue = require('jsx-ast-utils').getPropValue;
var getProp = require('jsx-ast-utils').getProp;
const { hasLabelWithHtmlId } = require('../util/labelUtils');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        // possible error messages for the rule
        messages: {
            noUnlabelledCheckbox:
                'Accessibility: Checkbox without label must have an accessible and visual label: aria-labelledby',
        },
        // "problem" means the rule is identifying code that either will cause an error or may cause a confusing behavior: https://eslint.org/docs/latest/developer-guide/working-with-rules
        type: 'problem',
        // docs for the rule
        docs: {
            // DONE
            description:
                'Accessibility: Checkbox without label must have an accessible and visual label: aria-labelledby',
            recommended: true,
            url: 'https://www.w3.org/TR/html-aria/', // URL to the documentation page for this rule
        },
        schema: [],
    },
    // create (function) returns an object with methods that ESLint calls to “visit” nodes while traversing the abstract syntax tree
    create(context) {
        return {
            // visitor functions for different types of nodes
            JSXOpeningElement(node) {
                // if it is not a Checkbox, return
                if (elementType(node) !== 'Checkbox') {
                    return;
                }

                // if the Checkbox has a label, return
                if (hasNonEmptyProp(node.attributes, 'label')) {
                    return;
                }

                const hasAccessibleLabelling = hasNonEmptyProp(node.attributes, 'aria-labelledby');
                const idValue = getPropValue(getProp(node.attributes, 'aria-labelledby'));
                const hasHtmlId = hasLabelWithHtmlId(idValue, context);

                // if it has no visual labelling, report error
                if (!hasHtmlId || !hasAccessibleLabelling) {
                    context.report({
                        node,
                        messageId: `noUnlabelledCheckbox`,
                    });
                }
            },
        };
    },
};
