export default function customStyleFn(inlineStyle) {
  return inlineStyle.reduce((styleObj, style) => {
    if (/^FontSize-/.test(style)) {
      styleObj.fontSize = style.replace(/^FontSize-(\d+)$/, '$1px');
    }
    return styleObj;
  }, {});
}
