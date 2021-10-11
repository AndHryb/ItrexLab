const SumNumbers = require('./sum_numbers.js');

class SubtractionNumbers extends SumNumbers{
    constructor(num1,num2,flag = 'arabic') {
        super();
        this.num1 = num1;
        this.num2 = num2;
        this.flag = flag;
        this.subtraction = parseInt(this.num1) - parseInt(this.num2);
    }

    getSubtraction(){
        if(this.flag === 'arabic'){
            return this.subtraction
        }
        if(this.flag ==='roman'){
            return  this.getRoman(this.subtraction);
        }if(this.flag ==='morse'){
            return  this.getMorse(this.subtraction)
        }

    }
}

module.exports = SubtractionNumbers;

