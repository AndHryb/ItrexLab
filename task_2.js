function dispenseChapter(chapterArr,amountOfVolume){

    if(chapterArr.length<amountOfVolume){
        return 'the data is incorrect'
    }

    let chapters = chapterArr;

    let volumes = amountOfVolume;

    let volumesData = [];


    function minSumNeighbors(arr){
        let minSum = chapterArr[0]+chapterArr[1] ;
        let numChapters;
        for (let i = 1;i<chapterArr.length;i++){
            let curSum = chapterArr[i-1]+chapterArr[i];
            if(curSum<minSum){
                minSum = curSum;

            }
            numChapters = [i-1,i];
        }
        return {sum:minSum,neighborsChapters:numChapters}

    }

    while (chapters.length>volumes){
        let minSumData = minSumNeighbors(chapters);

        chapters.splice(minSumData.neighborsChapters[0],minSumData.neighborsChapters.length);

        volumesData.push(minSumData.sum);
        volumes--;
    }

    if(chapters.length = volumes){
        for(let i =0;i<chapters.length;i++){
            volumesData.push(chapters[i])
        }
    }
    return Math.max(...volumesData)
}

console.log(dispenseChapter([1,2,1],2));//3
console.log(dispenseChapter([1,2,1,1],3));