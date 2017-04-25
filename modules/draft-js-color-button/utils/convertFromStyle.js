export default function convertFromStyle(style) {
  return style.replace(/^Color-(.+)$/, '$1')
  .split(',')
  .map((number) => parseFloat(number));
}
