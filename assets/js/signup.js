var job_c=1,experience_c=1;
var current_fs, next_fs, previous_fs; 
var left, opacity, scale; 
var animating,pass=false; 
jQuery(document).ready(function($) {
    $(".button-collapse").sideNav();
    $('select').material_select();
    $('input[name=submit]').prop('disabled',false);
    $('input[name=submit]').css('background-color' ,'');
    for(var i=5;i>0;i--)
    {
        $('#exp'+i).hide();
        $('#brand'+i).hide();

    }

    if(!document.getElementById("basicuser")){
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
        
        $('#same_as_home_mailing').click(function(){
            if($("#same_as_home_mailing").is(':checked'))
            {
                $('input[name*=ship]').prop('disabled',true);
                $('select[name*=ship]').prop('disabled',true);
            }
            else
            {
                $('input[name*=ship]').prop('disabled',false);
                $('select[name*=ship]').prop('disabled',false);
            }
        });

        $('#englishacent').click(function() {
            if($("#englishacent").is(':checked'))
            {
                $('.englishacent_yes' ).fadeTo(400, 1);
                $('.englishacent_no' ).fadeTo(400, 0);
            }
            else
            {
                $('.englishacent_yes' ).fadeTo(400, 0);
                $('.englishacent_no' ).fadeTo(400, 1);
            }
        });
        $('#englishfuently').click(function() {
            if($("#englishfuently").is(':checked'))
            {
                $('.englishfuently_yes' ).fadeTo(400, 1);
                $('.englishfuently_no' ).fadeTo(400, 0);
            }
            else
            {
                $('.englishfuently_yes' ).fadeTo(400, 0);
                $('.englishfuently_no' ).fadeTo(400, 1);
            }
        });
        $('#tatoos').click(function() {
            if($("#tatoos").is(':checked'))
            {
                $('.tatoos_yes' ).fadeTo(400, 1);
                $('.tatoos_no' ).fadeTo(400, 0);
            }
            else
            {
                $('.tatoos_yes' ).fadeTo(400, 0);
                $('.tatoos_no' ).fadeTo(400, 1);
            }
        });
        $('#piercings').click(function() {
            if($("#piercings").is(':checked'))
            {
                $('.piercings_yes' ).fadeTo(400, 1);
                $('.piercings_no' ).fadeTo(400, 0);
            }
            else
            {
                $('.piercings_yes' ).fadeTo(400, 0);
                $('.piercings_no' ).fadeTo(400, 1);
            }
        });
        $('#xptech').click(function() {
            if($("#xptech").is(':checked'))
            {
                $('.xptech_yes' ).fadeTo(400, 1);
                $('.xptech_no' ).fadeTo(400, 0);
            }
            else
            {
                $('.xptech_yes' ).fadeTo(400, 0);
                $('.xptech_no' ).fadeTo(400, 1);
            }
        });
        $('#cap_info').click(function() {
            if($("#cap_info").is(':checked'))
            {
                $('.cap_info_yes' ).fadeTo(400, 1);
                $('.cap_info_no' ).fadeTo(400, 0);
            }
            else
            {
                $('.cap_info_yes' ).fadeTo(400, 0);
                $('.cap_info_no' ).fadeTo(400, 1);
            }
        });
        $('#xpsocial').click(function() {
            if($("#xpsocial").is(':checked'))
            {
                $('.xpsocial_yes' ).fadeTo(400, 1);
                $('.xpsocial_no' ).fadeTo(400, 0);
            }
            else
            {
                $('.xpsocial_yes' ).fadeTo(400, 0);
                $('.xpsocial_no' ).fadeTo(400, 1);
            }
        });
        $('#licensev').click(function(){

            if($("#licensev").is(':checked'))
            {
                $('.licensev_yes' ).fadeTo(400, 1);
                $('.licensev_no' ).fadeTo(400, 0);

                $('#upload_drivlic').prop('disabled',false);
                $('#upload_drivlic').css('background-color' ,'');
                $('#upload_drivlic_').show('slow');
            }
            else
            {
                $('.licensev_yes' ).fadeTo(400, 0);
                $('.licensev_no' ).fadeTo(400, 1);

                $('#upload_drivlic').prop('disabled',true);
                $('#upload_drivlic').css('background-color' ,'gray');
                 $('#upload_drivlic_').hide('slow');
            }

        });
        $('#ownmb').click(function() {
            if($("#ownmb").is(':checked'))
            {
                $('.ownmb_yes' ).fadeTo(400, 1);
                $('.ownmb_no' ).fadeTo(400, 0);
            }
            else
            {
                $('.ownmb_yes' ).fadeTo(400, 0);
                $('.ownmb_no' ).fadeTo(400, 1);
            }

        });
        $('#apitm').click(function() {
            if($("#apitm").is(':checked'))
            {
                $('.apitm_yes' ).fadeTo(400, 1);
                $('.apitm_no' ).fadeTo(400, 0);
            }
            else
            {
                $('.apitm_yes' ).fadeTo(400, 0);
                $('.apitm_no' ).fadeTo(400, 1);
            }

        });
        $('#legally').click(function() {
            if($("#legally").is(':checked'))
            {
                $('.legally_yes' ).fadeTo(400, 1);
                $('.legally_no' ).fadeTo(400, 0);
            }
            else
            {
                $('.legally_yes' ).fadeTo(400, 0);
                $('.legally_no' ).fadeTo(400, 1);
            }

        });
         $('#answ2').click(function() {
            if($("#answ2").is(':checked'))
            {
                $('.answ2_yes' ).fadeTo(400, 1);
                $('.answ2_no' ).fadeTo(400, 0);
            }
            else
            {
                $('.answ2_yes' ).fadeTo(400, 0);
                $('.answ2_no' ).fadeTo(400, 1);
            }

        });
        $('#answ1').click(function() {
            if($("#answ1").is(':checked'))
            {
                $('.answ1_yes' ).fadeTo(400, 1);
                $('.answ1_no' ).fadeTo(400, 0);
            }
            else
            {
                $('.answ1_yes' ).fadeTo(400, 0);
                $('.answ1_no' ).fadeTo(400, 1);
            }

        });

        $('#gender').click(function(){
            if($("#gender").is(':checked'))
            {
                $("#female_data").show("slow");
                $("#male_data").hide("slow");
            }
            else
            {
                $("#male_data").show("slow");
                $("#female_data").hide("slow");
            }
            
        });

        $('#add_exp').click(function(){
            if(experience_c<6){$('#exp'+experience_c).show('slow');experience_c++;}
            return false;
        });

        $( "#del_exp" ).click(function(){
            if(experience_c>1){$('#exp'+(experience_c-1)).hide('slow');experience_c--;}
            return false;
        });

        $('#add_brand').click(function(){
            if(job_c<6){$('#brand'+job_c).show('slow');job_c++;}
            return false;
        });

        $( "#del_job" ).click(function(){
            if(job_c>1){$('#brand'+(job_c-1)).hide('slow');job_c--;}
            return false;
        });

    });

    function getCheckBoxState(checkbox)
    {
        if(checkbox.is(':checked'))
            return 1;
        else
            return 0;
    }