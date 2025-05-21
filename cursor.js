document.addEventListener('DOMContentLoaded', () => {
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

  function startDrag(e) {
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

  // Xuất biến và hàm ra toàn cục
  window.cursor = cursor;
  window.resetCursorPosition = function () {
    cursor.style.top = '75%';
    cursor.style.left = '75%';
  };
});
