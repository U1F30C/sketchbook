// Sources:
// https://en.wikipedia.org/wiki/ID3_algorithm
// https://towardsdatascience.com/decision-trees-for-classification-id3-algorithm-explained-89df76e72df1
// https://brilliant.org/wiki/entropy-information-theory/

import { countBy, groupBy, minBy, maxBy } from "lodash";

type Data = string[][];

interface DecisionTreeRoot<KeyType> {
  children: DecisionTreeNode<KeyType>[];
}

type DecisionTreeNode<KeyType> = DecisionTreeBranch<KeyType> | DecisionTreeLeaf;

interface DecisionTreeBranch<KeyType> {
  propertyToCheck: KeyType;
  value: string;
  children: DecisionTreeNode<KeyType>[];
}

interface DecisionTreeLeaf {
  classification: string;
}

function getDataArrayAt(attributeKey: number, data: Data): string[] {
  return data.map((row) => row[attributeKey]);
}

function getClassArray(data: Data): string[] {
  return getDataArrayAt(data[0].length - 1, data);
}

function entropy(data: string[]) {
  const counts = countBy(data);
  const total = data.length;
  let sum = 0;
  for (const key in counts) {
    const p = counts[key] / total;
    sum += -p * Math.log2(p);
  }
  return sum;
}

function entropyAt<KeyType>(attributeKey: KeyType, data: Data): number {
  const splitData = groupBy(data, attributeKey as any);
  const total = data.length;
  let sum = 0;
  for (const key in splitData) {
    const groupData = splitData[key];
    const groupClassArray = getClassArray(groupData);
    const groupEntropy = entropy(groupClassArray);
    sum += (groupEntropy * groupData.length) / total;
  }

  return sum;
}

function mostCommon(data: string[]): string {
    const counts = countBy(data);
    return maxBy(Object.keys(counts), (key) => counts[key])!;
    }

function _id3<KeyType>(
  data: Data,
  attributes: KeyType[] = [],
  debugKey?: string
): (DecisionTreeBranch<KeyType> | DecisionTreeLeaf)[] {
  const classArray = getClassArray(data);
  const classEntropy = entropy(classArray);

  console.log("split on ", debugKey, ": ", classArray, classEntropy);    

  if (classEntropy === 0) {
    const classification = classArray[0];
    return [
      {
        classification,
      },
    ];
  }

  // if no conclussion can be made but no attributes left
  if (attributes.length === 0) {
    return [
      {
        classification: mostCommon(classArray),
      },
    ];
  }


  const entropies = attributes.map((attributeKey) => {
    return {
      attributeKey,
      entropy: entropyAt(attributeKey, data),
    };
  });

  const minEntropy = minBy(entropies, "entropy");

  const splitData = groupBy(data, minEntropy!.attributeKey as any);
  const groupKeys = Object.keys(splitData);
  // if the attribute has no discrimination power
  if (groupKeys.length === 1) {
    console.log("no discrimination power", minEntropy!.attributeKey, "selecting most common class from", classArray);
    return [
      {
        classification: mostCommon(classArray),
      },
    ];
  }

  const children = groupKeys.map((partitionKey) => {
    let childData = splitData[partitionKey];
    return {
      propertyToCheck: minEntropy!.attributeKey,
      value: partitionKey,
      children: _id3(childData, attributes.filter((a) => a !== minEntropy!.attributeKey), debugKey+" -> "+minEntropy!.attributeKey+"-"+partitionKey),
    } as DecisionTreeBranch<KeyType>;
  });

  return children;
}

export function id3<KeyType>(data: Data): DecisionTreeRoot<KeyType> {
    const attributes: KeyType[] = data[0].slice(0, -1).map((_, i) => i as KeyType);
  return {
    children: _id3(data, attributes, ""),
  };
}

export function evaluateId3<KeyType extends keyof T, T>(
  tree: DecisionTreeRoot<KeyType>,
  sample: T
): string {
  let node = tree;
  while (true) {
    for (const child of node.children) {
      if ("classification" in child) {
        return child.classification;
      }

      const branch = child as DecisionTreeBranch<KeyType>;
      if (sample[branch.propertyToCheck] === branch.value) {
        node = branch;
        break;
      }
    }
  }
}

// ["Fever", "Cough", "Breathing", "Infected"]
const data = [
  ["NO", "NO", "NO", "NO"],
  ["YES", "YES", "YES", "YES"],
  ["YES", "YES", "NO", "NO"],
  ["YES", "NO", "YES", "YES"],
  ["YES", "YES", "YES", "YES"],
  ["NO", "YES", "NO", "NO"],
  ["YES", "NO", "YES", "YES"],
  ["YES", "NO", "YES", "YES"],
  ["NO", "YES", "YES", "YES"],
  ["YES", "YES", "NO", "YES"],
  ["NO", "YES", "NO", "NO"],
  ["NO", "YES", "YES", "YES"],
  ["NO", "YES", "YES", "NO"],
  ["YES", "YES", "NO", "NO"],
];

const decisionTree = id3<number>(data);

let sample1 = ["YES", "YES", "YES"];
console.log(sample1, evaluateId3(decisionTree, sample1));
let sample2 = ["YES", "YES", "NO"];
console.log(sample2, evaluateId3(decisionTree, sample2));
let sample3 = ["YES", "NO", "YES"];
console.log(sample3, evaluateId3(decisionTree, sample3));
