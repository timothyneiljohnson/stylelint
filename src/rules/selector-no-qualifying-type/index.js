'use strict';

import {
  report,
  ruleMessages,
  isAutoprefixable,
  validateOptions
} from '../../utils';

export const ruleName = 'selector-no-qualifying-type';
export const messages = ruleMessages(ruleName, {});

export default (enabled, options) => {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: enabled,
        possible: [true, false]
    }, {
      actual: options,
      possible: {
        ignore: ['attribute', 'class', 'id']
      },
      optional: true
    });

    const isElementSelector = (selector) => {
      const firstChar = selector.trim().substring(0, 1);
      return /^[a-z]+$/i.test(firstChar);
    };

    const hasAttributeQualifiedByElement = (selector) => {
      const selectorArray = selector.split(' ');
      let isFound = false;
      selectorArray.forEach((value) => {
        if (isElementSelector(value) && value.indexOf('[') > -1) {
          isFound = true;
        }
      });
      return isFound;
    };

    const hasClassQualifiedByElement = (selector) => {
      const selectorArray = selector.split(' ');
      let isFound = false;
      selectorArray.forEach((value) => {
        if (isElementSelector(value) && value.indexOf('.') > -1) {
          isFound = true;
        }
      });
      return isFound;
    };

    const hasIdQualifiedByElement = (selector) => {
      const selectorArray = selector.split(' ');
      let isFound = false;
      selectorArray.forEach((value) => {
        if (isElementSelector(value) && value.indexOf('#') > -1) {
          isFound = true;
        }
      });
      return isFound;
    };

    const checkForQualifyingElement = (rule) => {
      rule.selectors.forEach(selector => {
        // Return early if there is interpolation in the selector, or rule is set to 'false'
        if (/#{.+?}|@{.+?}|\$\(.+?\)/.test(selector) || !enabled) {
          return;
        }

        // Replace combinators with whitespace, as they not relevant to rule
        const selectorNoCombinators = selector.replace(/>|\+|~/g, ' ');

        if (options.ignore === 'attribute' && hasAttributeQualifiedByElement(selectorNoCombinators)) {
          report({
            ruleName: ruleName,
            result: result,
            node: rule,
            message: 'Avoid qualifying attribute selectors with an element'
          });
        }
        if (options.ignore === 'class' && hasClassQualifiedByElement(selectorNoCombinators)) {
          report({
            ruleName: ruleName,
            result: result,
            node: rule,
            message: 'Avoid qualifying class selectors with an element'
          });
        }
        if (options.ignore === 'id' && hasIdQualifiedByElement(selectorNoCombinators)) {
          report({
            ruleName: ruleName,
            result: result,
            node: rule,
            message: 'Avoid qualifying id selectors with an element'
          });
        }
      })
    };

    if (!validOptions) {
      return;
    }

    root.walkRules(checkForQualifyingElement);
  };
};
