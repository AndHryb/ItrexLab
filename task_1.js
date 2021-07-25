

 function bulbInverter(blubs,invertions){

    let blubsArr = new Array();
    let invertionsData = invertions;
    let counter = 0;

    for (let i =0;i<blubs;i++){
        blubsArr[i]= false;
    }

    function setInvertions(elem,i){
        for (let j =(elem-1);j<blubsArr.length;j+=elem){
            blubsArr[j] =  !blubsArr[j] ;
        }
    }

    invertionsData.forEach(setInvertions);
    blubsArr.forEach((elem)=> {if(elem){counter++}})

     return counter;

 }
 bulbInverter(172, [19,2,7,13,40,23,16,1,45,9]);