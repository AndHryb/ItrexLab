//аргументом передаем старртовое значение

let numHandler = function(num) {

  let startValue = num;

  let sumValue = 2;

  return function() {

    if (startValue % 5 === 0 & !(startValue === 0)) {

      sumValue = 3;

      startValue /= 5;

      return startValue;

    }

    if (startValue % 7 === 0 & !(startValue === 0)) {

      sumValue = 1;

      startValue -= 7;

      return startValue;

    }

    return startValue += sumValue;

  }

}

for (let i = 1; i < 20; i++) {
  let someValue = Math.floor(Math.random() * 10) + 1;
  console.log(`
    Вызванно с аргументом ${someValue}
    возращаемое значение ${numHandler(someValue)()}`);
}