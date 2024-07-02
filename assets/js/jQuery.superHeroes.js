jQuery.fn.superHeroes = function () {

    var element = this;
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
            $('.ordenandoCard2').hide(); // agregué esta linea para que al hacer clic en el boton "buscar", siempre q pase la validación, se oculten las 4 imagenes de la card del inicio
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
        var urlApi = "https://www.superheroapi.com/api.php/4905856019427443/" + id;
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
//Grafico de tortita
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
                                label: "Velocidad",
                                y: `${datosApi.powerstats.speed}`
                            },
                            {
                                label: "Fortaleza",
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

        return this;
    }

//Poner 4 imágenes en cards al inicio de 4 ids diferentes
const ids = [502, 341, 346, 638];
const ClasesImgCard = ['.card-img2','.card-img3','.card-img4','.card-img5']

   ids.forEach((id, index) => {
        var urlApi = `https://www.superheroapi.com/api.php/4905856019427443/${id}`;
        $.ajax({
            type: "GET",
            url: urlApi,
            dataType: "json",
            success: function (datosApi) {
                console.log(datosApi);
                $('.ordenandoCard2').show();
                $(ClasesImgCard[index]).attr('src', datosApi.image.url);
            },
            error: function (error) {
                console.log(error)
            }
        });
    })
};
