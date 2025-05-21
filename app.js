let isRunning = false;
  let isPaused = false;
  let speedMultiplier = 1;

  function togglePause() 
  {
    isPaused = !isPaused;
    document.querySelector('button[onclick="togglePause()"]').innerText = isPaused ? 'Tiếp tục' : 'Tạm dừng';
  }

