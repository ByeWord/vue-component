export function calVisibleHeight(element) {
  let height = element.offsetHeight;
  let {paddingTop, paddingBottom, borderBottomWidth, borderTopWidth} = window.getComputedStyle(element);
  paddingTop = parseInt(paddingTop);
  paddingBottom = parseInt(paddingBottom);
  borderBottomWidth = parseInt(borderBottomWidth);
  borderTopWidth = parseInt(borderTopWidth);
  return height - paddingTop - paddingBottom - borderTopWidth - borderBottomWidth;
}

export function bindMoveDragByPos(el) {
  let start = {};
  let end = {};
  let dif = {};
  let isMoving = false;
  el.addEventListener('mousedown', (e) => {
    isMoving = true;
    start = {x: e.pageX, y: e.pageY};
    let difX = e.pageX - el.offsetLeft;
    let difY = e.pageY - el.offsetTop;
    dif = {difX, difY};
  });
  document.addEventListener('mousemove', (e) => {
    if (isMoving) {
      end = {x: e.pageX, y: e.pageY};
      let offsetX = e.pageX - dif.difX;
      let offsetY = e.pageY - dif.difY;
      el.style.left = offsetX + 'px';
      el.style.top = offsetY + 'px';
    }
  });
  document.addEventListener('mouseup', (e) => {
    isMoving = false;
    console.log('translateY', end.y - start.y)
  });
}

export function bindMoveDragByTrans(el) {
  let start = {};
  let isMoving = false;
  let translate = {x: 0, y: 0, z: 1};
  el.addEventListener('mousedown', (e) => {
    isMoving = true;
    start = {x: e.pageX, y: e.pageY};
    console.log('mousedown');

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseup', handleMouseUp);
  });


  function handleMouseMove(e) {
    console.log('mousemove');
    if (isMoving) {
      let end = {x: e.pageX, y: e.pageY};
      let deltaX = end.x - start.x;
      let deltaY = end.y - start.y;
      start = end;
      translate.x = translate.x + deltaX;
      translate.y = translate.y + deltaY;
      el.style.transform = `translate3d(${translate.x}px,${translate.y}px,${translate.z}px)`;
    }
  }

  function handleMouseUp(e) {
    isMoving = false;
    el.removeEventListener('mousemove', handleMouseMove);
    el.removeEventListener('mouseup', handleMouseUp);
  }
}