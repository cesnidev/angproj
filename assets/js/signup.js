var job_c=1,experience_c=1;
var current_fs, next_fs, previous_fs; 
var left, opacity, scale; 
var animating,pass=false; 
jQuery(document).ready(function($) {
    $(".button-collapse").sideNav();
    $('select').material_select();
    
    if(!document.getElementById("basicuser") && !$('#basicuser').hasClass('ng-hide')){
        current_fs = $('.nextprofile').parent().parent();
        next_fs = current_fs.next();
    }
    else if(!document.getElementById("profile")){
        current_fs = $('.nextexperience').parent().parent();
        next_fs = current_fs.next();
    }
    else if(!document.getElementById("experience")){
        current_fs = $('.nextavailability').parent().parent();
        next_fs = current_fs.next()
    }
    else if(!document.getElementById("availability")){
        current_fs = $('.nextlegal').parent().parent();
        next_fs = current_fs.next()
    }
    else{
        current_fs = $('.nextbasic').parent().parent();
        next_fs = current_fs.next()
    }
});

$(function() {

        $('#tabcertified').click(function(){

            if($("#tabcertified").is(':checked'))
            {
                $('.tabcertified_yes' ).fadeTo(400, 1);
                $('.tabcertified_no' ).fadeTo(400, 0);

                $('#upload_tabc').prop('disabled',false);
                $('#upload_tabc').css('background-color' ,'');
                $('#upload_tabc_').show('slow');
            }
            else
            {
                $('.tabcertified_yes' ).fadeTo(400, 0);
                $('.tabcertified_no' ).fadeTo(400, 1);

                $('#upload_tabc').prop('disabled',true);
                $('#upload_tabc').css('background-color' ,'gray');
                 $('#upload_tabc_').hide('slow');
            }

        });
        
        $('#licensev').click(function(){
            if($("#licensev").is(':checked'))
            {
                $('#upload_drivlic').prop('disabled',false);
                $('#upload_drivlic').css('background-color' ,'');
            }
            else
            {
                $('#upload_drivlic').prop('disabled',true);
                $('#upload_drivlic').css('background-color' ,'gray');
            }
        });

    });