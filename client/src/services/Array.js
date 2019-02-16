export function arrayShuffle(array) {
  for (let i = array.length - 1; i >= 0; i -= 1) {
    let rand = Math.floor(Math.random() * (i + 1));
    [array[i], array[rand]] = [array[rand], array[i]];
  }

  return array;
}

export function flatten(array) {
  return array.reduce((a, c) => {
    return Array.isArray(c) ? a.concat(flatten(c)) : a.concat(c);
  }, []);
}

export function splitArray(array, part) {
  const tmp = [];
  for (let i = 0; i < array.length; i += part) {
    tmp.push(array.slice(i, i + part));
  }
  return tmp;
}
