$(document).ready(function () {
  const totalPages = 152;

  const coverPages = [1, 2, 3, 4, 31, 47, 71, 97, 120, 145, 151, 152]; // internal + outer covers

  // Section definitions with subtitles and optional icons
  const sections = [
    {
      start: 4,
      title: "Vascular Intervention",
      subtitles: [
        { start: 4, subtitle: "Generic", icon: "../icons/Icon-1.png" },
        { start: 9, subtitle: "Coronary", icon: "../icons/Icon-2.png" },
        { start: 14, subtitle: "Congenital Heart", icon: "../icons/Icon-3.png" },
        { start: 19, subtitle: "Heart Valves", icon: "../icons/Icon-4.png" }
      ]
    },
    {
      start: 24,
      title: "Structural Heart",
      subtitles: [
        { start: 24, subtitle: "", icon: "../icons/Icon-9.png" }
      ]
    },
    {
      start: 26,
      title: "Vascular Intervention",
      subtitles: [
        { start: 26, subtitle: "Peripheral Vascular", icon: "../icons/Icon-5.png" }
      ]
    },
    {
      start: 31,
      title: "Cardiac Surgery",
      subtitles: [
        { start: 32, subtitle: "Generic", icon: "../icons/Icon-6.png" },
        { start: 36, subtitle: "Heart Valves", icon: "../icons/Icon-7.png" },
        { start: 41, subtitle: "Cardiac Product", icon: "../icons/Icon-8.png" }
      ]
    },
    {
      start: 47,
      title: "Orthopedic",
      subtitles: [
        { start: 48, subtitle: "Generic", icon: "../icons/Icon-10.png" },
        { start: 52, subtitle: "Total Knee System", icon: "../icons/Icon-11.png" },
        { start: 61, subtitle: "Spine", icon: "../icons/Icon-13.png" },
        { start: 65, subtitle: "Robotics", icon: "../icons/Icon-14.png" }
      ]
    },
    {
      start: 71,
      title: "Endo Surgery",
      subtitles: [
        { start: 72, subtitle: "Generic", icon: "../icons/Icon-15.png" },
        { start: 75, subtitle: "Sutures", icon: "../icons/Icon-16.png" },
        { start: 79, subtitle: "Staplers", icon: "../icons/Icon-17.png" },
        { start: 83, subtitle: "Hernia Mesh", icon: "../icons/Icon-18.png" },
        { start: 88, subtitle: "Biosurgicals", icon: "../icons/Icon-20.png" }
      ]
    },
    {
      start: 93,
      title: "Vascular Intervention",
      subtitles: [
        { start: 93, subtitle: "Women Healthcare", icon: "../icons/Icon-21.png" }
      ]
    },
    {
      start: 97,
      title: "Diagnostics",
      subtitles: [
        { start: 98, subtitle: "Generic", icon: "../icons/Icon-22.png" },
        { start: 104, subtitle: "Rapid Testing Kit", icon: "../icons/Icon-23.png" },
        { start: 109, subtitle: "Reagents", icon: "../icons/Icon-24.png" },
        { start: 114, subtitle: "Instruments", icon: "../icons/Icon-25.png" }
      ]
    },
    {
      start: 120,
      title: "ENT",
      subtitles: [
        { start: 121, subtitle: "Generic", icon: "../icons/Icon-26.png" },
        { start: 126, subtitle: "Coagulation System", icon: "../icons/Icon-27.png" },
        { start: 131, subtitle: "Nasal Packing", icon: "../icons/Icon-28.png" },
        { start: 135, subtitle: "Sinus Balloons", icon: "../icons/Icon-29.png" },
        { start: 141, subtitle: "Airways Management Devices", icon: "../icons/Icon-30.png" }
      ]
    },
    {
      start: 145,
      title: "Trauma",
      subtitles: [
        { start: 145, subtitle: "Generic", icon: "../icons/Icon-31.png" }
      ]
    }
  ];

  // Function to get section title, subtitle, and icon based on page number
  function getHeaderForPage(pageNumber) {
    let currentSection = sections[0];

    for (let i = 0; i < sections.length; i++) {
      if (pageNumber >= sections[i].start) {
        currentSection = sections[i];
      } else {
        break;
      }
    }

    let currentSubtitle = currentSection.subtitles[0].subtitle;
    let currentIcon = currentSection.subtitles[0].icon || "../icons/default.png";

    for (let j = 0; j < currentSection.subtitles.length; j++) {
      if (pageNumber >= currentSection.subtitles[j].start) {
        currentSubtitle = currentSection.subtitles[j].subtitle;
        currentIcon = currentSection.subtitles[j].icon || currentIcon;
      } else {
        break;
      }
    }

    return createHeader(currentSection.title, currentSubtitle, currentIcon);
  }

  // Header generator with dynamic title, subtitle, and icon
  function createHeader(title = "Default Title", subtitle = "Generic", icon = "../icons/default.png") {
    return `
      <header class="custom-header">
        <div class="left-section">
          <img src="${icon}" alt="Icon" class="icon" />
        </div>
        <div class="center-section">
          <div class="title">${title}</div>
          <div class="subtitle">${subtitle}</div>
        </div>
        <div class="right-section">
          <img src="images/RI.svg" alt="RI Logo" class="ri-logo" />
        </div>
      </header>
    `;
  }

  let visualPageNumber = 1;

  for (let i = 1; i <= totalPages; i++) {
    const isCover = coverPages.includes(i);
    const fileName = isCover ? `cover${i}.html` : `page${i}.html`;

    $('#flipbook').append(`<div id="page${visualPageNumber}" class="page">Loading page ${i}</div>`);

    $(`#page${visualPageNumber}`).load(`pages/${fileName}`, function () {
      if (!isCover) {
        $(this).prepend(getHeaderForPage(i));
        if (typeof injectSpeakButtonsForBoldTerms === "function") {
          injectSpeakButtonsForBoldTerms(this);
        }
      }
    });

    visualPageNumber++;
  }

  // Initialize flipbook
  $('#flipbook').turn({
    width: '100%',
    height: '100%',
    autoCenter: true,
    display: 'single',
    duration: 1000,
    acceleration: true
  });

  // Optional: Initialize TTS if defined
  if (typeof initializeTTS === "function") {
    initializeTTS();
  }

  // Keyboard Navigation
  $(document).on('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
      $('#flipbook').turn('previous');
    } else if (e.key === 'ArrowRight') {
      $('#flipbook').turn('next');
    }
  });
});
