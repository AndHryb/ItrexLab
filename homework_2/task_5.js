function countingKayaks(peopleWeightsArr,kayakTonnage){

    weights = peopleWeightsArr.sort((a, b) => a - b);
    
    kayaks = 0;

    while (weights.length>1){
        if(weights[0]+weights[weights.length-1] > kayakTonnage){
            kayaks++;
            weights.pop();
        }
        if(weights[0]+weights[weights.length-1] < kayakTonnage){
            kayaks++;
            weights.pop();
            weights.shift();
        }
    }
    if(weights.length>0){
        weights.shift();
        kayaks++
    }

    return kayaks;

};



console.log(countingKayaks([50,120,74,60,100,82],135));