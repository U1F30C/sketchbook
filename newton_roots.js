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
console.log(root(16, 2), Math.sqrt(16))
console.log(root(5, 2), Math.sqrt(5))
console.log(root(27, 3))