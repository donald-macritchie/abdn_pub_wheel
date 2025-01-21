let container = document.querySelector(".container");
let btn = document.getElementById("spin");




function spinWheel() {
  if (spinning) return;
  spinning = true;
  animateFloatingIconsAndMessages();

  let randomRotation = Math.floor(Math.random() * 5000 + 3000);
  gsap.to(container, {
    duration: 8,
    rotation: currentRotation + randomRotation,
    ease: "power4.out",
    onComplete: () => {
      spinning = false;
      currentRotation = (currentRotation + randomRotation) % 360;
      spinFinish();
      showModal();
      btn.textContent = "Reset";
    },
  });
}

function resetWheel() {
  location.reload();
}

function spinFinish() {
  const pubKeys = Object.keys(pubs);
  const randomKey = pubKeys[Math.floor(Math.random() * pubKeys.length)];
  const randomPub = pubs[randomKey];

  document.getElementById("result-name").textContent =
    randomPub.name || "Not available";
  document.getElementById("result-address").textContent =
    randomPub.address || "Not available";
  document.getElementById("result-area").textContent =
    randomPub.location || "Not available";
}

// Function to toggle the visibility of the details
function toggleDetails(pubId) {
  const details = document.getElementById(pubId + "-details");

  // Toggle the 'hidden' class to show/hide the details
  details.classList.toggle("hidden");
}