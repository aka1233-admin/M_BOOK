$(document).ready(function () {
  const totalPages = 152;

  const coverPages = [1, 2, 3, 4, 31, 47, 71, 97, 120, 145]; // internal + outer covers

  // Section definitions (startPage: { title, subtitle })
  const sections = [
    { start: 4, title: "Vascular Intervention", subtitle: "Generic" },
    { start: 31, title: "Cardiac Surgery", subtitle: "Generic" },
    { start: 47, title: "Orthopedic", subtitle: "Generic" },
    { start: 71, title: "Endo Surgery", subtitle: "Generic" },
    { start: 97, title: "Dignostics", subtitle: "Generic" },
    { start: 120, title: "ENT", subtitle: "Generic" },
    { start: 145, title: "Trauma", subtitle: "Generic" }
  ];

  // Function to get section title and subtitle based on page number
  function getHeaderForPage(pageNumber) {
    let currentSection = sections[0];
    for (let i = 0; i < sections.length; i++) {
      if (pageNumber >= sections[i].start) {
        currentSection = sections[i];
      } else {
        break;
      }
    }
    return createHeader(currentSection.title, currentSection.subtitle);
  }

  // Header generator with dynamic title & subtitle
  function createHeader(title = "Default Title", subtitle = "Generic") {
    return `
      <header class="custom-header">
        <div class="left-section">
          <img src="images/placeholder.jpg" alt="Heart" class="icon" />
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
    let isCover = coverPages.includes(i);
    let fileName = isCover ? `cover${i}.html` : `page${i}.html`;

    $('#flipbook').append(`<div id="page${visualPageNumber}" class="page">Loading page ${i}</div>`);

    // Load content with dynamic header
    $(`#page${visualPageNumber}`).load(`pages/${fileName}`, function () {
      if (!isCover) {
        $(this).prepend(getHeaderForPage(i));
        injectSpeakButtonsForBoldTerms(containerElement); // Use real page number to determine section
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

  // Click Navigation
  $('#flipbook').on('click', '.page', function (e) {
    const flipbook = $('#flipbook');
    const currentPage = flipbook.turn('page');
    const totalPages = flipbook.turn('pages');

    const pageWidth = $(this).outerWidth();
    const clickX = e.pageX - $(this).offset().left;

    if (clickX < pageWidth / 2) {
      if (currentPage > 1) {
        flipbook.turn('previous');
      }
    } else {
      if (currentPage < totalPages) {
        flipbook.turn('next');
      }
    }
  });
});



