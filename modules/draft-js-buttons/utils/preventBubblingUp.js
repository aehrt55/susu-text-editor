export default function preventBubblingUp(event) {
  event.preventDefault();
  event.stopPropagation();
}
