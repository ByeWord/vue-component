export function maxIndexOf(array) {
  if (!Array.isArray(array)) {
    throw new TypeError('')
  }
  return array.length - 1;
}