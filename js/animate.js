//Hacemos scroll en el menu
$('.Home').click( function(e) { 
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $("#intro-mangas").offset().top -100 
    }, 1500);
} );

$('.Mangas').click( function(e) { 
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $("#titulo__seccion").offset().top -86 
    }, 1500);
} );

$('.Figuras').on('click', function () {
    $('html, body').animate({
        scrollTop: $('#titulo__seccion2').offset().top -86 
    },1500);
  });

  $('.Contacto').on('click', function () {
    $('html, body').animate({
        scrollTop: $('#titulo__seccion4').offset().top -85
    },1500);
});