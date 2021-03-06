import testRule from "../../../testUtils/stylelint-test-rule-tape"
import rule, { ruleName } from ".."

testRule(rule, {
  ruleName,
  config: [2],
  skipBasicChecks: true,

  accept: [ {
    code: ".foo {\n" +
    "  color: rgb(0, 0, 0);\n" +
    "}",
  }, {
    code: ".foo {\n" +
    "  color: rgb(\n" +
    "    0,\n" +
    "    0,\n" +
    "    0\n" +
    "  );\n" +
    "}",
  }, {
    code: ".foo {\n" +
    "  color: rgb(\n" +
    "      0,\n" +
    "      0,\n" +
    "      0\n" +
    "    );\n" +
    "}",
  }, {
    code: ".foo {\n" +
    "  color: rgb(\n" +
    "0,\n" +
    "0,\n" +
    "0\n" +
    "    );\n" +
    "}",
  }, {
    code: ".foo {\n" +
    "  color: bar(\n" +
    "    rgb(\n" +
    "      0,\n" +
    "      0,\n" +
    "      0\n" +
    "    )\n" +
    "  );\n" +
    "}",
  }, {
    code: ".foo {\n" +
    "  color: bar(\n" +
    "      rgb(\n" +
    "        0,\n" +
    "        0,\n" +
    "        0\n" +
    "      )\n" +
    "    );\n" +
    "}",
  } ],
})
