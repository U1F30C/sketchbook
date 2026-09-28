``` js
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: magic;
const arrivalTime = new Date("2022-10-24T17:04:00.000Z");

const initialTurn = 4727;


const currentTime = new Date();

const currenMaxTurn = 4794;

const targetTurn = 4795;

const currentTimeDiff = currentTime.getTime() - arrivalTime.getTime();

const currentTurnsDiff =  currenMaxTurn - initialTurn;

const targetTurnsDiff = targetTurn - initialTurn;

const currentMsPerTurnRatio = currentTimeDiff / currentTurnsDiff;

const estimatedMsTillTarget = currentMsPerTurnRatio * targetTurnsDiff;

const estimatedTime = estimatedMsTillTarget /60/1000/60;
console.log("Arrived at: " +arrivalTime.toLocaleTimeString())
console.log(estimatedTime)

arrivalTime.setTime(arrivalTime.getTime()+ Math.round(estimatedMsTillTarget));
console.log("Likely going to be attended at: "+ arrivalTime.toLocaleTimeString())

// 14:50 approximate



```

