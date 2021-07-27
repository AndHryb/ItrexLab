function dispenseChapter(chapterArr,amountOfVolume){

    if(chapterArr.length<amountOfVolume){
        return 'the data is incorrect'
    }

    let chapters = chapterArr;


    function sumMinNeighbors(arr){
        let arrForProcessing = arr;
        let minSum = arrForProcessing[0] + arrForProcessing[1] ;
        let numFirstNeighbour = 0;
        let numSecondNeighbour = 1;

        for (let i = 1; i<arrForProcessing.length; i++){
            let curSum = arrForProcessing[i]+arrForProcessing[i+1];
            if(curSum<minSum){
                minSum = curSum;
                numFirstNeighbour = i;
                numSecondNeighbour = i+1;
            }
        }
        arrForProcessing[numFirstNeighbour] = minSum;
        arrForProcessing.splice(numSecondNeighbour,1);
        return arrForProcessing
    }

    while (chapters.length>amountOfVolume){

        chapters = sumMinNeighbors(chapters);

    }
    return Math.max(...chapters)
}

console.log(dispenseChapter([1,2,1],2));//3

console.log(dispenseChapter([1,2,1,1],3));//2