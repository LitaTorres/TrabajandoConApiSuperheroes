$(document).ready(function () {

    //Formulario
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

    //Conectando con AJAX
    function superheroe(id) {
        var urlApi = "https://superhero.arielhernandezcl.workers.dev/" + id;
        $.ajax({
            type: "GET",
            url: urlApi,
            dataType: "json",
            success: function (datosApi) {
                // recordar que como es un objeto no es necesario usar el forEach (no es array)
                console.log(datosApi);
                $('.ordenandoCard').show();
                $('.card-title').text(`Nombre: ${datosApi.name}`);
                $('.card-text1').text(`Conexiones: ${datosApi.connections['group-affiliation']}`);
                $('.card-text2').text(`Publicado por: ${datosApi.biography['alter-egos']}`);
                $('.card-text3').text(`Ocupación: ${datosApi.work.occupation}`);
                $('.card-text4').text(`Primera Aparición: ${datosApi.biography['first-appearance']}`);
                $('.card-text5').text(`Altura: ${datosApi.appearance.height}`);
                $('.card-text6').text(`Peso: ${datosApi.appearance.weight}`);
                $('.card-text7').text(`Alianzas: ${datosApi.biography.aliases}`);
                $('.card-img').attr('src', datosApi.image.url);
            },
            error: function (error) {
                console.log(error)
            }
        });
// Graficando
        $.ajax({
            type: "GET",
            url: urlApi,
            dataType: "json",
            success: function (datosApi) {
                console.log(datosApi);

                var options = {
                    title: {
                        text: `Estadisticas de poder para ${datosApi.name}`
                    },
                    data: [{
                        type: "pie",
                        startAngle: 45,
                        showInLegend: "true",
                        legendText: "{label}",
                        indexLabel: "{label} ({y})",
                        yValueFormatString: "#,##0.#" % "",
                        dataPoints: [{
                                label: "Poder",
                                y: `${datosApi.powerstats.power}`
                            },
                            {
                                label: "Combate",
                                y: `${datosApi.powerstats.combat}`
                            },
                            {
                                label: "Durabilidad",
                                y: `${datosApi.powerstats.durability}`
                            },
                            {
                                label: "Rapidez",
                                y: `${datosApi.powerstats.speed}`
                            },
                            {
                                label: "Fuerza",
                                y: `${datosApi.powerstats.strength}`
                            },
                            {
                                label: "Inteligencia",
                                y: `${datosApi.powerstats.intelligence}`
                            },
                        ]
                    }]
                };
                $("#chartContainer").CanvasJSChart(options);
            }
        });
    };
});