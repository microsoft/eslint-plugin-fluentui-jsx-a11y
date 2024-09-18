/**
 * Checks if the element is nested within a Label tag.
 * e.g.
 *       <Label>
 *           Sample input
 *           <Input {...props} />
 *       </Label>
 * @param {*} context
 * @returns
 */
export function isInsideLabelTag(context: any): any;
/**
 * Checks if there is a Label component inside the source code with a htmlFor attribute matching that of the id parameter.
 * e.g.
 * id=parameter, <Label htmlFor={parameter}>Hello</Label>
 * @param {*} idValue
 * @param {*} context
 * @returns boolean for match found or not.
 */
export function hasLabelWithHtmlForId(idValue: any, context: any): boolean;
/**
 * Checks if there is a Label component inside the source code with an id matching that of the id parameter.
 * e.g.
 * id=parameter, <Label id={parameter}>Hello</Label>
 * @param {*} idValue value of the props id e.g. <Label id={'my-value'} />
 * @param {*} context
 * @returns boolean for match found or not.
 */
export function hasLabelWithHtmlId(idValue: any, context: any): boolean;
/**
 * Determines if the element has a label with the matching id associated with it via aria-labelledby.
 * e.g.
 * <Label id={labelId}>Sample input</Label>
 * <Input aria-labelledby={labelId} />
 * @param {*} openingElement
 * @param {*} context
 * @returns boolean for match found or not.
 */
export function hasAssociatedLabelViaAriaLabelledBy(openingElement: any, context: any): boolean;
/**
 * Determines if the element has a label associated with it via htmlFor
 * e.g.
 * <Label htmlFor={inputId}>Sample input</Label>
 * <Input id={inputId} />
 * @param {*} openingElement
 * @param {*} context
 * @returns boolean for match found or not.
 */
export function hasAssociatedLabelViaHtmlFor(openingElement: any, context: any): boolean;
//# sourceMappingURL=labelUtils.d.ts.map