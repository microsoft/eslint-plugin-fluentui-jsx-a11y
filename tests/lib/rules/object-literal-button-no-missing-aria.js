/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const RuleTester = require("eslint").RuleTester;

const rule = require("../../../lib/rules/object-literal-button-no-missing-aria");

RuleTester.setDefaultConfig({
    parser: require.resolve("@typescript-eslint/parser"),
    parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {
            jsx: true
        }
    }
});

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("object-literal-button-no-missing-aria", rule, {
    valid: [
        "var a = {};",
        "const a = {};",
        "let a = {};",
        "const b = {name: 'Submit'}",
        "var c = {key: 3}",
        "const props = { icon: <CloseIcon />, iconOnly: true, 'aria-label': 'Close' };",
        "const props = [{ icon: <CloseIcon />, iconOnly: true, 'aria-label': 'Close', title: 'Close' }];",
        "const props = [{ icon: <CloseIcon />, iconOnly: true, 'aria-label': 'Close', title: 'Close',}, { icon: <AcceptIcon />, 'aria-label': 'Accept',}];",
        "const props = { icon: <CloseIcon />, content: 'Close' };",
        "const props = { icon: <CloseIcon />, 'aria-label': 'Close' };",
        "const props: ICommandBarProps = { icon: <CloseIcon />, 'aria-label': 'Close' };",
        "const approvalCommandBarProps: IButtonProps = {buttonProps: {text: true, iconPosition: 'before', content: 'Close', disabled: 'false', onClick: '', icon: <AddIcon />}};",
        "const approvalCommandBarProps = {buttonProps: {text: true, iconPosition: 'before', content: 'Close', disabled: 'false', onClick: '', icon: <AddIcon />}};",
        "<Dialog headerAction={{icon: <CloseIcon />, 'aria-label': 'Close', title: 'Close', onClick: ''}}/>",
        "<Dialog headerAction={{icon: <CloseIcon />, 'aria-label': 'Close', title: 'Close', onClick: ''}} footerAction={{icon: <CancelIcon />, content: 'Close'}} />",
        "<Dialog headerAction={{icon: <CloseIcon />, 'aria-labelledby': 'label-id-4', title: 'Close', onClick: ''}} footerAction={{icon: <CancelIcon />, content: 'Close'}} />",
        "<Dialog headerAction={{icon: <CloseIcon />, 'aria-describedby': 'label-id-4', title: 'Close', onClick: ''}} footerAction={{icon: <CancelIcon />, content: 'Close'}} />"
    ],
    invalid: [
        {
            code: "const props = { icon: '<CloseIcon />' };",
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: "var props = { icon: '<CloseIcon />', iconOnly: true };",
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: "var props = { icon: '<CloseIcon />', iconOnly: true, title: 'Close' };",
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: "const props = [{ icon: <CloseIcon />, iconOnly: true }, { icon: <AcceptIcon />, 'aria-label': 'Accept',}];", //one valid, one not
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: "<Dialog headerAction={{icon: <CloseIcon />, title: 'Close', onClick: ''}} footerAction={{icon: <CancelIcon />, content: 'Close'}} />", // one valid, one not
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: "<Dialog headerAction={{icon: <CloseIcon />, onClick: ''}}/>",
            errors: [{ messageId: "missingAriaLabel" }]
        },
        {
            code: "const approvalCommandBarProps = {buttonProps: {text: true, iconPosition: 'before', disabled: 'false', onClick: '', icon: <AddIcon />}};",
            errors: [{ messageId: "missingAriaLabel" }]
        }
    ]
});
