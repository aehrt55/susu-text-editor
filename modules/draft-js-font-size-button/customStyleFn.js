import convertFromStyle from './utils/convertFromStyle';

export default function customStyleFn(inlineStyle) {
  return inlineStyle.reduce((styleObj, style) => {
    if (/^FontSize-/.test(style)) {
      styleObj.fontSize = `${convertFromStyle(style)}px`;
    }
    return styleObj;
  }, {});
}
