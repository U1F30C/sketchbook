import * as tf from "@tensorflow/tfjs";
import { plot } from "asciichart";

async function main() {
  // Data
  const xs = tf.tensor2d([-40, -10, 0, 8, 15, 22, 38], [7, 1]);
  const ys = tf.tensor2d([-40, 14, 32, 46.4, 59, 71.6, 100.4], [7, 1]);

  // Model
  const model = tf.sequential();
  // model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
  model.add(tf.layers.dense({ units: 3, inputShape: [1] }));
  model.add(tf.layers.dense({ units: 3 }));
  model.add(tf.layers.dense({ units: 1 }));

  // model.compile({ loss: "meanSquaredError", optimizer: "sgd" });

  model.compile({
    loss: "meanSquaredError",
    optimizer: tf.OptimizerConstructors.adam(0.1),
  });

  // Train the model.
  const history = await model.fit(xs, ys, { epochs: 1000, verbose: 1 });
  const lossHistory = history.history.loss;
  console.log(plot(<number[]>lossHistory, { height: 32 }));

  //  Check
  const result = model.predict(tf.tensor2d([0], [1, 1]));

  console.log(result.toString());
  console.log(
    [-40, -10, 0, 8, 15, 22, 38].map((value) =>
      model.predict(tf.tensor2d([value], [1, 1])).toString()
    )
  );
}

main();