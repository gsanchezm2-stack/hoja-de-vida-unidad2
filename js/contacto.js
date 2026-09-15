/* ============================================================
   Hoja de vida — Gabriel Alfonso Sánchez Martínez
   Actividad Unidad 2 · validación del formulario de contacto
   ============================================================ */

$(function () {

  const $form = $('#form-contacto');
  if ($form.length === 0) return;

  const $nombre = $('#nombre');
  const $correo = $('#correo');
  const $mensaje = $('#mensaje');
  const $alerta = $('#alerta-envio');

  const RE_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Cada regla dice cómo saber si el campo es válido y qué mensaje mostrar.
  const reglas = {
    nombre: {
      $campo: $nombre,
      esValido: (valor) => valor.trim().length >= 3,
      mensaje: 'Escribe tu nombre completo (mínimo 3 caracteres).'
    },
    correo: {
      $campo: $correo,
      esValido: (valor) => RE_CORREO.test(valor.trim()),
      mensaje: 'Escribe un correo válido, por ejemplo nombre@dominio.com.'
    },
    mensaje: {
      $campo: $mensaje,
      esValido: (valor) => valor.trim().length >= 10,
      mensaje: 'Cuéntame un poco más (mínimo 10 caracteres).'
    }
  };

  function validarCampo(regla) {
    const valor = regla.$campo.val() || '';
    const valido = regla.esValido(valor);
    regla.$campo
      .toggleClass('is-invalid', !valido)
      .toggleClass('is-valid', valido)
      .siblings('.invalid-feedback')
      .text(regla.mensaje);
    return valido;
  }

  // Validar en vivo mientras el usuario escribe o sale del campo.
  Object.values(reglas).forEach((regla) => {
    regla.$campo.on('input blur', () => validarCampo(regla));
  });

  $form.on('submit', function (evento) {
    evento.preventDefault();
    $alerta.addClass('d-none').removeClass('alert-exito');

    const resultados = Object.values(reglas).map(validarCampo);
    const formularioValido = resultados.every(Boolean);

    if (!formularioValido) {
      const $primerError = $form.find('.is-invalid').first();
      if ($primerError.length) {
        $('html, body').animate({ scrollTop: $primerError.offset().top - 120 }, 300);
        $primerError.trigger('focus');
      }
      return;
    }

    // Todos los campos son válidos: mostrar confirmación y enviar el
    // correo con los datos (el formulario usa mailto: como destino).
    $alerta
      .removeClass('d-none')
      .addClass('alert-exito')
      .text('¡Datos correctos! Se está abriendo tu programa de correo para enviar el mensaje.');

    setTimeout(() => {
      $form.off('submit');
      $form.trigger('submit');
    }, 700);
  });

});
