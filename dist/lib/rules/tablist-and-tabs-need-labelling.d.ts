export namespace meta {
    namespace messages {
        let missingTabLabel: string;
        let missingTablistLabel: string;
    }
    let type: string;
    namespace docs {
        let description: string;
        let recommended: boolean;
        let url: string;
    }
    let schema: never[];
}
export function create(context: any): {
    JSXOpeningElement(node: any): void;
};
