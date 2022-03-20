function factorial(x) {
  if (x == 0) return 1
  return x * factorial(x - 1);
}

function taylorSum(x, delta, starPower) {
  let sum = true;
  let current = 0;
  let previous = x;
  let power = starPower;
  while (Math.abs(previous - current) > delta) {
    previous = current;
    const nextTerm = Math.pow(x, power) / factorial(power);
    if (sum)
      current += nextTerm;
    else
      current -= nextTerm;
    power += 2;
    sum = !sum;
  }
  return current;
}

function sin(x, delta = Number.EPSILON) {
  return taylorSum(x, delta, 1)
}

function cos(x, delta = Number.EPSILON) {
  return taylorSum(x, delta, 1)
}

console.log(sin(1), Math.sin(1))
console.log(sin(Math.PI), Math.sin(Math.PI))

console.log(cos(1), Math.cos(1))
console.log(cos(Math.PI), Math.cos(Math.PI))