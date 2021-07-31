const SumNumbers = require('./sum_numbers.js');

class DividingNumbers extends SumNumbers {
  constructor(num1, num2, flag = 'arabic') {
    super();
    this.num1 = num1;
    this.num2 = num2;
    this.flag = flag;
    this.dividing = Math.round(parseInt(this.num1) / parseInt(this.num2));
  }

  getDividing() {
    if (this.flag === 'arabic') {
      return this.dividing;
    }
    if (this.flag === 'roman') {
      return this.getRoman(this.dividing);
    } if (this.flag === 'morse') {
      return this.getMorse(this.dividing);
    }
  }
}

module.exports = DividingNumbers;
