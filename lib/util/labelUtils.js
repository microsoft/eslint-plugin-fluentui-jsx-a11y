var elementType = require("jsx-ast-utils").elementType;

function isInsideLabelTag(context) {
    context.getAncestors().some((node) => 
      node.type === "JSXElement" && elementType(node.openingElement) === "Label" 
    );
}

function hasLabelWithHtmlForId(idValue, context) {
    if (idValue === "") {
        return false;
    }
    const sourceCode = context.getSourceCode();
    const regex = /<Label[^>]*htmlFor[^>]*=[^>]*[{"|{'|"|']([^>'"}]*)['|"|'}|"}][^>]*>/gm;
        const m = regex.exec(sourceCode.text);
        return !!m && m.some((match) => match === idValue);
}

module.exports = {
    isInsideLabelTag, 
    hasLabelWithHtmlForId
}