// jquery init

$( document ).ready(function() {

document.body.className += 'fade-out';
$('body').removeClass('fade-out');

// $('a').click(function(){
//   var link = $(this).attr('href');
//     $('body').fadeOut('slow', function(){
//       window.location.href = link;
//   });
//  return false;
//    });

$("a").click(function(event){
    event.preventDefault();
    linkLocation = this.href;
$("body").fadeOut(800, redirectPage);
  });
  function redirectPage() {
    window.location = linkLocation;
    }



});
