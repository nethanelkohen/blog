$(document).ready(() => {

  document.body.className += 'fade-out';

  $('body').removeClass('fade-out');

  $("a").click(function(event) {
    event.preventDefault();
    linkLocation = this.href;

    $("body").fadeOut(100, redirectPage);
  });

  function redirectPage() {
    window.location = linkLocation;
  }
});
