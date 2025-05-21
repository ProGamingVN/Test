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

  function showDetail(book) 
  {
    resetCursorPosition();
    document.getElementById("home").classList.add("hidden");
    document.getElementById("detail").classList.remove("hidden");

    let title = book === 'toan' ? 'Sách Toán lớp 9' : 'Sách Ngữ Văn lớp 9';
    document.getElementById("bookTitle").innerText = title;

    fetch(`data/${book}.txt`)
      .then(res => res.text())
      .then(text => {
        document.getElementById("bookInfo").innerText = text;
        const morse = textToMorse(normalizeVietnamese(text));
        document.getElementById("morse").innerHTML = morse.split('').map((c, i) => `<span id="m${i}">${c}</span>`).join('');
      });
  }

  function identify() 
  {
    const text = cursor.innerText;
    if (!text) {
      alert("Di chuyển cursor đến nút có nội dung cần rung!");
      return;
    }

    const morse = textToMorse(normalizeVietnamese(text));
    document.getElementById("morse").innerHTML = morse.split('').map((c, i) => `<span id="m${i}">${c}</span>`).join('');
    vibrateMorse();
  }

  function vibrateMorse() {
    if (isRunning) return;
    const spans = document.querySelectorAll("#morse span");
    let i = 0;
    isRunning = true;

    function step() {
      if (!isRunning || i >= spans.length) {
        isRunning = false;
        return;
      }
      if (isPaused) {
        setTimeout(step, 200);
        return;
      }

      spans.forEach(span => span.style.background = '');
      spans[i].style.background = "yellow";

      const c = spans[i].innerText;
      const dur = c === '.' ? 100 : c === '-' ? 300 : 0;
      navigator.vibrate(dur);

      i++;
      setTimeout(step, (dur + 150) / speedMultiplier);
    }
    step();
  }

  function changeSpeed() {
    speedMultiplier = speedMultiplier === 1 ? 2 : speedMultiplier === 2 ? 0.5 : 1;
    document.getElementById("speedLabel").innerText = `${speedMultiplier}x`;
  }

  function goHome() {
    resetCursorPosition();
    navigator.vibrate(0);
    isRunning = false;
    isPaused = false;
    document.querySelectorAll("#morse span").forEach(span => span.style.background = '');
    document.getElementById("home").classList.remove("hidden");
    document.getElementById("detail").classList.add("hidden");
    document.getElementById("morse").innerHTML = '';
    const pauseBtn = document.querySelector('button[onclick="togglePause()"]');
    if (pauseBtn) pauseBtn.innerText = 'Tạm dừng';
  }

  function resetCursorPosition() {
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
