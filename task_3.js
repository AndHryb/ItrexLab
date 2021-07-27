
function calculateTime(n,x,y){

    let numberOfCopies = n;
    let spentSeconds = 0;

    if(x>y){
        spentSeconds += y;
        numberOfCopies--;
    }else if(y>x){
        spentSeconds +=x;
        numberOfCopies--;
    }else {
        spentSeconds +=x;
        numberOfCopies--;
    }

    while(numberOfCopies>0){

          spentSeconds++

        if(spentSeconds % x === 0 ){
            numberOfCopies --;
        }
        if(spentSeconds%y === 0 ){
            numberOfCopies --;
        }
    }
    return spentSeconds;
}


console.log(calculateTime(4,1,1));
