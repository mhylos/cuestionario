const quizes = 'data/quizes.json';
const LIMIT_MD = 3; //limite de contenidos a mostrar en resolucion pequeña

$(document).ready(function () {
    showBtns();
});

function showBtns(){
    var html = '';;
    $.getJSON(quizes, function (e){
        var cont = 0;
        e.forEach(ramo => {
            cont++;
            //DIV 0 OPEN 
            html+='<div class="d-flex flex-column align-items-center p-3">';

            html+='<h2>'+ramo.nombre+'</h2>';
            //DIV 1 OPEN 
            html+='<div class="d-grid gap-2 d-md-inline-flex" ramo-id="'+ramo.id+'">';
            var cont_limit = LIMIT_MD;
            
            var cont_contenido = 0;
            ramo.contenidos.forEach(contenido => {
                if (cont_limit == 0){
                    html += '<button class="btn btn-dark btn-sm order-last btn-toogle d-md-none" type="button" data-bs-toggle="collapse" data-bs-target="#viewMore'+ramo.id+'" aria-expanded="false" aria-controls="viewMore'+ramo.id+'">';
                    html += '<span class="btn-collapsed">Ver más</span>';
                    html += '<span class="btn-expanded">Ver menos</span>';
                    html += '</button>';
                    html += '<div class="collapse dont-collapse-sm" id="viewMore'+ramo.id+'"><div class="d-grid gap-2 d-md-inline-flex">';
                }
                if (cont_limit <= 0) {
                    html+='<button type="button" class="selectable btn btn-sm btn-light btn-outline-dark" id="'+contenido.id+'" ';
                    html+= contenido.habilitado == false ? "disabled>" : ">";
                    html+= contenido.nombre;
                    html+= '</button>';
                    
                } else {
                    html+='<button type="button" class="selectable btn btn-sm btn-light btn-outline-dark" id="'+contenido.id+'" ';
                    html+= contenido.habilitado == false ? "disabled>" : ">";
                    html+= contenido.nombre;
                    html+= '</button>';
                }
                cont_contenido++;
                html += cont_contenido == ramo.contenidos.length ? '</div></div>' : '';
                cont_limit--;
            });

            //DIV 1 CLOSE 
            html+= '</div>';
            
            //DIV 0 CLOSE 
            html+= '</div>';
            html+= e.length != cont ? '<hr class="mx-5 order-last">' : '';
        });
        $('main').html(html);
        addBtnListener();
    });
    
    $('#extra-text').on('hidden.bs.collapse', function () {
        $('#read-more').text('Read More');
      });
      $('#extra-text').on('shown.bs.collapse', function () {
        $('#read-more').text('Read less');
    });
}

function addBtnListener() {
    $(".selectable").click(function(e) {
        var id = $(this).attr('id')
        var ramo = $(this).parent().attr('ramo-id')
        window.location = ('quiz.html?ramo='+ramo+'&id='+id);
    });
}