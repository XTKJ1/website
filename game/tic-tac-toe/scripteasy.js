// Mendapatkan elemen-elemen yang akan digunakan
const board = document.getElementById('board'); // Papan permainan
const message = document.getElementById('message'); // Pesan permainan
const modeInfo = document.getElementById('modeInfo'); // Informasi mode permainan
const warningMessage = document.getElementById('warningMessage'); // Pesan peringatan
const scoreXDisplay = document.getElementById('scoreX'); // Skor pemain X
const scoreODisplay = document.getElementById('scoreO'); // Skor pemain O
const resetButton = document.getElementById('resetButton'); // Tombol reset permainan
const modeSingle = document.getElementById('modeSingle'); // Tombol mode Pemain vs AI
const modeMulti = document.getElementById('modeMulti'); // Tombol mode Dua Pemain

// Variabel untuk status permainan
let cells; // Kotak-kotak pada papan permainan
let currentPlayer = 'X'; // Pemain yang sedang bermain (X atau O)
let isGameActive = true; // Status apakah permainan sedang berjalan
let isSinglePlayer = false; // Mode permainan (true jika melawan AI)
let modeSelected = false; // Apakah mode sudah dipilih
let scoreX = 0; // Skor pemain X
let scoreO = 0; // Skor pemain O
let difficulty = 'easy'; // Tingkat kesulitan untuk AI ('easy' atau 'hard')

// Kombinasi kemenangan (baris, kolom, atau diagonal)
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

// Fungsi untuk menginisialisasi papan permainan
function initBoard() {
  board.innerHTML = ''; // Menghapus isi papan
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div'); // Membuat elemen kotak
    cell.classList.add('cell'); // Menambahkan kelas untuk gaya CSS
    cell.dataset.index = i; // Memberikan indeks untuk setiap kotak
    cell.addEventListener('click', handleCellClick); // Menambahkan event klik
    board.appendChild(cell); // Menambahkan kotak ke papan
  }
  cells = Array.from(document.querySelectorAll('.cell')); // Menyimpan semua kotak ke array
}

// Fungsi untuk memeriksa apakah ada pemenang
function checkWinner() {
  for (const combination of winningCombinations) {
    const [a,
      b,
      c] = combination; // Mendapatkan indeks kombinasi
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      isGameActive = false; // Menghentikan permainan
      message.textContent = `Pemain ${currentPlayer} Menang!`; // Menampilkan pesan pemenang
      if (currentPlayer === 'X') scoreX++;
      else scoreO++;
      updateScoreboard(); // Memperbarui skor
      return true;
    }
  }

  // Memeriksa apakah semua kotak terisi tanpa pemenang
  if (cells.every(cell => cell.textContent)) {
    isGameActive = false; // Menghentikan permainan
    message.textContent = 'Permainan Seri!'; // Menampilkan pesan seri
    return true;
  }
  return false; // Tidak ada pemenang atau seri
}

// Fungsi untuk menangani klik pada kotak
function handleCellClick(event) {
  if (!modeSelected) {
    // Jika mode belum dipilih, tampilkan pesan peringatan
    warningMessage.textContent = 'Silakan pilih mode permainan terlebih dahulu!';
    return;
  }

  if (!isGameActive) return; // Jika permainan sudah selesai, tidak melakukan apa-apa

  const cell = event.target; // Kotak yang diklik
  if (!cell.textContent) {
    // Jika kotak kosong
    cell.textContent = currentPlayer; // Mengisi kotak dengan simbol pemain saat ini
    cell.classList.add(currentPlayer.toLowerCase()); // Menambahkan kelas untuk gaya CSS
    cell.classList.add('taken'); // Menandai kotak sebagai sudah diambil

    if (checkWinner()) return; // Memeriksa apakah ada pemenang

    currentPlayer = currentPlayer === 'X' ? 'O': 'X'; // Beralih pemain

    // Jika mode melawan AI dan giliran AI
    if (isSinglePlayer && currentPlayer === 'O') {
      disablePlayerInput(); // Nonaktifkan input pemain
      setTimeout(aiMove, 1000); // AI bergerak setelah jeda
    }
  }
}

// Fungsi untuk menonaktifkan input pemain
function disablePlayerInput() {
  cells.forEach(cell => {
    cell.removeEventListener('click', handleCellClick);
  });
}

// Fungsi untuk mengaktifkan kembali input pemain
function enablePlayerInput() {
  cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
  });
}

// Fungsi untuk pergerakan AI
function aiMove() {
  if (difficulty === 'easy') {
    // Pilihan acak untuk AI
    const availableCells = cells.filter(cell => !cell.textContent);
    const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
    if (randomCell) {
      randomCell.textContent = 'O';
      randomCell.classList.add('o', 'taken');
      if (checkWinner()) return;
      currentPlayer = 'X';
    }
  } else if (difficulty === 'hard') {
    // Pilihan menggunakan algoritma Minimax
    let bestScore = -Infinity;
    let move;
    const boardState = cells.map(cell => cell.textContent);

    for (let i = 0; i < boardState.length; i++) {
      if (!boardState[i]) {
        boardState[i] = 'O'; // AI mencoba langkah
        let score = minimax(boardState, false); // Evaluasi langkah pemain
        boardState[i] = ''; // Batalkan langkah
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }

    if (move !== undefined) {
      const cell = cells[move];
      cell.textContent = 'O';
      cell.classList.add('o', 'taken');
      if (checkWinner()) return;
      currentPlayer = 'X';
    }
  }

  enablePlayerInput(); // Aktifkan kembali input pemain
}

// Fungsi untuk algoritma Minimax
function minimax(newBoard, isMaximizing) {
  // Logika untuk mengevaluasi papan permainan
  for (const combination of winningCombinations) {
    const [a,
      b,
      c] = combination;
    if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
      return newBoard[a] === 'O' ? 10: -10; // Skor untuk AI dan pemain
    }
  }

  if (newBoard.every(cell => cell)) return 0; // Seri

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < newBoard.length; i++) {
      if (!newBoard[i]) {
        newBoard[i] = 'O'; // AI mencoba langkah
        let score = minimax(newBoard, false);
        newBoard[i] = ''; // Batalkan langkah
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < newBoard.length; i++) {
      if (!newBoard[i]) {
        newBoard[i] = 'X'; // Pemain mencoba langkah
        let score = minimax(newBoard, true);
        newBoard[i] = ''; // Batalkan langkah
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

// Fungsi untuk memperbarui skor
function updateScoreboard() {
  scoreXDisplay.textContent = scoreX;
  scoreODisplay.textContent = scoreO;
}

// Fungsi untuk mereset permainan
function resetGame() {
  initBoard(); // Menginisialisasi papan baru
  currentPlayer = 'X'; // Set pemain awal ke X
  isGameActive = true; // Aktifkan permainan
  message.textContent = ''; // Kosongkan pesan permainan
  warningMessage.textContent = ''; // Kosongkan pesan peringatan
  enablePlayerInput(); // Aktifkan input pemain
}

// Event listener untuk memilih mode permainan
modeSingle.addEventListener('click', () => {
  isSinglePlayer = true; // Set mode ke Pemain vs AI
  modeSelected = true; // Tandai mode sudah dipilih
  modeInfo.textContent = 'Mode: Pemain vs AI'; // Tampilkan mode di layar
  resetGame();
});

modeMulti.addEventListener('click', () => {
  isSinglePlayer = false; // Set mode ke Dua Pemain
  modeSelected = true; // Tandai mode sudah dipilih
  modeInfo.textContent = 'Mode: Dua Pemain'; // Tampilkan mode di layar
  resetGame();
});

// Event listener untuk tombol reset
resetButton.addEventListener('click', resetGame);

// Inisialisasi awal permainan
initBoard();