//Formulario
$("#boton-enviar").on('click', function () {
    limpiarFormulario();
    $("#contenedor-formulario").append(`<h2 id="mensaje"> Formulario enviado con éxito🤙`);
    $(".close").on('click', function (){
        $("#mensaje").css('display', 'none');
    })
});

function limpiarFormulario() {
    document.getElementById("formulario").reset();
  }