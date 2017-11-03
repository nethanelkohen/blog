'use strict';

$(document).ready(function () {

  document.body.className += 'fade-out';

  $('body').removeClass('fade-out');

  $("a").click(function (event) {
    event.preventDefault();
    linkLocation = undefined.href;
    $("body").fadeOut(800, redirectPage);
  });

  var redirectPage = function redirectPage() {
    window.location = linkLocation;
  };
});