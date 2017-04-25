import convertFromStyle from './utils/convertFromStyle';
import toRgbaString from './utils/toRgbaString';

export default function customStyleFn(inlineStyle) {
  return inlineStyle.reduce((styleObj, style) => {
    if (/^Color-/.test(style)) {
      styleObj.color = toRgbaString(convertFromStyle(style));;
    }
    return styleObj;
  }, {});
}
