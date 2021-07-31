class SumNumbers {
    constructor(num1,num2,flag = 'arabic') { // flag :roman,morse,arabic
        this.num1 = num1;
        this.num2 = num2;
        this.flag = flag;
        this.sum = parseInt(this.num1)+parseInt(this.num2);
    }

    getSum(){
        if(this.flag === 'arabic'){
            return this.sum
        }
        if(this.flag ==='roman'){
            return  this.getRoman(this.sum);
        }if(this.flag ==='morse'){
            return  this.getMorse(this.sum)
        }

    }

    getRoman (num) {
        if (!+num)
            return false;
        let	digits = String(+num).split(""),
            key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
                "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
                "","I","II","III","IV","V","VI","VII","VIII","IX"],
            roman = "",
            i = 3;
        while (i--)
            roman = (key[+digits.pop() + (i * 10)] || "") + roman;
        return Array(+digits.join("") + 1).join("M") + roman;
    }

    getMorse(num){
        let digits = String(+num).split(""),

             key = { 1:".----",
                 2:"..---",
                 3:"...--",
                 4:"....-",
                 5:".....",
                 6:"-....",
                 7:"--...",
                 8:"---..",
                 9:"----.",
                 0:"-----"},

             morze = digits.map((elem,i)=>key[elem]);

        return morze.join(' ');

    }

}

module.exports = SumNumbers;

