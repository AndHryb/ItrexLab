function createMagSquare(n){
    let square =[];
    let squareConstant = (n*(Math.pow(n,2)+1))/2;
    function createMaze(){
        for(let i =0;i<n;i++){
            square[i]=[]
            for (let j = 0;j<n;j++){
                square[i][j] = 0;
            };
        }
    }

    if(n===1){
        square[0] = 1
    }else if(n===2){
       return 'Impossible'
    }else if(n % 2 === 1){
        createMaze();
        let centr = (n-1)/2
        square[0][centr]=1;
        function nextCell (cordinatesArr){
            let newY = cordinatesArr[0]-1;
            let newX = cordinatesArr[1]+1;
            if((newY)<0){
                newY = n-1;
            }

            if(newX>n-1){
                newX = 0;
            }

            if(square[newY][newX]!== 0){

                newY = cordinatesArr[0]+1;
                newX = cordinatesArr[1];
            }
            return [newY,newX];
        }

        let curCordinates = [0,centr];

        for(let i =1;i<(n*n)+1;i++){
            square[curCordinates[0]][curCordinates[1]]=i;
            curCordinates = nextCell(curCordinates);
        }
    }else if(n % 2 === 0 && n % 4 !== 0){
        createMaze();
        function nextCellForFirstQuater (cordinatesArr){
            let newY = cordinatesArr[0]-1;
            let newX = cordinatesArr[1]+1;
            if((newY)<0){
                newY = (n/2)-1;
            }

            if(newX>(n/2)-1){
                newX = 0;
            }

            if(square[newY][newX]!== 0){

                newY = cordinatesArr[0]+1;
                newX = cordinatesArr[1];
            }
            return [newY,newX];
        }
        let curCordinatesForFirstQuater = [0,(n/2 -1)/2];

        for(let i =1;i<(n*n)/4+1;i++){
            square[curCordinatesForFirstQuater[0]][curCordinatesForFirstQuater[1]]=i;
            curCordinatesForFirstQuater = nextCellForFirstQuater(curCordinatesForFirstQuater);
        }

        function nextCellForSecondQuater (cordinatesArr){
            let newY = cordinatesArr[0]-1;
            let newX = cordinatesArr[1]+1;
            if((newY)<0){
                newY = (n/2)-1;
            }

            if(newX > n-1){
                newX = n/2;
            }

            if(square[newY][newX]!== 0){

                newY = cordinatesArr[0]+1;
                newX = cordinatesArr[1];
            }
            return [newY,newX];
        }

        let curCordinatesForSecondQuater = [0,n/2+(n/2 -1)/2];

        for(let i =(n*n)/2+1;i<(n*n)-(n*n)/4+1;i++){
            square[curCordinatesForSecondQuater[0]][curCordinatesForSecondQuater[1]]=i;
            curCordinatesForSecondQuater = nextCellForSecondQuater(curCordinatesForSecondQuater);
        };

        function nextCellForThirdQuater (cordinatesArr){
            let newY = cordinatesArr[0]-1;
            let newX = cordinatesArr[1]+1;
            if((newY) < n/2){
                newY = n-1;
            }

            if(newX > n/2 - 1){
                newX = 0;
            }

            if(square[newY][newX]!== 0){

                newY = cordinatesArr[0]+1;
                newX = cordinatesArr[1];
            }
            return [newY,newX];
        }

        let curCordinatesForThirdQuater = [n/2,(n/2 -1)/2];

        for(let i =(n*n)-(n*n)/4+1;i<(n*n)+1;i++){
            square[curCordinatesForThirdQuater[0]][curCordinatesForThirdQuater[1]]=i;
            curCordinatesForThirdQuater = nextCellForThirdQuater(curCordinatesForThirdQuater);
        };

        function nextCellForFourthQuater (cordinatesArr){
            let newY = cordinatesArr[0]-1;
            let newX = cordinatesArr[1]+1;
            if((newY) < n/2){
                newY = n-1;
            }

            if(newX > n-1){
                newX = n/2 ;
            }

            if(square[newY][newX]!== 0){

                newY = cordinatesArr[0]+1;
                newX = cordinatesArr[1];
            }
            return [newY,newX];
        }

        let curCordinatesForFourthdQuater = [n/2,n/2+(n/2 -1)/2];

        for(let i =(n*n)/4+1;i<(n*n)/2+1;i++){
            square[curCordinatesForFourthdQuater[0]][curCordinatesForFourthdQuater[1]]=i;
            curCordinatesForFourthdQuater = nextCellForFourthQuater(curCordinatesForFourthdQuater);
        };

        function reverseRows(){
            let constForFeplase = (n/2-1)/2; //эта констатата показывает сколько ячеек в ряде нужно заменить в зависимости от размера квадрата а так же середину четверти магического квадрата
            function replase(count){
                for (let i=0;i<count;i++){
                    for (let j =0;j<count;j++){
                        let swap = square[j][i];
                        square [j][i]=square[n/2+j][i];
                        square[n/2+j][i] = swap;
                        swap = square[(n/2-1)-j][i];
                        square[(n/2-1)-j][i] = square[(n-1)-j][i];
                        square[(n-1)-j][i] = swap;
                    }
                    let centralSwap =  square[constForFeplase][1+i];
                    square[constForFeplase][1+i] = square[n/2 + constForFeplase][1+i];
                    square[n/2 + constForFeplase][1+i] = centralSwap;
                }
                for (let i = 0;i < constForFeplase - 1;i++){
                    for (let j = 0;j < n/2 ;j++){
                        let swap = square[j][n-1-(constForFeplase-2)+i]  //координаты j это Y,i это X  правый край квадрата(n-1) минус количество заменяемых столбцов в правой части (constForReplase - 2 )
                        square[j][n-1-(constForFeplase-2)+i] = square[n/2+j][n-1-(constForFeplase-2)+i];
                        square[n/2+j][n-1-(constForFeplase-2)+i] = swap;
                    }
                }
            }
            replase(constForFeplase);
        }
        reverseRows();
    }else if(n % 4 === 0){
        createMaze();
        let sizeMiniSquare = n/4;
        console.log(sizeMiniSquare);

        function fillMiniSquare(){

            let number = 1;
            console.log(n-sizeMiniSquare)

            for(let j = 0;j<n;j++){
                for(let i = 0;i < n;i++){

                    if(i>sizeMiniSquare-1 && i < n-sizeMiniSquare && j<sizeMiniSquare){
                        number++;
                        continue
                    }
                    if(i < sizeMiniSquare && j > sizeMiniSquare-1 && j < n -sizeMiniSquare){

                        number++;
                        continue
                    }
                    if(i > (n-1)-sizeMiniSquare && j > sizeMiniSquare-1 && j < n -sizeMiniSquare){
                        number++;
                        continue
                    }
                    if(i>sizeMiniSquare-1 && i < n-sizeMiniSquare && j> (n-1) - sizeMiniSquare){
                        number++;
                        continue
                    }

                    square[j][i] = number;
                    number++;

                }
            }

            number --;

            for(let j = 0;j<n;j++) {
                for (let i = 0; i < n; i++) {

                    if (i > sizeMiniSquare - 1 && i < n - sizeMiniSquare && j < sizeMiniSquare) {
                        square[j][i] = number;
                        number--;
                        continue
                    }
                    if (i < sizeMiniSquare && j > sizeMiniSquare - 1 && j < n - sizeMiniSquare) {
                        square[j][i] = number;
                        number--;
                        continue
                    }
                    if (i > (n - 1) - sizeMiniSquare && j > sizeMiniSquare - 1 && j < n - sizeMiniSquare) {
                        square[j][i] = number;
                        number--;
                        continue
                    }
                    if (i > sizeMiniSquare - 1 && i < n - sizeMiniSquare && j > (n - 1) - sizeMiniSquare) {
                        square[j][i] = number;
                        number--;
                        continue
                    }

                    number--

                }
            }
        }
        fillMiniSquare();
    }
    console.log(square);
    console.log(squareConstant);

}

createMagSquare(8)

