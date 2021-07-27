let handleNum  = function (num) {

  let startValue = num;
  let sumValue = 2;

  return function () {

    if (startValue % 5 === 0 && !(startValue === 0)) {

      sumValue = 3;
      startValue /= 5;

      return startValue;
    }

      if (startValue % 7 === 0 && !(startValue === 0)) {

        sumValue = 1;
        startValue -= 7;

        return startValue;
      }
      return startValue += sumValue;
  }
}



function test() {
  let func = handleNum (0)
  for (var i = 0; i < 20; i++) {

    console.log(func());
  }
}

test();
