// saved_results_modal.js

export function displaySavedResults(savedResult) {
    document.getElementById("saved-result-name").textContent = savedResult.name;
    document.getElementById("saved-result-address").textContent = savedResult.address;
    document.getElementById("saved-result-area").textContent = savedResult.location;
  }
  