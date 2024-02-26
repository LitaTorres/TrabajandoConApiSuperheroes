
$(document).ready(function(){
    $('.boton1').on('click', function(){
        var urlApi = "https://superhero.arielhernandezcl.workers.dev/2";
        
        $.ajax({
            type: "GET", 
            url: urlApi, 
            dataType: "json", 
            success: function(datosApi) {
                console.log(datosApi);

                    $('.resultado2').append(`<p> id: ${datosApi.id} - nombre: ${datosApi.name} </p> `);

            },
            error: function(error) { 
                console.log(error)
            }
        });
    }); 
});
