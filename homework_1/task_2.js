
//аргументом передаем старртовое значение

 function numHandler (num) {

  let sumValue = 2;

  return function () {

    if (num % 5 === 0 && !(num === 0)) {

      sumValue = 3;
      num /= 5;

      return num;
    }

      if (num % 7 === 0 &&!(num === 0)) {

        sumValue = 1;
        num -= 7;

        return num;

      }

      num += sumValue;

      return num ;
  }

}
function start() {
  let func = numHandler(0)
  for (var i = 0; i < 20; i++) {

    console.log(func());
  }
}

start();
