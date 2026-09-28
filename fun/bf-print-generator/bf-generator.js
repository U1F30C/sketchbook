// generates a bf program that prints output
// node bf-generator.js > test.bf; bf test.bf

function generateBfPrinter(output) {
  const base = 10;
  const charCodeDescriptors = output
    .split("")
    .map((char) => char.charCodeAt(0))
    .map((charCode) => {
      const quotient = Math.floor(charCode / base);
      const remainder = charCode % base;
      return { charCode, quotient, remainder };
    });
  return formatProgram(charCodeDescriptors, base);
}

function formatProgram(descriptors, base) {
  const baseCounterIncrement = "".padEnd(base, "+");
  const quotientMultiplicationIncrements = descriptors.map((descriptor) => {
    return `> ` + "".padEnd(descriptor.quotient, "+");
  });
  const remainderIncrements = descriptors.map((descriptor) => {
    return `> ` + "".padEnd(descriptor.remainder, "+");
  });
  return `
    > ${baseCounterIncrement}
    [
        ${quotientMultiplicationIncrements.join(" ")}
        >+ //newline
        <[<]>-
    ]
    
    ${remainderIncrements.join(" ")}
    <[<]>
    //print
    [.>]
`;
}

console.log(generateBfPrinter("hello world"));
