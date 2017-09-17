// jquery init

$( document ).ready(function() {


document.body.className += 'fade-out';

$('body').removeClass('fade-out');


// $('.nav a').click(function () {
//   var $href = $(this).attr('href');
//   $('body').stop().animate({
//     scrollTop: $($href).offset().top
//   }, 1000);
//   return false;
// });

$('#toTop a').click(function () {
  $('body').animate({
    scrollTop: 0
  }, 1000);
  return false;
});

   $('a').click(function(){
       var link = $(this).attr('href');
       $('body').fadeOut('slow', function(){
        window.location.href = link;
       });
       return false;
   });
});
