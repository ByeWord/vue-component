export function debounce(fn) {
  let timeId = null;
  return function () {
    let args = arguments;
    if (timeId) {
      window.clearTimeout(timeId)
    }
    timeId = setTimeout(() => {
      fn.apply(this, args)
    }, 200);
  }
}