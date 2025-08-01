$(document).ready(function () {
  const totalPages = 150;

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

  // Load pages
  for (let i = 1; i <= totalPages; i++) {
    const isCover = i <= 4;
    const fileName = isCover ? `cover${i}.html` : `page${i}.html`;

    $('#flipbook').append(`<div id="page${i}" class="page">Loading...</div>`);

    $(`#page${i}`).load(`pages/${fileName}`, function () {
      if (!fileName.startsWith("cover")) {
        $(this).prepend(createHeader());
      }
    });
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

  // ✅ Allow click anywhere to turn page
  $('#flipbook').on('click', '.page', function (e) {
    const flipbook = $('#flipbook');
    const currentPage = flipbook.turn('page');
    const totalPages = flipbook.turn('pages');

    const pageWidth = $(this).outerWidth();
    const clickX = e.pageX - $(this).offset().left;

    if (clickX < pageWidth / 2) {
      // Left half → previous page
      if (currentPage > 1) {
        flipbook.turn('previous');
      }
    } else {
      // Right half → next page
      if (currentPage < totalPages) {
        flipbook.turn('next');
      }
    }
  });
});
