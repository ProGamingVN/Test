const morseMap = 
  {
    A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.',
    G: '--.', H: '....', I: '..', J: '.---', K: '-.-', L: '.-..',
    M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.',
    S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-',
    Y: '-.--', Z: '--..',
    0: '-----', 1: '.----', 2: '..---', 3: '...--',
    4: '....-', 5: '.....', 6: '-....', 7: '--...', 8: '---..', 9: '----.',
    ' ': '/', '.': '.', ',': '--..--'
  };

  

  function normalizeVietnamese(text) 
  {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
  }

  function textToMorse(text) 
  {
    return text.toUpperCase().split('').map(c => morseMap[c] || '').join(' ');
  }

  function resetCursorPosition() 
  {
    cursor.style.top = '75%';
    cursor.style.left = '75%';
  }

  const cursor = document.getElementById('cursor');
  let offsetX = 0, offsetY = 0, dragging = false;

  cursor.addEventListener('mousedown', startDrag);
  cursor.addEventListener('touchstart', startDrag);
  document.addEventListener('mousemove', drag);
  document.addEventListener('touchmove', drag);
  document.addEventListener('mouseup', endDrag);
  document.addEventListener('touchend', endDrag);

  cursor.addEventListener('mousedown', () => navigator.vibrate(100));
  cursor.addEventListener('touchstart', () => navigator.vibrate(100));

  function startDrag(e) 
  {
    document.body.classList.add('noscroll');
    dragging = true;
    const evt = e.touches ? e.touches[0] : e;
    offsetX = evt.clientX - cursor.offsetLeft;
    offsetY = evt.clientY - cursor.offsetTop;
  }

  function drag(e) {
    if (!dragging) return;
    const evt = e.touches ? e.touches[0] : e;
    const x = evt.clientX - offsetX;
    const y = evt.clientY - offsetY;
    cursor.style.left = x + 'px';
    cursor.style.top = y + 'px';
  }

  function endDrag() {
    document.body.classList.remove('noscroll');
    dragging = false;
  }
