// storage.js

export function saveResultToLocalStorage(savedResult) {
    localStorage.setItem("savedResult", JSON.stringify(savedResult));
  }
  
  export function loadResultFromLocalStorage() {
    return JSON.parse(localStorage.getItem("savedResult")) || null;
  }
  