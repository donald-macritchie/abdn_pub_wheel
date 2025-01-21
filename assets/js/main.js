document.addEventListener("DOMContentLoaded", () => {
  // Initialise elements

  // Function calls

  // animations
  // results modal
  // saved results
  // wheel spin
  // reset wheel

  //wheel spin
  btn.addEventListener("click", () => {
    if (btn.textContent === "Reset") {
      resetWheel();
    } else {
      spinWheel();
    }
  });
});
