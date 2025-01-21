document.addEventListener("DOMContentLoaded", () => {
  // initialise elements
  let container = document.querySelector(".container");
  let btn = document.getElementById("spin");
  const floatingIcons = document.querySelectorAll(".floating-icon");
  const floatingIconsContainer = document.getElementById("floating-icons");
  const resultsModal = document.getElementById("results-modal");
  const closeModal = document.getElementById("close-modal");
  const copyRightDate = document.getElementById("copyright-date");

  // manage spin
  let spinning = false; //prevent multiplw spins
  let currentRotation = 0;

  function animateFloatingIconsAndMessages() {
    floatingIconsContainer.classList.remove("hidden");

    let iconTimeline = gsap.timeline();

    iconTimeline
      // Icon 1 animation
      .fromTo(
        ".floating-icon-1",
        { opacity: 0, x: 0, width: 0, height: 0, scale: 0.2 },
        {
          opacity: 1,
          x: 120,
          width: 200,
          height: 200,
          scale: 1,
          duration: 1,
          ease: "power3.out",
        }
      )
      .fromTo(
        ".floating-message-1",
        {
          scale: 0.2,
          opacity: 0,
          x: 0, // Start at the center horizontally
          y: 0, // Start at the center vertically
          rotation: 0, // Start with no rotation
        },
        {
          scale: 1.5,
          opacity: 1,
          x: -50, // Move outward at an angle
          y: -50, // Move upward and outward
          rotation: 0, // Rotate slightly as it moves outward
          duration: 1.5,
          ease: "power3.out",
        }
      )
      .to(
        ".floating-icon-1",
        { opacity: 0, duration: 0.5, ease: "power1.out" },
        "-=1.5"
      )
      .to(
        ".floating-message-1",
        { opacity: 0, duration: 0.5, ease: "power1.out" },
        "-=0.5"
      )
      // Icon 2 animation
      .fromTo(
        ".floating-icon-2",
        { opacity: 0, x: 0, width: 0, height: 0, scale: 0.2 },
        {
          opacity: 1,
          x: -130,
          width: 200,
          height: 200,
          scale: 1,
          duration: 1,
          ease: "power3.out",
        }
      )
      .fromTo(
        ".floating-message-2",
        {
          scale: 0.2,
          opacity: 0,
          x: 0, // Start at the center horizontally
          y: 0, // Start at the center vertically
          rotation: 0, // Start with no rotation
        },
        {
          scale: 1.5,
          opacity: 1,
          x: 50, // Move outward at an angle
          y: -50, // Move upward and outward
          rotation: 0, // Rotate slightly as it moves outward
          duration: 1.5,
          ease: "power3.out",
        }
      )
      .to(
        ".floating-icon-2",
        { opacity: 0, duration: 0.5, ease: "power1.out" },
        "-=1.5"
      )
      .to(
        ".floating-message-2",
        { opacity: 0, duration: 0.5, ease: "power1.out" },
        "-=0.5"
      )
      // Icon 3 animation
      .fromTo(
        ".floating-icon-3",
        { opacity: 0, x: 0, width: 0, height: 0, scale: 0.2 },
        {
          opacity: 1,
          y: 60,
          width: 200,
          height: 200,
          scale: 1,
          duration: 1,
          ease: "power3.out",
        }
      )
      .fromTo(
        ".floating-message-3",
        {
          scale: 0.2,
          opacity: 0,
          x: 0, // Start at the center horizontally
          y: 0, // Start at the center vertically
          rotation: 0, // Start with no rotation
        },
        {
          scale: 1.5,
          opacity: 1,
          // x: -50, // Move outward at an angle
          y: -50, // Move upward and outward
          rotation: 0, // Rotate slightly as it moves outward
          duration: 1.5,
          ease: "power3.out",
        }
      )
      .to(
        ".floating-icon-3",
        { opacity: 0, duration: 0.5, ease: "power1.out" },
        "-=1.5"
      )
      .to(
        ".floating-message-3",
        { opacity: 0, duration: 0.5, ease: "power1.out" },
        "-=0.5"
      );

    // Results modal icons
    gsap.to(".jumping-icon", {
      y: -10,
      duration: 0.2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 0.1,
    });

    // Hide container after animations
    iconTimeline.add(() => {
      floatingIconsContainer.classList.add("hidden");
    });
  }

  //Model handling
  function showModal() {
    resultsModal.classList.remove("hidden");
  }

  function hideModal() {
    resultsModal.classList.add("hidden");
  }

  closeModal.addEventListener("click", hideModal);

  //wheel spin
  btn.addEventListener("click", () => {
    if (btn.textContent === "Reset") {
      resetWheel();
    } else {
      spinWheel();
    }
  });

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
  
    // Get the result details
    const resultName = randomPub.name || "Not available";
    const resultAddress = randomPub.address || "Not available";
    const resultArea = randomPub.location || "Not available";
  
    document.getElementById("result-name").textContent = resultName;
    document.getElementById("result-address").textContent = resultAddress;
    document.getElementById("result-area").textContent = resultArea;
  
    // Get the current saved results from localStorage
    const spinResults = JSON.parse(localStorage.getItem("spinResults")) || [];
  
    // Get today's date without time
    const dateOnly = new Date().toLocaleDateString(); // Formats the date to just the date part
  
    // Add the new result at the beginning of the array
    spinResults.unshift({
      name: resultName,
      address: resultAddress,
      area: resultArea,
      timestamp: dateOnly, // Use the date only (no time)
    });
  
    // Keep only the latest 5 results (by slicing the array)
    if (spinResults.length > 5) {
      spinResults.pop(); // Removes the oldest result (last item)
    }
  
    // Save the updated array back to localStorage
    localStorage.setItem("spinResults", JSON.stringify(spinResults));
  
    // Call the function to reload and display the saved results
    loadSavedResults(); // Update the displayed list of results
  }

    // Accordion initialization function
    function initializeAccordion(accordionHeadingId, accordionBodyId) {
      const accordionButton = document.querySelector(`#${accordionHeadingId} button`);
      const accordionBody = document.getElementById(accordionBodyId);
  
      if (accordionButton) {
        accordionButton.addEventListener("click", () => {
          const isExpanded = accordionButton.getAttribute("aria-expanded") === "true";
          accordionButton.setAttribute("aria-expanded", !isExpanded);
          accordionBody.classList.toggle("hidden", isExpanded);
        });
      }
    }

  // Function to load saved results from localStorage
  function loadSavedResults() {
    // Retrieve results from localStorage
    const savedResults = JSON.parse(localStorage.getItem("spinResults")) || [];

    // Get the accordion container where results will be displayed
    const accordionContainer = document.getElementById("accordion-collapse");

    // Clear existing content before adding new items
    accordionContainer.innerHTML = "";

    // Loop through each saved result and create an accordion item
    savedResults.forEach((result, index) => {
      // Create a unique ID for each accordion item based on the index
      const accordionHeadingId = `accordion-collapse-heading-${index + 1}`;
      const accordionBodyId = `accordion-collapse-body-${index + 1}`;

      // Create the HTML for the accordion item
      const accordionItem = document.createElement("div");
      accordionItem.innerHTML = `
        <h2 id="${accordionHeadingId}">
          <button type="button" class="flex items-center justify-center mx-auto w-full max-w-[400px] p-5 font-fd-karla text-fd-dark border border-gray-200 rounded-xl bg-fd-bg-white focus:ring-10 focus:ring-fd-bg-orange gap-3" data-accordion-target="#${accordionBodyId}" aria-expanded="false" aria-controls="${accordionBodyId}">
            <span class="font-fd-souvenir text-lg md:text-2xl">${result.name}</span>
            <svg data-accordion-icon class="w-4 h-4 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
            </svg>
          </button>
        </h2>
        <div id="${accordionBodyId}" class="hidden mx-auto w-full max-w-[400px]" aria-labelledby="${accordionHeadingId}">
          <div class="p-5 rounded-xl border border-t-0 border-gray-200">
            <p class="text-fd-dark font-fd-karla text-lg md:text-xl mb-2">
              Address: <span class="text-fd-concieve-pink font-fd-souvenir font-bold">${result.address}</span>
            </p>
            <p class="text-fd-dark font-fd-karla text-lg md:text-xl mb-2">
              Area: <span class="text-fd-create-blue font-fd-souvenir font-bold">${result.area}</span>
            </p>
            <p class="text-fd-dark font-fd-karla text-lg md:text-xl">
              Date: <span class="text-fd-discover-orange font-fd-souvenir font-bold">${result.timestamp}</span>
            </p>
          </div>
        </div>
      `;

      if (savedResults.length === 0) {
        document.getElementById('saved-results-placeholder').style.display = 'block';
      } else {
        document.getElementById('saved-results-placeholder').style.display = 'none';
      }

      // Append the new accordion item to the container
      accordionContainer.appendChild(accordionItem);
      initializeAccordion(accordionHeadingId, accordionBodyId);
    });

    // Optional: Initialize the accordion behavior (using Flowbite or your custom accordion logic)
    // If using Flowbite, make sure to initialize its accordion JS component:
    // new Accordion(document.getElementById('accordion-collapse'));
  }

  // Call loadSavedResults to display saved results when the page loads
  loadSavedResults();


  // copyright date
  copyRightDate.innerHTML = new Date().getFullYear();
});
