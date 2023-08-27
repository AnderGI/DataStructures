export function sort(array) {
  if (array.length === 1) return array;
  const middleIndex = Math.floor(array.length / 2);
  const rightArray = array.splice(middleIndex);
  const leftArray = array;

  return merge(sort(leftArray), sort(rightArray));
}

function merge(leftArray, rightArray) {
  const orderedElements = [];
  while (leftArray.length && rightArray.length) {
    if (leftArray[0] > rightArray[0]) {
      orderedElements.push(rightArray.shift());
    } else if (leftArray[0] < rightArray[0]) {
      orderedElements.push(leftArray.shift());
    }
  }

  return [...orderedElements, ...leftArray, ...rightArray];
}
