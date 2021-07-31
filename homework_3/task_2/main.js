const SumNumbers = require('./sum_numbers.js');
const MultiplicationNumbers = require('./multiplication_numbers.js');
const SubtractionNumbers = require('./subtraction_numbers.js');
const DividingNumbers = require('./dividing_numbers.js');

let anyNums = new SumNumbers(22,5,'arabic');
console.log(anyNums.getSum())

let anyNums1 = new MultiplicationNumbers(22,5,'arabic');
console.log(anyNums1.getMultiplicate());

let anyNums2 = new SubtractionNumbers(5,22,'arabic');
console.log(anyNums2.getSubtraction())

let anyNums3 = new DividingNumbers(22,5,'arabic');
console.log(anyNums3.getDividing())