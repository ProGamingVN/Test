let isRunning = false;
let isPaused = false;
let speedMultiplier = 1;

function togglePause() {
  isPaused = !isPaused;
  document.querySelector('button[onclick="togglePause()"]').innerText = isPaused ? 'Tiếp tục' : 'Tạm dừng';
}

function showDetail(book) {
  resetCursorPosition();
  document.getElementById("home").classList.add("hidden");
  document.getElementById("detail").classList.remove("hidden");

  const title = book === 'toan' ? 'Sách Toán lớp 9' : 'Sách Ngữ Văn lớp 9';
  document.getElementById("bookTitle").innerText = title;

  fetch(`data/${book}.txt`)
    .then(res => res.text())
    .then(text => {
      document.getElementById("bookInfo").innerText = text;
      const morse = textToMorse(normalizeVietnamese(text));
      document.getElementById("morse").innerHTML = morse.split('').map((c, i) => `<span id="m${i}">${c}</span>`).join('');
    });
}

function identify() {
  const text = window.cursor.innerText;
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
