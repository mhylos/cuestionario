var selected;
var alt_correcta;
var currentQ = 1;
var preguntas;

$(document).ready(function () {
    firstLoadContent();
});

function firstLoadContent() {
    let params = new URLSearchParams(location.search);
    var id = params.get('id');
    var id_ramo = params.get('ramo');

    $.getJSON("data/"+id_ramo+".json", function (e){
        $('h2').text(e.nombre);
        var contenidos = e.contenidos;
        preguntas = getContentById(id, contenidos);
        $('h3').text(preguntas[0].contenido_preg);
        for (i = 0; i < preguntas[0].respuestas.length; i++) {
            $('[respuesta-id="'+i+'"]').children()[1].innerHTML = preguntas[0].respuestas[i].contenido_resp;

            if (preguntas[0].respuestas[i].correcta) alt_correcta = i;
            
        }
    });
    addRadioListener()
}

function getContentById(id, contenidos) {
    for (i = 0; i < contenidos.length; i++)
        if (contenidos[i].id == id) return contenidos[i].preguntas;
    return null
}

function addRadioListener() {
    $('.form-check').click(function(e) {
        selected = e.currentTarget.getAttribute('respuesta-id');
    })
}

function correct() {
    var span_correcto = $('#correcto')
    var span_incorrecto = $('#incorrecto')
    if (selected == alt_correcta) {
        span_incorrecto.css('display','none');
        span_correcto.css('display','block');
    } else {
        span_incorrecto.css('display','block')
        span_correcto.css('display','none');
    };
}

function loadNextContent(){
    if (currentQ == preguntas.length-1) $('#siguiente').css('display', 'none');
    currentQ++;
    if (currentQ > 1) $('#anterior').css('display', 'block');

    
    $('#correcto').css('display','none');
    $('#incorrecto').css('display','none');
    $('#nro-preg').text(currentQ);
    $('h3').text(preguntas[currentQ-1].contenido_preg);
    for (i = 0; i < preguntas[currentQ-1].respuestas.length; i++) {
        $('[respuesta-id="'+i+'"]').children()[1].innerHTML = preguntas[currentQ-1].respuestas[i].contenido_resp;

        if (preguntas[currentQ-1].respuestas[i].correcta) alt_correcta = i;
        
    }
}

function loadPrevContent(){
    if (currentQ == 2) $('#anterior').css('display', 'none');
    $('#siguiente').css('display', 'block');

    currentQ--;
    
    $('#correcto').css('display','none');
    $('#incorrecto').css('display','none');
    $('#nro-preg').text(currentQ);
    $('h3').text(preguntas[currentQ-1].contenido_preg);
    for (i = 0; i < preguntas[currentQ-1].respuestas.length; i++) {
        $('[respuesta-id="'+i+'"]').children()[1].innerHTML = preguntas[currentQ-1].respuestas[i].contenido_resp;

        if (preguntas[currentQ-1].respuestas[i].correcta) alt_correcta = i;
        
    }
}