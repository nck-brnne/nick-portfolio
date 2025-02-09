let items = document.querySelectorAll('.slider .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');

let active = 0; // Initialize the active slide index to 0
let isSectionVisible = true; // Flag to track section visibility

function loadShow() {
  let stt = 0;

  // Pause all videos in the slider
  items.forEach((item, index) => {
    const video = item.querySelector('video');
    video.pause();
    video.currentTime = 0; // Reset video playback to the beginning
  });

  // Apply styling and transformations to the active slide
  items[active].style.transform = 'none';
  items[active].style.zIndex = 1;
  items[active].style.filter = 'none';
  items[active].style.opacity = 1;

  // Iterate over the slides and apply transformations
  for (let i = active + 1; i < items.length; i++) {
    stt++;
    items[i].style.transform = `translateX(${200 * stt}px) scale(${1 - 0.3 * stt}) perspective(50px) rotateY(-1deg)`;
    items[i].style.zIndex = -stt;
    items[i].style.opacity = stt > 2 ? 0 : 1;
    items[i].querySelector('video').style.display = 'none'; // Hide next videos
  }
  stt = 0;
  for (let i = active - 1; i >= 0; i--) {
    stt++;
    items[i].style.transform = `translateX(${-200 * stt}px) scale(${1 - 0.3 * stt}) perspective(50px) rotateY(1deg)`;
    items[i].style.opacity = stt > 2 ? 0 : 1;
    items[i].querySelector('video').style.display = 'none'; // Hide previous videos
  }

  // Play the video in the active slide if the section is visible
  if (isSectionVisible) {
    const activeVideo = items[active].querySelector('video');
    activeVideo.style.display = 'block'; // Show active video
  }
}


loadShow();


// Check section visibility on scroll
function checkSectionVisibility() {
  const section = document.querySelector('.slider');
  const rect = section.getBoundingClientRect();

  // If the top or bottom of the section is not in the viewport, set isSectionVisible to false
  if (rect.bottom < 0 || rect.top > window.innerHeight) {
    isSectionVisible = false;
  } else {
    isSectionVisible = true;
  }
}

// Listen for scroll events
window.addEventListener('scroll', checkSectionVisibility);

// Pause the active video when section visibility changes
window.addEventListener('scroll', () => {
  const activeVideo = items[active].querySelector('video');
  if (isSectionVisible && activeVideo.paused) {
    activeVideo.pause();
  } else if (isSectionVisible && !activeVideo.paused) {
    activeVideo.play();
  }
else if(!isSectionVisible){
  activeVideo.pause();
}
});


let dotsContainer = document.querySelector('.dots');

// Create dots for each video slide
for (let i = 0; i < items.length; i++) {
  let dot = document.createElement('span');
  dot.classList.add('dot');
  dotsContainer.appendChild(dot);
}

let dots = document.querySelectorAll('.dot');

function updateDots() {
  // Remove active class from all dots
  dots.forEach(dot => {
    dot.classList.remove('active');
  });
  
  // Add active class to the dot corresponding to the active slide
  dots[active].classList.add('active');
}

updateDots();

function manually() {
  const video = items[active].querySelector('video');

  video.addEventListener('click', togglePlay);
  video.addEventListener('dblclick', toggleFullscreen);
}

function togglePlay() {
  const video = items[active].querySelector('video');
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}
  function toggleFullscreen() {
    const video = items[active].querySelector('video');
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
}

manually();

next.onclick = function () {
  active = active + 1 < items.length ? active + 1 : active;
  loadShow();
  manually();
  updateDots();
};

prev.onclick = function () {
  active = active - 1 >= 0 ? active - 1 : active;
  loadShow();
  manually();
  updateDots();
};
