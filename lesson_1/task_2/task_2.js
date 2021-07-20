let startValue = 7;

let sumValue;

function numHandler() {

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
  sumValue = 2;

  startValue += 2;

  return startValue;

}
