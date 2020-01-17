export function calVisibleHeight(element){
  let height = element.offsetHeight;
  let {paddingTop, paddingBottom, borderBottomWidth, borderTopWidth} = window.getComputedStyle(element);
  paddingTop = parseInt(paddingTop);
  paddingBottom = parseInt(paddingBottom);
  borderBottomWidth = parseInt(borderBottomWidth);
  borderTopWidth = parseInt(borderTopWidth);
  return height - paddingTop - paddingBottom - borderTopWidth - borderBottomWidth;
}