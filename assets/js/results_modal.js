// results_modal.js

export function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove("hidden");
  }
  
  export function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add("hidden");
  }
  