const SumNumbers = require('./sum_numbers.js');

class MultiplicationNumbers extends SumNumbers{
    constructor(num1,num2,flag = 'arabic') {
        super();
        this.num1 = num1;
        this.num2 = num2;
        this.flag = flag;
        this.multiplicate = parseInt(this.num1)*parseInt(this.num2);
    }

    getMultiplicate(){
        if(this.flag === 'arabic'){
            return this.multiplicate;
        }
        if(this.flag ==='roman'){
            return  this.getRoman(this.multiplicate);
        }if(this.flag ==='morse'){
            return  this.getMorse(this.multiplicate);
        }
    }

}

module.exports = MultiplicationNumbers;

