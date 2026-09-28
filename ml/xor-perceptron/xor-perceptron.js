const initialWeights = [-0.2, 0.4];

const learningRate = 0.2;

class Perceptron {
  constructor(weights) {
    this.weights = weights;
  }
  predict(inputs) {
    let sum = 0;
    inputs.forEach((input, i) => {
      sum += input * this.weights[i];
    });
    return this.activate(sum);
  }
  activate(value) {
    if (value > 0) return 1;
    return 0;
  }
}
const perceptron = new Perceptron(initialWeights);

const epochs = 3;

const rules = [
  [[0, 0], 0],
  [[0, 1], 1],
  [[1, 0], 1],
  [[1, 1], 1],
];

for (let epoch = 1; epoch <= epochs; epoch++) {
  console.log("Epoch %s", epoch);
  rules.forEach(([inputs, output], i) => {
    perceptron.weights = perceptron.weights.map((weight, i) => {
      const expected = output;
      const actual = perceptron.predict(inputs);
      const diff = expected - actual;
      const newWeight = weight + learningRate * diff * inputs[i];
      console.log("actual %s", actual);
      console.log(
        "W_%s ← %s + %s * %s * %s = %s",
        i,
        weight,
        learningRate,
        diff,
        inputs[i],
        weight + learningRate * diff * inputs[i]
      );
      return newWeight;
    });
    console.log(perceptron.weights);
  });
}
