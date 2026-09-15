/* ============================================================
   Hoja de vida — Gabriel Alfonso Sánchez Martínez
   Actividad Unidad 2 · animaciones y dinamismo con jQuery
   ============================================================ */

$(function () {

  /* 1. Botón "volver arriba": aparece al hacer scroll y sube con
     una animación suave en vez de un salto brusco.
     -------------------------------------------------------- */
  const $volverArriba = $(
    '<button id="volver-arriba" type="button" aria-label="Volver arriba" title="Volver arriba">' +
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">' +
        '<path d="M12 19V5"></path><path d="M5 12l7-7 7 7"></path>' +
      '</svg>' +
    '</button>'
  );
  $('body').append($volverArriba);

  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 320) {
      $volverArriba.addClass('visible');
    } else {
      $volverArriba.removeClass('visible');
    }
  });

  $volverArriba.on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 450);
  });

  /* 2. Aparición progresiva de tarjetas y bloques al entrar en
     pantalla (IntersectionObserver + jQuery para la clase final).
     -------------------------------------------------------- */
  const $elementos = $('.bloque, .proyecto, .ficha, table');
  $elementos.addClass('reveal');

  if ('IntersectionObserver' in window) {
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada, indice) => {
          if (entrada.isIntersecting) {
            const $el = $(entrada.target);
            setTimeout(() => $el.addClass('en-vista'), indice * 60);
            observador.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    $elementos.each(function () { observador.observe(this); });
  } else {
    // Sin soporte de IntersectionObserver: mostrar todo directamente.
    $elementos.addClass('en-vista');
  }

  /* 3. Pequeño efecto de "respiración" en el punto de estado
     disponible, para que la barra lateral se sienta viva.
     -------------------------------------------------------- */
  $('.punto').each(function () {
    const $punto = $(this);
    setInterval(() => {
      $punto.animate({ opacity: 0.35 }, 700).animate({ opacity: 1 }, 700);
    }, 1600);
  });

});
