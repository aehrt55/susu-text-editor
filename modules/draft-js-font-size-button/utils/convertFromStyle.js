export default function convertFromStyle(style) {
  return style.replace(/^FontSize-(\d+)$/, '$1');
}
