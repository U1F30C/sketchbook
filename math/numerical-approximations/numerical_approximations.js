// Given root(x, n) = a  =>  x = a^n  =>  x^n - a = 0
//    f(x) = x^n - a
//    f'(x) = n*x^(n-1)
//    x_1 <- x_0 - (x_0^n - a)/(x_0*x^(n-1))

function root(x, n, delta = Number.EPSILON) {
  let x_1 = x / 2;
  let x_0;
  const a = x
  do {
    x_0 = x_1;
    x_1 = x_0 - (Math.pow(x_0, n) - a) / (n * Math.pow(x_0, n - 1))
  } while (Math.abs(x_0 - x_1) > delta)
  return x_1;
}

function factorial(x) {
  if (x == 0) return 1
  return x * factorial(x - 1);
}

function taylorSum(x, delta, starPower) {
  let sum = true;
  let current = 0;
  let power = starPower;
  do {
    previous = current;
    const nextTerm = Math.pow(x, power) / factorial(power);
    if (sum)
      current += nextTerm;
    else
      current -= nextTerm;
    power += 2;
    sum = !sum;
  }
  while (Math.abs(previous - current) > delta)
  return current;
}

function sin(x, delta = Number.EPSILON) {
  return taylorSum(x, delta, 1)
}

function cos(x, delta = Number.EPSILON) {
  return taylorSum(x, delta, 0)
}

console.log(sin(1), Math.sin(1))
console.log(sin(Math.PI), Math.sin(Math.PI))

console.log(cos(1), Math.cos(1))
console.log(cos(Math.PI), Math.cos(Math.PI))

console.log(root(16, 2), Math.sqrt(16))
console.log(root(5, 2), Math.sqrt(5))
console.log(root(27, 3))