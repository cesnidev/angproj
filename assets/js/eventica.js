function notificar(msg){
    $('.top-left').notify({
                    message: { text: msg },
                    type:'blackgloss',
                    fadeOut: { enabled: true, delay: 100 }
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


$(function(){
   $('.button-collapse').sideNav({
      menuWidth: 300, // Default is 240
      edge: 'right', // Choose the horizontal origin
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
  );
   $(".dropdown-button").dropdown();
});    

document.onkeydown = function(){
  switch (event.keyCode){
        case 116 : //F5 button
            event.returnValue = false;
            event.keyCode = 0;
            notificar('Please, dont refresh this page');
            return false;
        case 82 : //R button
            if (event.ctrlKey){ 
                event.returnValue = false;
                event.keyCode = 0;
                notificar('Please, dont refresh this page');
                return false;
            }
    }
} 
