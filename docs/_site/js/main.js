$(window).scroll(function(){

  var wScroll = $(this).scrollTop();
  var headerH = $('header').height();
  var dropH   = $('nav ul').height();

  if (wScroll + 100 >= headerH) {
    $('nav').addClass('colored');
  } else {
    $('nav').removeClass('colored')
  }

  if (wScroll + dropH + 100 >= headerH) {
    $('nav ul').addClass('colored');
  } else {
    $('nav ul').removeClass('colored')
  }
});
