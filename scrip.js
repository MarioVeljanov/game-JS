let righPosition = 1;
let imgBlockPosition = 0;
let direction = "right";
let hit = false;
let jump = false;
let timer = null;
let x = 0;
let halfWidth = window.screen.width / 2;

let jumpBlock = document.querySelector("#jump_block");
let hitBlock = document.querySelector("#hit_block");
let heroImg = document.querySelector("#hero_img");
let imgBlock = document.querySelector("#img_block");
let canvas = document.querySelector("#canvas");
let fsBtn = document.querySelector("#fsButton");

jumpBlock.style.top = `${window.screen.height / 2 - 144 / 2}px`;
hitBlock.style.top = `${window.screen.height / 2 - 144 / 2}px`;

fsBtn.addEventListener("click", () => {
  if (window.document.fullscreenElement) {
    fsBtn.src = "./img/fullscreen.png";
    window.document.exitFullscreen();
  } else {
    fsBtn.src = "./img/cancel.png";
    canvas.requestFullscreen();
  }
});

heroImg.addEventListener("click", (e) => {
  e.preventDefault();
});

jumpBlock.addEventListener("click", () => {
  jump = true;
});
hitBlock.addEventListener("click", () => {
  hit = true;
});

const rightHandler = () => {
  heroImg.style.transform = "scale(-1, 1)";
  righPosition += 1;
  imgBlockPosition += 1;
  if (righPosition > 5) {
    righPosition = 0;
  }
  heroImg.style.left = `-${righPosition * 96}px`;
  heroImg.style.top = "-192px";
  imgBlock.style.left = `${imgBlockPosition * 30}px`;
};

const lefttHandler = () => {
  heroImg.style.transform = "scale(1, 1)";
  righPosition += 1;
  imgBlockPosition -= 1;
  if (righPosition > 5) {
    righPosition = 0;
  }
  heroImg.style.left = `-${righPosition * 96}px`;
  heroImg.style.top = "-192px";
  imgBlock.style.left = `${imgBlockPosition * 30}px`;
};

const standHandler = () => {
  switch (direction) {
    case "right": {
      heroImg.style.transform = "scale(-1, 1)";
      if (righPosition > 4) {
        righPosition = 1;
      }
      break;
    }
    case "left": {
      heroImg.style.transform = "scale(1, 1)";
      if (righPosition > 3) {
        righPosition = 0;
      }
      break;
    }
    default: break;
  }

  righPosition += 1;
  heroImg.style.left = `-${righPosition * 96}px`;
  heroImg.style.top = "0px";
};

const hitHandler = () => {
    switch (direction) {
      case "right": {
        heroImg.style.transform = "scale(-1, 1)";
        if (righPosition > 4) {
          righPosition = 1;
          hit = false;
        }
        break;
      }
      case "left": {
        heroImg.style.transform = "scale(1, 1)";
        if (righPosition > 3) {
          righPosition = 0;
          hit = false;
        }
        break;
      }
      default:
        break;
    }

    righPosition += 1;
    heroImg.style.left = `-${righPosition * 96}px`;
    heroImg.style.top = "-288px";
}

const jumpHandler = () => {
  switch (direction) {
    case "right": {
      heroImg.style.transform = "scale(-1, 1)";
      if (righPosition > 4) {
        righPosition = 1;
        jump = false;
      }
      break;
    }
    case "left": {
      heroImg.style.transform = "scale(1, 1)";
      if (righPosition > 3) {
        righPosition = 0;
        jump = false;
      }
      break;
    }
    default:
      break;
  }

  righPosition += 1;
  heroImg.style.left = `-${righPosition * 96}px`;
  heroImg.style.top = "-96px";
};

let onTouchStart = (e) => {
  clearInterval(timer);
  x = e.type === "mousedown" ? e.screenX : e.touches[0].screenX;

  timer = setInterval(() => {
    if (x > halfWidth) {
      direction = "right";
      rightHandler();
    } else {
      direction = "left";
      lefttHandler();
    }
  }, 130);
};

let onTouchEnd = (e) => {
  clearInterval(timer);
  lifeCycle();
};

window.addEventListener("mousedown", onTouchStart);
window.addEventListener("touchstart", onTouchStart);

window.addEventListener("mouseup", onTouchEnd);
window.addEventListener("touchend", onTouchEnd);

const lifeCycle = () => {
  timer = setInterval(() => {
    if (hit) {
      hitHandler();
    } else if (jump) {
      jumpHandler();
    } else {
      standHandler();
    }
  }, 150);
};

const addTiles = (i) => {
    let tile = document.createElement('img');
    let tileBlack = document.createElement('img');

    tile.src = './img/assets/1 Tiles/Tile_02.png';
    tileBlack.src = './img/assets/1 Tiles/Tile_04.png';

    tile.style.position = 'absolute';
    tile.style.left = `${32 * i}px`;
    tile.style.border = `none`;
    tile.style.bottom = `32px`;
    tileBlack.style.position = "absolute";
    tileBlack.style.left = `${32 * i}px`;
    tileBlack.style.bottom = '0px';

    canvas.appendChild(tile)
    canvas.appendChild(tileBlack)
}

const start = () => {
    lifeCycle();
    for (let i = 0; i < 50; i++) {
        addTiles(i);
    }
  
};


start();

/* -576px */
