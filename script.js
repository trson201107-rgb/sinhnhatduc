// =====================================================
// script.js - phần "bộ não" của trang chúc mừng sinh nhật
// =====================================================

// ---------- 1. THÔNG TIN BẠN CHỈNH SỬA Ở ĐÂY ----------
var friendName = "Trần Đức"; // <-- đổi thành tên bạn bạn
var yourName = "Trường Sơn Đa Tài!"; // <-- tên của bạn (người gửi)

var message =
  "Chúc mừng sinh nhật nhé! Thêm một tuổi mới rồi, hy vọng mọi kế hoạch và dự định sắp tới của ông sẽ " +
  "đều thuận lợi và suôn sẻ. Cố gắng giữ vững phong độ, học hành và công việc phất lên, lúc nào cũng " +
  "tràn đầy năng lượng để đối mặt với mọi thử thách. Cứ tự tin mà làm những gì mình thích, " +
  "có khó khăn gì thì anh em trong nhóm vẫn luôn sẵn sàng hỗ trợ phía sau. Chúc mừng sinh nhật tuổi mới thật rực rỡ!";

// Danh sách lời chúc
var wishes = [
  "🎂 Luôn khỏe mạnh và tràn đầy năng lượng",
  "🍀 Gặp thật nhiều may mắn trong học tập và công việc",
  "💖 Mỗi ngày đều vui vẻ và bình yên",
  "✨ Mọi dự định trong năm mới đều thành hiện thực",
];

// --- DANH SÁCH 11 ẢNH CỦA BẠN ---
var myPhotos = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
];

// Mẹo: có thể đổi tên qua đường dẫn, ví dụ  index.html?ten=Lan
var params = new URLSearchParams(window.location.search);
if (params.get("ten")) {
  friendName = params.get("ten");
}

// ---------- 2. LẤY CÁC PHẦN TỬ TRONG TRANG ----------
var title = document.getElementById("title");
var flame = document.getElementById("flame");
var blowBtn = document.getElementById("blowBtn");
var againBtn = document.getElementById("againBtn");
var letter = document.getElementById("letter");
var letterTitle = document.getElementById("letterTitle");
var messageEl = document.getElementById("message");
var wishesEl = document.getElementById("wishes");
var signEl = document.getElementById("sign");

// ---------- 3. ĐIỀN NỘI DUNG VÀO TRANG ----------
title.textContent = "Chúc mừng sinh nhật, " + friendName + "! 🎉";
letterTitle.textContent = "Gửi " + friendName + " 💌";
messageEl.textContent = message;
signEl.textContent = "— " + yourName + " —";

for (var i = 0; i < wishes.length; i++) {
  var li = document.createElement("li");
  li.textContent = wishes[i];
  wishesEl.appendChild(li);
}

// ---------- 4. TẠO HIỆU ỨNG ẢNH SIÊU TO VÀ BÓNG BAY BAY LÊN ----------
var balloonBox = document.getElementById("balloons");
var balloonColors = [
  "#ff6b81",
  "#ffa94d",
  "#ffd43b",
  "#69db7c",
  "#4dabf7",
  "#b197fc",
];

// Số lượng ảnh và bóng bay (giảm bớt số lượng để ảnh to nhìn rõ hơn)
var totalElements = myPhotos.length + 8; // 11 ảnh + 8 quả bóng màu

// Vòng lặp tạo cả ảnh (11 ảnh) và bóng bay màu sắc
for (var b = 0; b < totalElements; b++) {
  var el = document.createElement("div");

  // Cứ xen kẽ: 1 ảnh SIÊU TO, 1 bóng bay màu
  if (b < myPhotos.length) {
    el.className = "balloon-photo";
    var imgFile = myPhotos[b];
    el.style.backgroundImage = "url('" + imgFile + "')";

    // Kích thước ảnh SIÊU TO và rõ ràng (từ 130px đến 160px)
    var size = 130 + Math.random() * 30 + "px";
    el.style.width = size;
    el.style.height = size;
  } else {
    el.className = "balloon-shape";
    el.style.background =
      balloonColors[Math.floor(Math.random() * balloonColors.length)];
  }

  // Vị trí ngang rải đều hơn một chút (từ 5% đến 88%)
  el.style.left = 5 + Math.random() * 83 + "%";

  // Tốc độ bay chậm lại một chút để ảnh to bay lên mượt hơn (từ 10s đến 20s)
  el.style.animationDuration = 10 + Math.random() * 10 + "s";

  // Thời gian delay ngẫu nhiên lớn hơn (từ -2s đến -25s) để các ảnh to không xuất hiện cùng lúc
  el.style.animationDelay = -2 - Math.random() * 23 + "s";

  balloonBox.appendChild(el);
}

// ---------- 5. PHÁO GIẤY (vẽ trên canvas) ----------
var canvas = document.getElementById("confetti");
var ctx = canvas.getContext("2d");
var pieces = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function shootConfetti() {
  for (var i = 0; i < 150; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 200,
      size: 6 + Math.random() * 8,
      speedY: 2 + Math.random() * 4,
      speedX: -2 + Math.random() * 4,
      color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < pieces.length; i++) {
    var p = pieces[i];
    p.x = p.x + p.speedX;
    p.y = p.y + p.speedY;
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, p.size, p.size * 0.6);
  }

  var remaining = [];
  for (var j = 0; j < pieces.length; j++) {
    if (pieces[j].y < canvas.height + 20) {
      remaining.push(pieces[j]);
    }
  }
  pieces = remaining;

  requestAnimationFrame(animate);
}
animate();

// ---------- 6. SỰ KIỆN KHI BẤM NÚT ----------
blowBtn.onclick = function () {
  flame.classList.add("off");
  blowBtn.style.display = "none";
  letter.classList.remove("hidden");
  shootConfetti();
  letter.scrollIntoView({ behavior: "smooth" });
};

againBtn.onclick = function () {
  shootConfetti();
};
