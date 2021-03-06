import testRule from "../../../testUtils/stylelint-test-rule-tape"
import rule, { ruleName, messages } from ".."

testRule(rule, {
  ruleName,
  config: ["always"],

  accept: [ {
    code: "@import url(x.com?a=b,c=d)",
  }, {
    code: "@media (max-width: 600px) {}",
  }, {
    code: "@media screen and (color),\nprojection and (color) {}",
  }, {
    code: "@media screen and (color) ,\n  projection and (color) {}",
  }, {
    code: "@media screen and (color) ,\r\n  projection and (color) {}",
    description: "CRLF",
  }, {
    code: "@media screen and (color)\n,\n\t\t\tprojection and (color) {}",
    description: "indentation after the newline after the comma",
  }, {
    code: "@media screen and (color)\r\n,\r\n\t\t\tprojection and (color) {}",
    description: "indentation after the CRLF after the comma",
  } ],

  reject: [ {
    code: "@media screen and (color),projection and (color)",
    message: messages.expectedAfter(),
    line: 1,
    column: 26,
  }, {
    code: "@media screen and (color), projection and (color)",
    message: messages.expectedAfter(),
    line: 1,
    column: 26,
  }, {
    code: "@media screen and (color),  projection and (color)",
    message: messages.expectedAfter(),
    line: 1,
    column: 26,
  }, {
    code: "@media screen and (color),\tprojection and (color)",
    message: messages.expectedAfter(),
    line: 1,
    column: 26,
  } ],
})

testRule(rule, {
  ruleName,
  config: ["always-multi-line"],

  accept: [ {
    code: "@media screen and (color),\nprojection and (color) {}",
    description: "multi-line list, single-line block",
  }, {
    code: "@media screen and (color),\r\nprojection and (color) {}",
    description: "multi-line list, single-line block and CRLF",
  }, {
    code: "@media screen and (color),\nprojection and (color) {\n}",
    description: "multi-line list, multi-line block",
  }, {
    code: "@media screen and (color),projection and (color) {}",
    description: "ignore single line list, single-lint block",
  }, {
    code: "@media screen and (color),projection and (color) {\n}",
    description: "ignore single line list, multi-line block",
  }, {
    code: "@media screen and (color),projection and (color) {\r\n}",
    description: "ignore single line list, multi-line block and CRLF",
  } ],

  reject: [ {
    code: "@media screen and (color),projection and (color),\nprint {}",
    message: messages.expectedAfterMultiLine(),
    line: 1,
    column: 26,
  }, {
    code: "@media screen and (color),projection and (color),\nprint {\n}",
    message: messages.expectedAfterMultiLine(),
    line: 1,
    column: 26,
  }, {
    code: "@media screen and (color),projection and (color),\r\nprint {\r\n}",
    description: "CRLF",
    message: messages.expectedAfterMultiLine(),
    line: 1,
    column: 26,
  } ],
})

testRule(rule, {
  ruleName,
  config: ["never-multi-line"],

  accept: [ {
    code: "@media screen and (color)\n,projection and (color) {}",
    description: "multi-line list, single-line block",
  }, {
    code: "@media screen and (color)\r\n,projection and (color) {}",
    description: "multi-line list, single-line block and CRLF",
  }, {
    code: "@media screen and (color)\n,projection and (color) {\n}",
    description: "multi-line list, multi-line block",
  }, {
    code: "@media screen and (color)\r\n,projection and (color) {\r\n}",
    description: "multi-line list, multi-line block and CRLF",
  }, {
    code: "@media screen and (color), projection and (color) {}",
    description: "ignore single line list, single-lint block",
  }, {
    code: "@media screen and (color), projection and (color) {\n}",
    description: "ignore single line list, multi-line block",
  } ],

  reject: [ {
    code: "@media screen and (color) ,projection and (color),\nprint {}",
    message: messages.rejectedAfterMultiLine(),
    line: 1,
    column: 50,
  }, {
    code: "@media screen and (color) ,projection and (color),\nprint {\n}",
    message: messages.rejectedAfterMultiLine(),
    line: 1,
    column: 50,
  }, {
    code: "@media screen and (color) ,projection and (color),\r\nprint {\r\n}",
    description: "CRLF",
    message: messages.rejectedAfterMultiLine(),
    line: 1,
    column: 50,
  } ],
})
