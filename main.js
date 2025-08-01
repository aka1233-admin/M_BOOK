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

  // Load all 150 pages (dynamically check file name)
  for (let i = 1; i <= totalPages; i++) {
    const isCover = i <= 4; // OR use: filename logic if needed
    const fileName = isCover ? `cover${i}.html` : `page${i}.html`;

    $('#flipbook').append(`<div id="page${i}" class="page">Loading...</div>`);

    $(`#page${i}`).load(`pages/${fileName}`, function () {
      // ✅ Only prepend header if it's not a cover page
      if (!fileName.startsWith("cover")) {
        $(this).prepend(createHeader());
      }
    });
  }

  // ✅ Flipbook init
  $('#flipbook').turn({
  width: $(window).width(),
  height: $(window).height(),
  autoCenter: true,
  display: 'single',
  duration: 800,
});
});
