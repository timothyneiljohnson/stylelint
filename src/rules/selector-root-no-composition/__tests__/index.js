import testRule from "../../../testUtils/stylelint-test-rule-tape"
import rule, { ruleName, messages } from ".."

testRule(rule, {
  ruleName,
  config: [undefined],

  accept: [ {
    code: ":root {}",
  }, {
    code: "   :root\n {}",
  } ],

  reject: [ {
    code: "a, :root {}",
    message: messages.rejected,
  }, {
    code: ":root, a {}",
    message: messages.rejected,
  }, {
    code: ":root + a {}",
    message: messages.rejected,
  }, {
    code: "body, .foo, :root + a {}",
    message: messages.rejected,
  }, {
    code: "html:root {}",
    message: messages.rejected,
  }, {
    code: "html :root {}",
    message: messages.rejected,
  } ],
})
