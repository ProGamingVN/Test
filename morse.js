const morseMap = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.',
  G: '--.', H: '....', I: '..', J: '.---', K: '-.-', L: '.-..',
  M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.',
  S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-',
  Y: '-.--', Z: '--..',
  0: '-----', 1: '.----', 2: '..---', 3: '...--',
  4: '....-', 5: '.....', 6: '-....', 7: '--...', 8: '---..', 9: '----.',
  ' ': '/', '.': '.', ',': '--..--'
};

function normalizeVietnamese(text) {
  return text.normalize('NFD')
             .replace(/[\u0300-\u036f]/g, '')
             .replace(/đ/g, 'd')
             .replace(/Đ/g, 'D');
}

function textToMorse(text) {
  return text.toUpperCase().split('').map(c => morseMap[c] || '').join(' ');
}
