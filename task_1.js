function setABS(num) {
  console.log(`ABS:${num}`)
}

function setTraction(num) {
  console.log(`Traction Control:${num}`)
}

function setStability(num) {
  console.log(`Stability Control:${num}`)
}

function setDifficulty(nameMode) {
  
  let num;

  if (nameMode === 'beginner') {
    num = 5;
  }

  if (nameMode === 'god_driver') {
    num = 3;
  }
  if (nameMode === 'maniac') {
    num = 1;
  }

  setABS(num)
  setTraction(num)
  setStability(num)

}
console.log('сложновть beginner');
setDifficulty('beginner');
console.log('сложновть god_driver');
setDifficulty('god_driver');
console.log('сложновть maniac');
setDifficulty('maniac');
