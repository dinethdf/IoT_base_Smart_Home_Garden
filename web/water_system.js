$(document).ready(function(){
  var database = firebase.database();
 
  var senser_data;
  var low_lim;
  var up_lim;
  var upper_autoOff;

    database.ref().on("value", function(snap){
       
    senser_data = snap.val().senser_value;
    upper_autoOff = snap.val().upper_autoOff;
     $("#sensval").html(senser_data);

      var set_val_stat;
     set_val_stat = snap.val().upper_limit;
     

          if(set_val_stat == "999"){
           // alert(set_val_stat);
             document.getElementById("lim_val").innerHTML = "Limit Not Set";
             $("#water_moter_auto").html("");
            if(senser_data > upper_autoOff){
                var firebase_up_lim = firebase.database().ref().child("upper_limit");
                    firebase_up_lim.set("455");
           }
           } else if (set_val_stat == "555"){
             document.getElementById("lim_val").innerHTML = " System OFF";
                var firebaseRef6 = firebase.database().ref().child("watermoState");
         firebaseRef6.set(0);
          $("#water_moter_auto").html("");
             
           }else if (set_val_stat == "666"){
             var firebaseRef6 = firebase.database().ref().child("watermoState");
               firebaseRef6.set(0);
                var firebase_up_lim = firebase.database().ref().child("upper_limit");
                    firebase_up_lim.set("999");
           }else if (set_val_stat == "455"){
             document.getElementById("lim_val").innerHTML = " Limit Not Set";
             $("#water_moter_auto").html("Water Level Full ");
              var firebaseRef6 = firebase.database().ref().child("watermoState");
                 firebaseRef6.set(0); 
                             if(senser_data < upper_autoOff){
                var firebase_up_lim = firebase.database().ref().child("upper_limit");
                    firebase_up_lim.set("999");
           }
           }
           else {

           let l_lim = snap.val().low_limit;  
           let u_lim = snap.val().upper_limit; 
           let text = "Limit Set " + l_lim + " - " + u_lim 
           document.getElementById("lim_val").innerHTML = text;
           // alert("aaa");  

          if(senser_data < l_lim){
             var firebaseRef6 = firebase.database().ref().child("watermoState");
             firebaseRef6.set(1);

             $("#water_moter_auto").html("Auto on");
             $("#lim_set_moter_off").hide(); 
             $("#lim_set_moter_on").hide(); 

           } else if (senser_data > u_lim){  
                  var firebaseRef6 = firebase.database().ref().child("watermoState");
                   firebaseRef6.set(0); 
                   
              $("#water_moter_auto").html("Auto off");
              $("#lim_set_moter_off").hide(); 
              $("#lim_set_moter_on").hide(); 

           } 


           }   
    
  });

     database.ref().on("value", function(snap){
    let set_val_stat;
    var set_val_mot_Lim;
     set_val_stat = snap.val().upper_limit;

      if(set_val_stat == "999"|| set_val_stat == "666"){
           $("#sys_on").hide(); 
         $("#on_off_motor").show();
         $("#lim_on").show(); 
         $("#lim_off").hide(); 
         $("#sys_off").show();   
         $("#lim_motor_onoff").hide();   
         } else if (set_val_stat == "555"){           
             $("#on_off_motor").hide();
             $("#lim_on").hide();  
             $("#lim_off").hide();  
             $("#sys_on").show();  
             $("#sys_off").hide();  
             $("#lim_motor_onoff").hide();  

        } else if (set_val_stat == "455"){
             $("#on_off_motor").show();
             $("#lim_on").show();  
             $("#lim_off").hide();  
             $("#sys_on").hide(); 
             $("#lim_motor_onoff").hide(); 
        }
         else {
         $("#lim_off").show();
         $("#lim_on").show();
         $("#lim_motor_onoff").show();
        $("#on_off_motor").hide(); 
          $("#sys_on").hide(); 
    }

         set_val_mot_Lim = snap.val().watermoState;

          if(set_val_mot_Lim == 1){

         $("#lim_set_moter_on").hide(); 
         $("#lim_set_moter_off").show(); 
       
         }  else if(set_val_mot_Lim == 0){

         $("#lim_set_moter_off").hide(); 
         $("#lim_set_moter_on").show(); 
       
         }
        });
// watering System ####################################################
  
   var watermostate;
  // var led_bord_stat4;
  database.ref().on("value", function(snap){
     
     watermostate = snap.val().watermoState;
     // watermo_bor_state = snap.val().watermo_bor_tate;

          if(watermostate == 1){
             $("#water_moter_stat").html("Moter ON");
           }
           //  else if (watermostate == 555){  
           //    $("#water_moter_stat").html("System OFF");
           // } 
           else {  
              $("#water_moter_stat").html("Moter OFF");
           }  
     });

     $("#water_moter_on").click(function(){
       var firebaseRef6 = firebase.database().ref().child("watermoState");
       
          firebaseRef6.set(1);
        watermostate = 1;  
          lim_off01();                      
  });
    $("#water_moter_off").click(function(){
       var firebaseRef6 = firebase.database().ref().child("watermoState");

         firebaseRef6.set(0);
        watermostate = 0;
         lim_off01();
  }); 


});

function set_limit() {

    
  var firebase_low_lim = firebase.database().ref().child("low_limit");
  var firebase_up_lim = firebase.database().ref().child("upper_limit");
 
  let low = document.getElementById("low_lim").value;
  let up = document.getElementById("up_lim").value;
 
 
  if (isNaN(low) || low < 0 || low > 101) {
  
     alert("Limit Set is Not Done Low value are Not Assept");
  } else {
    if (isNaN(up) || up < 0 || up > 100 ) {
  
          alert("Limit Set is Not Done High value are Not Assept");
    }
    else {
        if ( low >  up) {
           alert("Lower value and High value Not Asseptable"); 
        }
        else {

  firebase_low_lim.set(low);
  firebase_up_lim.set(up);
  //document.getElementById("lim_set").reset();
  alert("Limit Set is Done");
    } 
    }
    }
}

function lim_off01() {
    var firebase_up_lim = firebase.database().ref().child("upper_limit");
     firebase_up_lim.set("999");
}

function set_limit_off() {
    var firebase_up_lim = firebase.database().ref().child("upper_limit");
     firebase_up_lim.set("666");
}

function system_off() {

     var firebase_up_lim = firebase.database().ref().child("upper_limit");
          firebase_up_lim.set("555");      
      $("#water_moter_stat").html("System OFF");  
         // set_limit_off();

}function limit_m_on() {

    var firebaseRef6 = firebase.database().ref().child("watermoState");
             firebaseRef6.set(1);
              $("#water_moter_auto").html("Manual");

}
function limit_m_off() {

    var firebaseRef6 = firebase.database().ref().child("watermoState");
             firebaseRef6.set(0);
     $("#water_moter_auto").html("Manual");
}
function system_on() {

     var firebase_up_lim = firebase.database().ref().child("upper_limit");
          firebase_up_lim.set("999");      
      $("#water_moter_stat").html("System On");  
         // set_limit_off();

}


// function set_limit() {
//   var firebase_low_lim = firebase.database().ref().child("low_limit");
//   var firebase_up_lim = firebase.database().ref().child("upper_limit");
 
//   let low = document.getElementById("lowlim").value;
//   let up = document.getElementById("uplim").value;
 
//   let text;
//   if (isNaN(low) || low < 1 || low > 100) {
//     text = "Input not valid";
//     document.getElementById("low_limit").innerHTML = "Input not valid";
//   } else {

//     if (isNaN(up) || up < 1 || up > 100) {
//       text = "Input not valid";
//        document.getElementById("up_limit").innerHTML = "Input not valid";
//     }
//     else {
 
//   document.getElementById("low_limit").innerHTML = low;
//   document.getElementById("high_limit").innerHTML = up;
//   firebase_low_lim.set(low);
//   firebase_up_lim.set(up);
//   document.getElementById("lim_set").reset();

//     } 
//   }

//   ;
// }

