$(document).ready(function () {
  const totalPages = 150;

  const coverPages = [1, 2, 3, 4,31,47,71,97,120,145]; // Add any internal cover pages here

  function createHeader() {
    return `
      <header class="custom-header">
        <div class="left-section">
          <img src="images/placeholder.jpg" alt="Heart" class="icon" />
        </div>
        <div class="center-section">
          <div class="title">Vascular Intervention</div>
          <div class="subtitle">Generic</div>
        </div>
        <div class="right-section">
          <img src="images/RI.svg" alt="RI Logo" class="ri-logo" />
        </div>
      </header>
    `;
  }

  let visualPageNumber = 1; // this is the flipbook visible page counter

  for (let i = 1; i <= totalPages; i++) {
    let isCover = coverPages.includes(i);
    let fileName = isCover ? `cover${i}.html` : `page${i}.html`;

    // Use logical id to avoid skipping visual page numbers
    $('#flipbook').append(`<div id="page${visualPageNumber}" class="page">Loading page ${i}</div>`);

    // Load content and conditionally add header
    $(`#page${visualPageNumber}`).load(`pages/${fileName}`, function () {
      if (!isCover) {
        $(this).prepend(createHeader());
      }
    });

    // Only increment visual page number if not a hidden skip
    visualPageNumber++;
  }

  // Initialize flipbook
  $('#flipbook').turn({
    width: '100%',
    height: '100%',
    autoCenter: true,
    display: 'single',
    duration: 800,
    acceleration: true
  });

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
