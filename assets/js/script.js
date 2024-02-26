
$(document).ready(function(){

let formulario = document.getElementById("formulario");
formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    limpiarErrores();

    let textNumero = document.querySelector(".textNumero").value;
    let resultado = validar(textNumero);

    if (resultado == true) {
        superheroe(textNumero); //antes decía solo funcion exito, pero ahora tb llamamos a la función creada
        exito();
    };
});

function limpiarErrores() {
    document.querySelector(".resultado").innerHTML = "";
    document.querySelector(".errorNumero").innerHTML = "";
}

function exito() {
    document.querySelector(".resultado").innerHTML = "Super consulta enviada con éxito";
};

function validar(numero) {
    let pasamosLaValidacion = true;

    let validacionNumero = /^[0-9]+$/;

    if (validacionNumero.test(numero) == false || numero < 1 || numero > 731) {
        document.querySelector(".errorNumero").innerHTML = "El número es requerido. Favor ingrese solo número entre el 1 y 731"
        pasamosLaValidacion = false;
    };

    return pasamosLaValidacion;
};



function superheroe(id) {
        var urlApi = "https://superhero.arielhernandezcl.workers.dev/" + id;
        $.ajax({
            type: "GET", 
            url: urlApi, 
            dataType: "json", 
            success: function(datosApi) {
                console.log(datosApi);

                    $('.resultado').append(`<p> id: ${datosApi.id} - nombre: ${datosApi.name} </p> `);

            },
            error: function(error) { 
                console.log(error)
            }
        });
    };
}); 