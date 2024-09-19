export let rules: {
    "checkbox-needs-labelling": {
        meta: {
            messages: {
                noUnlabelledCheckbox: string;
            };
            type: string;
            docs: {
                description: string;
                recommended: boolean;
                url: string;
            };
            schema: never[];
        };
        create(context: any): {
            JSXOpeningElement(node: any): void;
        };
    };
    "image-button-missing-aria": {
        meta: {
            messages: {
                missingAriaLabel: string;
            };
            type: string;
            docs: {
                description: string;
                recommended: boolean;
                url: string;
            };
            schema: never[];
        };
        create(context: any): {
            JSXElement(node: any): void;
        };
    };
    "image-link-missing-aria": import("eslint").Rule.RuleModule;
    "input-components-require-accessible-name": {
        meta: {
            messages: {
                missingLabelOnInput: string;
            };
            type: string;
            docs: {
                description: string;
                recommended: boolean;
                url: string;
            };
            schema: never[];
        };
        create(context: any): {
            JSXOpeningElement(node: any): void;
        };
    };
    "menu-item-needs-labelling": import("eslint").Rule.RuleModule;
    "switch-needs-labelling": {
        meta: {
            messages: {
                noUnlabelledSwitch: string;
            };
            type: string;
            docs: {
                description: string;
                recommended: boolean;
                url: string;
            };
            schema: never[];
        };
        create(context: any): {
            JSXOpeningElement(node: any): void;
        };
    };
    "toolbar-missing-aria": import("eslint").Rule.RuleModule;
    "combobox-needs-labelling": import("eslint").Rule.RuleModule;
    "no-empty-components": import("eslint").Rule.RuleModule;
    "accordion-header-needs-labelling": import("eslint").Rule.RuleModule;
    "accordion-item-needs-header-and-panel": import("eslint").Rule.RuleModule;
    "compound-button-needs-labelling": {
        meta: {
            messages: {
                missingAriaLabel: string;
            };
            type: string;
            docs: {
                description: string;
                recommended: boolean;
                url: string;
            };
            schema: never[];
        };
        create(context: any): {
            JSXElement(node: any): void;
        };
    };
    "no-empty-buttons": {
        meta: {
            messages: {
                noEmptyButtons: string;
            };
            type: string;
            docs: {
                description: string;
                recommended: boolean;
                url: string;
            };
            schema: never[];
        };
        create(context: any): {
            JSXElement(node: any): any;
        };
    };
    "spin-button-needs-labelling": {
        meta: {
            messages: {
                noUnlabelledSpinButton: string;
            };
            type: string;
            docs: {
                description: string;
                recommended: boolean;
                url: string;
            };
            schema: never[];
        };
        create(context: any): {
            JSXOpeningElement(node: any): void;
        };
    };
    "spin-button-unrecommended-labelling": {
        meta: {
            messages: {
                unRecommendedlabellingSpinButton: string;
            };
            type: string;
            docs: {
                description: string;
                recommended: boolean;
                url: string;
            };
            schema: never[];
        };
        create(context: any): {
            JSXOpeningElement(node: any): void;
        };
    };
    "breadcrumb-needs-labelling": import("eslint").Rule.RuleModule;
    "dropdown-needs-labelling": {
        meta: {
            messages: {
                missingLabelOrAriaLabeledByInDropdown: string;
            };
            type: string;
            docs: {
                description: string;
                recommended: boolean;
                url: null;
            };
            schema: never[];
        };
        create(context: any): {
            JSXOpeningElement(node: any): void;
        };
    };
    "tooltip-not-recommended": import("eslint").Rule.RuleModule;
    "avatar-needs-name": {
        meta: {
            messages: {
                missingAriaLabel: string;
            };
            type: string;
            docs: {
                description: string;
                recommended: boolean;
                url: string;
            };
            schema: never[];
        };
        create(context: any): {
            JSXOpeningElement(node: any): void;
        };
    };
    "radio-button-missing-label": {
        meta: {
            messages: {
                noUnlabeledRadioButton: string;
            };
            type: string;
            docs: {
                description: string;
                recommended: boolean;
                url: string;
            };
            schema: never[];
        };
        create(context: any): {
            JSXOpeningElement(node: any): void;
        };
    };
    "radiogroup-missing-label": {
        meta: {
            messages: {
                noUnlabeledRadioGroup: string;
            };
            type: string;
            docs: {
                description: string;
                recommended: boolean;
                url: string;
            };
            schema: never[];
        };
        create(context: any): {
            JSXOpeningElement(node: any): void;
        };
    };
    "prefer-aria-over-title-attribute": import("eslint").Rule.RuleModule;
    "dialogbody-needs-title-content-and-actions": import("eslint").Rule.RuleModule;
    "dialogsurface-needs-aria": import("eslint").Rule.RuleModule;
    "spinner-needs-labelling": {
        meta: {
            messages: {
                noUnlabelledSpinner: string;
            };
            type: string;
            docs: {
                description: string;
                recommended: boolean;
                url: string;
            };
            schema: never[];
        };
        create(context: any): {
            JSXOpeningElement(node: any): void;
        };
    };
    "badge-needs-accessible-name": import("eslint").Rule.RuleModule;
    "progressbar-needs-labelling": {
        meta: {
            messages: {
                noUnlabelledProgressbar: string;
            };
            type: string;
            docs: {
                description: string;
                recommended: boolean;
                url: string;
            };
            schema: never[];
        };
        create(context: any): {
            JSXOpeningElement(node: any): void;
        };
    };
};
export namespace configs {
    namespace recommended {
        let rules_1: {
            "@microsoft/fluentui-jsx-a11y/checkbox-needs-labelling": string;
            "@microsoft/fluentui-jsx-a11y/image-link-missing-aria": string;
            "@microsoft/fluentui-jsx-a11y/input-components-require-accessible-name": string;
            "@microsoft/fluentui-jsx-a11y/menu-item-needs-labelling": string;
            "@microsoft/fluentui-jsx-a11y/switch-needs-labelling": string;
            "@microsoft/fluentui-jsx-a11y/image-button-missing-aria": string;
            "@microsoft/fluentui-jsx-a11y/toolbar-missing-aria": string;
            "@microsoft/fluentui-jsx-a11y/combobox-needs-labelling": string;
            "@microsoft/fluentui-jsx-a11y/no-empty-components": string;
            "@microsoft/fluentui-jsx-a11y/accordion-header-needs-labelling": string;
            "@microsoft/fluentui-jsx-a11y/accordion-item-needs-header-and-panel": string;
            "@microsoft/fluentui-jsx-a11y/compound-button-needs-labelling": string;
            "@microsoft/fluentui-jsx-a11y/no-empty-buttons": string;
            "@microsoft/fluentui-jsx-a11y/spin-button-needs-labelling": string;
            "@microsoft/fluentui-jsx-a11y/spin-button-unrecommended-labelling": string;
            "@microsoft/fluentui-jsx-a11y/breadcrumb-needs-labelling": string;
            "@microsoft/fluentui-jsx-a11y/dropdown-needs-labelling": string;
            "@microsoft/fluentui-jsx-a11y/tooltip-not-recommended": string;
            "@microsoft/fluentui-jsx-a11y/avatar-needs-name": string;
            "@microsoft/fluentui-jsx-a11y/radio-button-missing-label": string;
            "@microsoft/fluentui-jsx-a11y/radiogroup-missing-label": string;
            "@microsoft/fluentui-jsx-a11y/prefer-aria-over-title-attribute": string;
            "@microsoft/fluentui-jsx-a11y/dialogbody-needs-title-content-and-actions": string;
            "@microsoft/fluentui-jsx-a11y/dialogsurface-needs-aria": string;
            "@microsoft/fluentui-jsx-a11y/spinner-needs-labelling": string;
            "@microsoft/fluentui-jsx-a11y/progressbar-needs-labelling": string;
        };
        export { rules_1 as rules };
    }
}
export let processors: {};
//# sourceMappingURL=index.d.ts.map