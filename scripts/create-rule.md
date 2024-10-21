# Rule Generator

```bash
$ node scripts/create-rule.js rule-name --author="Your name" --description="Description of the rule"
# OR with npm script alias
$ npm run create -- rule-name -- --author="Auz" --description="A cool rule"
```

This script will generate three files with basic boilerplate for the given rule:

1. lib/rules/${rule-name}.js
2. tests/lib/rules/${rule-name}-test.js
3. docs/rules/${rule-name}.md

It will also update the following `index.ts` files:

1. lib/index.ts
2. lib/rules/index.ts

If the rule already exists or is not specified in the correct format, an error will be thrown.

If we wanted to scaffold a rule for `no-marquee`, we could run:

```bash
$ node scripts/create-rule.js no-marquee --author="Ethan Cohen <@evcohen>" --description="Enforce <marquee> elements are not used."
# OR
$ npm run create -- no-marquee --author="Ethan Cohen <@evcohen>" --description="Enforce <marquee> elements are not used."
```

## Debug this script

addRuleToIndex.js

```bash
jscodeshift ./lib/index.ts -t ./scripts/addRuleToIndex.js --extensions ts --parser flow --ruleName=rule-name --rulePath=./lib/rules/rule-name.ts
```

addRuleToExportIndex.js

```bash
jscodeshift ./lib/rules/index.ts -t ./scripts/addRuleToExportIndex.js --extensions ts --parser flow --ruleName=rule-name --exportIndexFilePath=./lib/rules/index.ts
```
