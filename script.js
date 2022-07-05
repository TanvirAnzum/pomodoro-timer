///dom
const circle = document.querySelector(".circle");
const clock = document.querySelector(".clock");
const btns = document.querySelectorAll(".btn");
const text = document.querySelector(".text");
const modal = document.querySelector(".main__modal");

///pomodoro

const pomodoro = {
  workTime: 1500, // default 1500 second or 25 min
  getDegree: 0, ///current time
  shortInterval: 300, //5 min
  longInterval: 1200, //20 min
  cycle: 4,
};

///edit button features
const a = document.querySelector(".long-break");
const b = document.querySelector(".short-interval");
const c = document.querySelector(".focus-time");
const close_modal = document.querySelector(".close");

///disabling input field

a.textContent =
  "Long Break: " + (pomodoro.longInterval / 60).toFixed(1) + " Min";
b.textContent =
  "Short Break: " + (pomodoro.shortInterval / 60).toFixed(1) + " Min";
c.textContent = "Work Time: " + (pomodoro.workTime / 60).toFixed(1) + " Min";

close_modal.addEventListener("click", () => {
  modal.style.display = "none";
});

// display timer
let timer;
let shortBreak;
let longBreak;
let { getDegree, workTime, shortInterval, longInterval, cycle } = pomodoro;

for (let i = 0; i < 3; i++) {
  btns[i].addEventListener("click", () => {
    if (!i) startTimer();
    else if (i == 1) resetTimer();
    else if (i == 2) modal.style.display = "flex";
  });
}

function startTimer() {
  btns[0].disabled = true;
  timer = setInterval(workTimingFunction, 1000);
  text.style.display = "block";
}

function workTimingFunction() {
  getDegree++;
  let deg = (360 / (pomodoro.workTime + 1)) * getDegree;
  circle.style.background = `radial-gradient(white 60%, transparent 61%),
  conic-gradient(transparent 0deg ${deg}deg, gainsboro 0deg 360deg),
  conic-gradient(orange 0deg, yellow 90deg, lightgreen 180deg, green)`;
  let x = timeFormat(workTime);

  clock.textContent =
    ("0" + x.min).slice(-2) + ":" + ("0" + x.remainingSecond).slice(-2);

  if (!workTime) {
    clearInterval(timer);
    getDegree = pomodoro.getDegree;
    workTime = pomodoro.workTime;
    text.textContent = "Break";
    text.style.backgroundColor = "#00d8d6";
    shortBreak = setInterval(sbTimingFunction, 1000);
    return;
  }

  workTime--;
}

///reset timer

function resetTimer() {
  if (timer) clearInterval(timer);
  if (shortBreak) clearInterval(shortBreak);
  if (longBreak) clearInterval(longBreak);
  btns[0].disabled = false;
  clock.textContent = "--:--";
  getDegree = pomodoro.getDegree;
  workTime = pomodoro.workTime;
  shortInterval = pomodoro.shortInterval;
  text.style.display = "none";
  text.style.backgroundColor = "#fdcb6e";
  circle.style.background = `radial-gradient(white 60%, transparent 61%),
    conic-gradient(transparent 0deg 0deg, gainsboro 0deg 360deg),
    conic-gradient(orange 0deg, yellow 90deg, lightgreen 180deg, green)`;
}

/// short break timing function

function sbTimingFunction() {
  getDegree++;
  let deg = (360 / (pomodoro.shortInterval + 1)) * getDegree;
  circle.style.background = `radial-gradient(white 60%, transparent 61%),
  conic-gradient(transparent 0deg ${deg}deg, gainsboro 0deg 360deg),
  conic-gradient(orange 0deg, yellow 90deg, lightgreen 180deg, green)`;
  let x = timeFormat(shortInterval);

  clock.textContent =
    ("0" + x.min).slice(-2) + ":" + ("0" + x.remainingSecond).slice(-2);

  if (!shortInterval) {
    clearInterval(shortBreak);
    getDegree = pomodoro.getDegree;
    shortInterval = pomodoro.shortInterval;
    cycle--;
    if (!cycle) {
      text.textContent = "Break";
      text.style.backgroundColor = "#00d8d6";
      longBreak = setInterval(lbTimingFunction, 1000);
      return;
    }
    text.textContent = "Focus";
    text.style.backgroundColor = "#fdcb6e";
    timer = setInterval(workTimingFunction, 1000);
    // workTime = pomodoro.workTime;
    console.log(cycle);
    return;
  }

  shortInterval--;
}

///long break

function lbTimingFunction() {
  getDegree++;
  let deg = (360 / (pomodoro.longInterval + 1)) * getDegree;
  circle.style.background = `radial-gradient(white 60%, transparent 61%),
  conic-gradient(transparent 0deg ${deg}deg, gainsboro 0deg 360deg),
  conic-gradient(orange 0deg, yellow 90deg, lightgreen 180deg, green)`;
  let x = timeFormat(longInterval);

  clock.textContent =
    ("0" + x.min).slice(-2) + ":" + ("0" + x.remainingSecond).slice(-2);

  if (!longInterval) {
    clearInterval(longBreak);
    getDegree = pomodoro.getDegree;
    longInterval = pomodoro.longInterval;
    text.textContent = "Completed";
    return;
  }

  longInterval--;
}

//time formatting

function timeFormat(second) {
  let min = Math.floor(parseInt(second / 60));
  let remainingSecond = second % 60;
  return { min, remainingSecond };
}
