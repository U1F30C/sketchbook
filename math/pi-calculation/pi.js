function piStep(n) {
  return (
    (
        Math.pow(-1, n)
        / (2 * n + 1)
    )
    * (
        4 / Math.pow(5, 2 * n + 1)
        - 1 / Math.pow(239, 2 * n + 1)
    )
  );
}

function calcPi(n) {
  var sum = 0;
  for (var i = 0; i <= n; i++) {
    sum += piStep(i);
  }
  return sum * 4;
}

console.log(calcPi(100000000));
// compare to built in pi
console.log(Math.PI);
