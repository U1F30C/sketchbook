
const Net = require("net");
const port = 5842;
const host = "vortex.labs.overthewire.org";

function invertEndian(hexNumber = "") {
  const hexBytes = hexNumber.match(/.{2}/g);
  const invertedHexBytes = hexBytes.reverse();
  return invertedHexBytes.join("");
}

const client = new Net.Socket();
client.connect({ port: port, host: host }, function () {
  console.log("TCP connection established with the server.");
});
let buffer = Buffer.from("");

client.on("data", function (chunk) {
  buffer = Buffer.concat([buffer, chunk]);
  if (buffer.length < 16) {
    // console.log(`Received (${chunk.length}): ${chunk.toString("hex")}.`);
  } else if (buffer.length == 16) {
    const hexBuffer = buffer.toString("hex");
    console.log(`Buffer(${buffer.length}): ${hexBuffer}.`);
    const numbers = hexBuffer
      .match(/.{8}/g)
      .map(invertEndian)
      .map((n) => parseInt(n, 16));
    console.log(numbers);
    const sum = numbers.reduce((acc, n) => acc + n, 0);
    console.log(sum);
    const hexSum = sum.toString(16);
    console.log(hexSum);
    client.write(invertEndian(hexSum), "hex");
  } else {
    console.log(`(${chunk.length}): ${chunk.toString()}`);
  }
  //   client.end();
});

client.on("error", function (error) {
  console.log("Error:", error);
});

client.on("end", function () {
  console.log("Requested an end to the TCP connection");
});
