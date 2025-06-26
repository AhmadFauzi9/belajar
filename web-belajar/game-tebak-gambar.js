const logos = [
  {
    nama: "nike",
    gambar:
      "https://media.about.nike.com/image-downloads/cf68f541-fc92-4373-91cb-086ae0fe2f88/002-nike-logos-swoosh-white.jpg",
    blur: 10,
  },
  {
    nama: "indomaret",
    gambar:
      "https://upload.wikimedia.org/wikipedia/commons/9/9d/Logo_Indomaret.png",
    blur: 10,
  },
];

let skor = 0;
let level = 0;

const canvas = document.getElementById("canvas");
canvas.width = 400;
canvas.height = 300;

const ctx = canvas.getContext("2d");
ctx.filter = `blur(${logos[level].blur}px)`; // blur(10px)

const img = new Image();
img.src = logos[level].gambar;
img.onload = () => applyBlur();

function cekJawaban() {
  const tebakan = document.getElementById("tebakan").value.toLowerCase();

  if (tebakan === logos[level].nama) {
    skor += 10;
    alert("Benar! Skor +10 🎉");
    document.getElementById("skor").textContent = skor;

    if (level < logos.length - 1) {
      level++;
      img.src = logos[level].gambar;
      resetBlur();
    } else {
      alert("Selamat! Kamu menang! 🎉");
    }
  } else {
    logos[level].blur = Math.max(6, logos[level].blur - 2);

    applyBlur();
  }

  document.getElementById("tebakan").value = "";
}

function resetBlur() {
  logos[level].blur = 15;
  img.onload = () => {
    applyBlur();
  };
}

function applyBlur() {
  ctx.filter = "blur(${logos[level].blur}px)";
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}
