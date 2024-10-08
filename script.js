const dialogues = [
    "Nanda telah bersiap untuk menculik Prof Kewarganegaraan di malam hari.",
    "Nanda membagi regu menjadi tiga kelompok.",
    "Kelompok pertama menjaga bagian belakang, kelompok kedua menjaga bagian depan rumah.",
    "Kelompok ketiga yang dipimpin langsung oleh Nanda masuk ke halaman utama dan masuk rumah.",
    "Mereka langsung berbincang-bincang dengan para pengawal dan mengatakan bahwa ada pesan penting dari dekan.",
    "Saat para pengawal lengah, mereka kemudian disekap dan senjatanya dilucuti.",
    "Ketika Prof Kewarganegaraan muncul, Nanda segera memberitahu bahwa dekan memanggil profesor sekarang juga.",
    "Nanda: 'Saya perlu berbicara dengan Prof Kewarganegaraan!'",
    "Prof: 'Perlu apa kamu kesini?'",
    "Prof: 'Jangan temui saya sebelum semuanya membeli e-book. Jika belum beli, nilai kalian E semua!'",
    "Nanda: 'Anda dipanggil menghadap dekan.'",
    "Prof: 'Baiklah, saya akan mandi dulu.'",
    "Nanda: 'Tidak usah mandi, Prof.'",
    "Prof: 'Setidaknya ganti baju dan cuci muka.'",
    "Nanda: 'Tidak usah mandi, Prof.'",
    "Prof: 'Lancang kamu.'",
    "(Prof menendang salah satu pasukan informatika.)",
    "(Prof kembali ke kamar dan langsung menutup pintu kaca.)",
    "Saat itulah, Nanda memerintahkan anak informatika untuk menembak.",
    "(Tembakan terjadi!)",
    "Tujuh peluru menembus kaca dan akhirnya membunuh Prof Kewarganegaraan.",
    "Jenazah Prof Kewarganegaraan diseret dengan posisi badan dan kepalanya berada di lantai."
];

let currentDialogueIndex = 0;
const dialogueElement = document.getElementById("dialogue");
const welcomeScreen = document.getElementById("welcomeScreen");
const storyScreen = document.getElementById("storyScreen");
const endScreen = document.getElementById("endScreen");
const playButton = document.getElementById("playButton");
const backgroundMusic = document.getElementById("backgroundMusic");
const restartButton = document.getElementById("restartButton");
const nextButton = document.getElementById("nextButton");
const backButton = document.getElementById("backButton");

// Event listener untuk tombol play
playButton.addEventListener("click", () => {
    welcomeScreen.style.display = "none";
    storyScreen.style.display = "flex";
    backgroundMusic.play(); // Memastikan lagu diputar
    currentDialogueIndex = 0; // Reset index dialog saat mulai
    typeDialogue(dialogues[currentDialogueIndex]);
});

// Fungsi untuk mengetik dialog
function typeDialogue(dialogue) {
    dialogueElement.innerHTML = ''; // Reset dialog
    let i = 0;

    const typingInterval = setInterval(() => {
        if (i < dialogue.length) {
            dialogueElement.innerHTML += dialogue.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval);
            // Cek apakah sudah mencapai dialog terakhir
            if (currentDialogueIndex < dialogues.length - 1) {
                // Tampilkan tombol Next
                nextButton.style.display = "block";
            } else {
                // Tampilkan akhir cerita
                showEndScreen();
            }
            // Tampilkan tombol Back jika ada dialog sebelumnya
            backButton.style.display = currentDialogueIndex > 0 ? "block" : "none";
        }
    }, 50); // Kecepatan mengetik
}

// Fungsi untuk melanjutkan ke dialog berikutnya
function showNextDialogue() {
    if (currentDialogueIndex < dialogues.length - 1) {
        currentDialogueIndex++;
        typeDialogue(dialogues[currentDialogueIndex]);
        // Sembunyikan tombol Next setelah dialog baru dimulai
        nextButton.style.display = "none";
        // Tampilkan tombol Back
        backButton.style.display = "block";
    }
}

// Event listener untuk tombol Next
nextButton.addEventListener("click", showNextDialogue);

// Event listener untuk tombol Back
backButton.addEventListener("click", () => {
    if (currentDialogueIndex > 0) {
        currentDialogueIndex--;
        typeDialogue(dialogues[currentDialogueIndex]);
        // Sembunyikan tombol Back jika dialog pertama ditampilkan
        backButton.style.display = currentDialogueIndex === 0 ? "none" : "block";
        // Tampilkan tombol Next jika bukan dialog terakhir
        nextButton.style.display = currentDialogueIndex < dialogues.length - 1 ? "block" : "none";
    }
});

// Event listener untuk tombol restart
restartButton.addEventListener("click", () => {
    currentDialogueIndex = 0;
    endScreen.style.display = "none";
    welcomeScreen.style.display = "flex";
    backgroundMusic.currentTime = 0; // Reset lagu ke awal
    dialogueElement.innerHTML = ''; // Reset dialog pada tampilan awal
    nextButton.style.display = "none"; // Sembunyikan tombol Next
    backButton.style.display = "none"; // Sembunyikan tombol Back
});

// Fungsi untuk menampilkan layar akhir
function showEndScreen() {
    storyScreen.style.display = "none";
    endScreen.style.display = "flex";
}

// Menginisialisasi dialog pertama saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
    welcomeScreen.style.display = "flex";
    storyScreen.style.display = "none";
    endScreen.style.display = "none";
    nextButton.style.display = "none"; // Sembunyikan tombol Next
    backButton.style.display = "none"; // Sembunyikan tombol Back
});
