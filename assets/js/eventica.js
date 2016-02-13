function notificar(msg){
    $('.top-left').notify({
                    message: { text: msg },
                    type:'blackgloss'
                  }).show();
}
function notificar(msg,style){
    $('.top-left').notify({
                    message: { text: msg },
                    type:style
                  }).show();
}
function notificar(msg,tiempo){
    $('.top-left').notify({
                    message: { text: msg },
                    type:'blackgloss',
                    fadeOut: { enabled: true, delay: tiempo }
                  }).show();
}
