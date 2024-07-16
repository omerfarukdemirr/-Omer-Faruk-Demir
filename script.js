//ekran koruyucu
const debounce = (start, end, ms = 2000) => {
  let timerId; 
  let started = false;

  return (...args) => {
    clearTimeout(timerId);

    
    if (!started) {
      start(...args);
      started = true;
    }


    timerId = setTimeout(() => {
      end(...args);
      started = false;
    }, ms);
  };
};

const debounceStarted = () => {
  document.querySelector(".screensaver-layout").classList.add("hidden");
}

const debounceEnded = () => {
  document.querySelector(".screensaver-layout").classList.remove("hidden");
}

document.addEventListener("mousemove", debounce(debounceStarted, debounceEnded, 300000));



//progress bar
function updateProgressBar(){
  const {scrollTop, scrollHeight} = document.documentElement;
  const scrollPercent = scrollTop / (scrollHeight - window.innerHeight) * 100 + '%';
  document.querySelector('#progress-bar').style.setProperty('--progress', scrollPercent);
}

document.addEventListener('scroll', updateProgressBar);



//cursor
const dots = [];
const cursor = {
  x: 0,
  y: 0,
};

for (let i = 0; i < 40; i++) {
  const dot = document.createElement("div");
  dot.className = "dot";
  document.body.appendChild(dot);
  dots.push(dot);
}

document.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX;
  cursor.y = e.clientY;
});

function draw() {
  let x = cursor.x;
  let y = cursor.y;

  dots.forEach((dot, index) => {
    const nextDot = dots[index + 1] || dots[1];

    dot.style.left = x + "px";
    dot.style.top = y + "px";

    x += (nextDot.offsetLeft - dot.offsetLeft) * 0.5;
    y += (nextDot.offsetTop - dot.offsetTop) * 0.5;
  });
}

setInterval(draw, 10);