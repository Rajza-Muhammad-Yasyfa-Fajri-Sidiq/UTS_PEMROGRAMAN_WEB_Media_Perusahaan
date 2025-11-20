// Data akun dummy untuk uji login
const dummyUser = {
  email: "user@example.com",
  password: "123456",
};

// Fungsi untuk proses login (dipanggil dari form di login.html)
function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Validasi sederhana pakai IF (sesuai ketentuan tugas)
  if (email === "" || password === "") {
    alert("Email dan password tidak boleh kosong.");
  } else if (email === dummyUser.email && password === dummyUser.password) {
    alert("Login berhasil. Selamat datang!");

    // SIMPAN STATUS LOGIN
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("loggedInEmail", email);

    // Arahkan ke Halaman Menu Utama
    window.location.href = "menu.html";
  } else {
    alert("Email atau password yang Anda masukkan tidak sesuai.");
  }
}

// Mengecek apakah user sudah login ketika membuka menu.html
function checkAuth() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn !== "true") {
    // Kalau belum login, arahkan balik ke halaman login
    alert("Silakan login terlebih dahulu untuk mengakses menu utama.");
    window.location.href = "login.html";
  } else {
    // Kalau sudah login, isi teks email di menu.html
    const email = localStorage.getItem("loggedInEmail") || "-";
    const target = document.getElementById("user-email");
    if (target) {
      target.textContent = email;
    }
  }
}

// Fungsi logout (dipanggil dari tombol Logout di menu.html)
function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("loggedInEmail");
  window.location.href = "login.html";
}
