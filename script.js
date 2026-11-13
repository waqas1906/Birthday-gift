/* =====================================================
   EDIT THIS SECTION TO CUSTOMIZE EVERYTHING
   ===================================================== */
const CONFIG = {
  // Password: digits plus * and # are allowed. Example: "1402" or "14*2"
  password: "2006",

  // Photos: put your images inside the /photos folder and list them here.
  // If a file is missing, a cute pink placeholder is shown instead.
  photos: [
    { src: "photos/photo1.jpg", caption: "Us 💕" },
    { src: "photos/photo2.jpg", caption: "Smile!" },
    { src: "photos/photo3.jpg", caption: "Memories" },
  ],

  // Background music file (put an .mp3 inside /music). Leave "" for no music.
  music: "song.mp3",

  // The birthday letter: each item is one paragraph.
  letter: [
    "Happy Birthday to the most special person!",
    "Today is all about you, your happiness, your beautiful smile, and all the wonderful things that make you special.",
    "I hope your life is always filled with happiness, endless smiles, success, and beautiful memories.",
    "May all your dreams come true, and may this new chapter of your life bring you countless reasons to smile.",
    "You deserve all the happiness in the world.",
    "Stay blessed, keep smiling, and always be the amazing person you are.",
    "Once again, Happy Birthday, Zainab! ❤️",
  ],

  // Page 1 "No" button messages (shown in order)
  noMessages: ["Are you sure? 🥺", "Pleaseee? 🥹", "Think again... 💔", "You can't catch me! 😜", "Okay okay, just press YES 💗"],

  // Final surprise popup
  finalTitle: "You are loved, Zainab 💖",
  finalText: "Thank you for being you. May this year give you every smile you give to others. Happy Birthday! 🎂✨",

  // Page 2 messages
  hint: "Hint: it's a special date 💕",
  wrongMsg: "Oops! Not that one, cutie 🧸 Try again!",
  rightMsg: "Unlocked! 💖 Come in...",
};

/* =====================================================
   HELPERS
   ===================================================== */
const $ = (id) => document.getElementById(id);
const PLACEHOLDER = "data:image/svg+xml;utf8," + encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><rect width='300' height='300' fill='#ffd6e3'/>" +
  "<text x='150' y='170' font-size='90' text-anchor='middle'>🌸</text></svg>");

/** Sets an image source, falling back to the placeholder if the file is missing */
function loadPhoto(imgEl, src, isSvg) {
  const test = new Image();
  test.onload = () => isSvg ? imgEl.setAttribute("href", src) : (imgEl.src = src);
  test.onerror = () => isSvg ? imgEl.setAttribute("href", PLACEHOLDER) : (imgEl.src = PLACEHOLDER);
  test.src = src;
}

/* =====================================================
   FLOATING HEARTS + FALLING PETALS
   ===================================================== */
const fx = $("fx");
function spawn(cls, items, dur, sizeMin, sizeMax) {
  const el = document.createElement("span");
  el.className = cls;
  el.textContent = items[Math.floor(Math.random() * items.length)];
  el.style.left = Math.random() * 100 + "vw";
  el.style.fontSize = sizeMin + Math.random() * (sizeMax - sizeMin) + "px";
  el.style.animationDuration = dur + Math.random() * 5 + "s";
  fx.appendChild(el);
  setTimeout(() => el.remove(), (dur + 6) * 1000);
}
setInterval(() => spawn("float", ["💗", "💖", "💕", "🦋", "✨"], 7, 16, 34), 700);
setInterval(() => spawn("petal", ["🌸", "🌺", "🌷"], 9, 14, 24), 1400);

function confetti(count = 90) {
  const colors = ["#ff7fa8", "#ffc7d9", "#d9a441", "#fff", "#ffb88c", "#e8447c"];
  for (let i = 0; i < count; i++) {
    const c = document.createElement("i");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = colors[i % colors.length];
    c.style.animationDuration = 2.5 + Math.random() * 3 + "s";
    c.style.animationDelay = Math.random() * 0.8 + "s";
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 7000);
  }
}

/* =====================================================
   PAGE NAVIGATION (with pink circle wipe)
   ===================================================== */
function goTo(pageId, after) {
  const wipe = $("wipe");
  wipe.classList.add("on");
  setTimeout(() => {
    document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
    $(pageId).classList.add("active");
    wipe.classList.remove("on");
    if (after) after();
  }, 650);
}

/* =====================================================
   MUSIC (starts only after a tap)
   ===================================================== */
const bgm = $("bgm"), musicBtn = $("musicBtn");
if (CONFIG.music) bgm.src = CONFIG.music;
musicBtn.addEventListener("click", () => {
  if (!CONFIG.music) return alert("Add an mp3 file and set CONFIG.music in script.js 🎵");
  if (bgm.paused) bgm.play().then(() => musicBtn.classList.add("playing")).catch(() => alert("Music file not found in /music 🎵"));
  else { bgm.pause(); musicBtn.classList.remove("playing"); }
});

/* =====================================================
   PAGE 1: YES / NO
   ===================================================== */
let noCount = 0;
const noBtn = $("noBtn"), yesBtn = $("yesBtn");

function dodge() {
  const msgs = CONFIG.noMessages;
  $("noMsg").textContent = msgs[Math.min(noCount, msgs.length - 1)];
  noCount++;
  noBtn.textContent = noCount > 2 ? "NO?? 🙈" : "NO!!";
  // Move the button to a random spot (stays on screen)
  noBtn.style.position = "fixed";
  noBtn.style.zIndex = 20;
  const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - 20) + 10;
  const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - 20) + 10;
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
  // Make YES bigger every time 😄
  yesBtn.style.transform = `scale(${Math.min(1 + noCount * 0.15, 1.8)})`;
}
noBtn.addEventListener("mouseenter", () => noCount > 0 && dodge());
noBtn.addEventListener("touchstart", (e) => { e.preventDefault(); dodge(); }, { passive: false });
noBtn.addEventListener("click", dodge);

yesBtn.addEventListener("click", () => {
  const cam = $("camera"), flash = $("flash");
  cam.classList.add("shoot");
  flash.classList.add("pop");
  confetti(40);
  setTimeout(() => goTo("page2", () => { cam.classList.remove("shoot"); flash.classList.remove("pop"); }), 700);
});

/* =====================================================
   PAGE 2: PASSWORD KEYPAD
   ===================================================== */
let entered = "";
const dotsEl = $("dots"), pwMsg = $("pwMsg"), keysEl = $("keys");
pwMsg.textContent = CONFIG.hint;

["1","2","3","4","5","6","7","8","9","*","0","#"].forEach((k) => {
  const b = document.createElement("button");
  b.className = "key"; b.textContent = k;
  b.addEventListener("click", () => pressKey(k));
  keysEl.appendChild(b);
});

function drawDots() {
  dotsEl.innerHTML = "";
  for (let i = 0; i < CONFIG.password.length; i++) {
    const d = document.createElement("span");
    d.className = "dot" + (i < entered.length ? " fill" : "");
    dotsEl.appendChild(d);
  }
}
function pressKey(k) {
  if (entered.length >= CONFIG.password.length) return;
  entered += k; drawDots();
  if (entered.length === CONFIG.password.length) setTimeout(checkPassword, 250);
}
function checkPassword() {
  const card = $("keypadCard");
  if (entered === CONFIG.password) {
    pwMsg.textContent = CONFIG.rightMsg;
    card.classList.add("unlocked");
    confetti(50);
    setTimeout(() => goTo("page3", startLetter), 1000);
  } else {
    pwMsg.textContent = CONFIG.wrongMsg;
    card.classList.add("shake");
    setTimeout(() => card.classList.remove("shake"), 500);
    entered = ""; drawDots();
  }
}
$("delKey").addEventListener("click", () => { entered = entered.slice(0, -1); drawDots(); });
$("clrKey").addEventListener("click", () => { entered = ""; drawDots(); pwMsg.textContent = CONFIG.hint; });
document.addEventListener("keydown", (e) => {   // also works with a real keyboard
  if (!$("page2").classList.contains("active")) return;
  if (/^[0-9*#]$/.test(e.key)) pressKey(e.key);
  if (e.key === "Backspace") $("delKey").click();
});
drawDots();

// Heart-shaped photo on page 2
loadPhoto($("heartPhoto"), CONFIG.photos[0].src, true);

/* =====================================================
   PAGE 3: POLAROIDS + TYPEWRITER LETTER
   ===================================================== */
let letterStarted = false;
function startLetter() {
  if (letterStarted) return;
  letterStarted = true;
  confetti(120);

  // Polaroids with different positions/tilts
  const spots = [
    { top: "0px", left: "6%", rot: -8 },
    { top: "125px", left: "46%", rot: 7 },
    { top: "250px", left: "10%", rot: -3 },
  ];
  const wrap = $("polaroids");
  CONFIG.photos.slice(0, 3).forEach((p, i) => {
    const d = document.createElement("div");
    d.className = "polaroid";
    d.style.cssText = `top:${spots[i].top};left:${spots[i].left};transform:rotate(${spots[i].rot}deg);animation-delay:${0.4 + i * 0.4}s`;
    const img = document.createElement("img"); img.alt = p.caption;
    loadPhoto(img, p.src, false);
    d.appendChild(img);
    d.insertAdjacentHTML("beforeend", `<span>${p.caption}</span>`);
    wrap.appendChild(d);
  });

  // Typewriter: types each paragraph one after another
  const box = $("letterText");
  let para = 0, char = 0, current;
  function type() {
    if (para >= CONFIG.letter.length) {
      current.classList.remove("cursor");
      $("finalBtn").classList.add("show");
      return;
    }
    if (char === 0) {
      current && current.classList.remove("cursor");
      current = document.createElement("p");
      current.className = "cursor";
      box.appendChild(current);
    }
    current.textContent = CONFIG.letter[para].slice(0, ++char);
    if (char >= CONFIG.letter[para].length) { para++; char = 0; setTimeout(type, 450); }
    else setTimeout(type, 28);
  }
  setTimeout(type, 1200);
}

/* =====================================================
   FINAL SURPRISE
   ===================================================== */
$("finalBtn").addEventListener("click", () => {
  $("finalTitle").textContent = CONFIG.finalTitle;
  $("finalText").textContent = CONFIG.finalText;
  $("finalModal").classList.add("open");
  confetti(160);
});
$("closeFinal").addEventListener("click", () => $("finalModal").classList.remove("open"));
