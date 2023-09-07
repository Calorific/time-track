export const hasDuplicates = array => {
  return array.some((el, idx) => array.indexOf(el) !== idx)
}