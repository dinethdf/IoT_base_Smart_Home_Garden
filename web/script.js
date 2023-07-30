 const config = {
  apiKey: "AIzaSyA8EU7D3IGPRvcVZTXW0zwqH6djla1CpNU",
    authDomain: "prosem0225.firebaseapp.com",
    databaseURL: "https://prosem0225-default-rtdb.firebaseio.com",
    projectId: "prosem0225",
    storageBucket: "prosem0225.appspot.com",
    messagingSenderId: "873347327888",
    appId: "1:873347327888:web:3ef2596cca0ab3543df515",
    measurementId: "G-M1363FL7G9"
  };

  // Initialize Firebase


  firebase.initializeApp(config);

  $(document).ready(function(){
  var database = firebase.database();

var bulb_on_img = "<img style='height: 75px;' src='1.jpg'>";
var bulb_on2_img = "<img style='height: 75px;' src='2.jpg'>";
var bulb_on3_img = "<img style='height: 75px;' src='3.jpg'>";
var bulb_off_img = "<img style='height: 75px;' src='4.jpg'>";

var pond_on_img = "<img style='height: 75px;' src='https://as2.ftcdn.net/jpg/01/66/86/29/500_F_166862953_6Vy6pir6kahx4x6B5c9saPbwQ6yqNAnK.jpg'>";
var pond_off_img = "<img style='height: 75px;' src='https://image.shutterstock.com/image-vector/vector-illustration-light-bulb-pop-260nw-679609204.jpg'>";

  var senser_data;

// LED 01 ####################################################
   var ledStatus1;
   var led_bord_stat1;
  
  database.ref().on("value", function(snap){
     
     ledStatus1 = snap.val().ledStatus1;
     // led_bord_stat1 = snap.val().led_bord_Status1;

          if(ledStatus1 == 1){
             $("#state_led_1").html(bulb_on_img);
           } else if(ledStatus1 == 2){  
              $("#state_led_1").html(bulb_on2_img);
           }  else if(ledStatus1 == 3){  
              $("#state_led_1").html(bulb_on3_img);
           }  else {  
              $("#state_led_1").html(bulb_off_img);
           }  


     });



     $("#btled1_1on").click(function(){
       var firebaseRef1 = firebase.database().ref().child("ledStatus1");

          firebaseRef1.set(1);
          ledStatus1 = 1;                     
  })
     $("#btled1_2on").click(function(){
       var firebaseRef1 = firebase.database().ref().child("ledStatus1");

          firebaseRef1.set(2);
          ledStatus1 = 2;                     
  })
     $("#btled1_3on").click(function(){
       var firebaseRef1 = firebase.database().ref().child("ledStatus1");

          firebaseRef1.set(3);
          ledStatus1 = 3;                     
  })
    $("#btled1_off").click(function(){
       var firebaseRef1 = firebase.database().ref().child("ledStatus1");

         firebaseRef1.set(0);
         ledStatus1 = 0;
  }); 




// LED 02 ####################################################
   var ledStatus2;
   var led_bord_stat2;
  
  database.ref().on("value", function(snap){
     
     ledStatus2 = snap.val().ledStatus2;
     // led_bord_stat2 = snap.val().led_bord_Status2;

          if(ledStatus2 == 1){
             $("#state_led_2").html(bulb_on_img);
           } else if(ledStatus2 == 2){  
              $("#state_led_2").html(bulb_on2_img);
           } else if(ledStatus2 == 3){  
              $("#state_led_2").html(bulb_on3_img);
           } else{  
              $("#state_led_2").html(bulb_off_img);
           }   
     });

     $("#btled2_1on").click(function(){
       var firebaseRef2 = firebase.database().ref().child("ledStatus2");
       
          firebaseRef2.set(1);
          ledStatus2 = 1;                        
  })
     $("#btled2_2on").click(function(){
       var firebaseRef2 = firebase.database().ref().child("ledStatus2");
       
          firebaseRef2.set(2);
          ledStatus2 = 1;                        
  })
     $("#btled2_3on").click(function(){
       var firebaseRef2 = firebase.database().ref().child("ledStatus2");
       
          firebaseRef2.set(3);
          ledStatus2 = 1;                        
  })
    $("#btled2_off").click(function(){
       var firebaseRef2 = firebase.database().ref().child("ledStatus2");

         firebaseRef2.set(0);
         ledStatus2 = 0;
  }); 

 
 // LED 03 ####################################################
  //  var ledStatus3;
  //  var led_bord_stat3;
  
  // database.ref().on("value", function(snap){
     
  //    ledStatus3 = snap.val().ledStatus3;
  //    // led_bord_stat3 = snap.val().led_bord_Status3;

  //         if(ledStatus3 == 1){
  //            $("#state_led_3").html(bulb_on_img);
  //          } else {  
  //             $("#state_led_3").html(bulb_off_img);
  //          }   
  //    });
  //         $("#btled3_on").click(function(){
  //         var firebaseRef3 = firebase.database().ref().child("ledStatus3");
  //            firebaseRef3.set(1);
  //            ledStatus3 = 1;   
                    
  //    })
  //      $("#btled3_off").click(function(){
  //         var firebaseRef3 = firebase.database().ref().child("ledStatus3");
  //           firebaseRef3.set(0);
  //           ledStatus3 = 0;
                 
     
  //    }); 



 // LED 04 ####################################################
  //  var ledStatus4;
  //  var led_bord_stat4;
  
  // database.ref().on("value", function(snap){
     
  //    ledStatus4 = snap.val().ledStatus4;
  //    // led_bord_stat4 = snap.val().led_bord_Status4;

  //         if(ledStatus4 == 1){
  //            $("#state_led_4").html(bulb_on_img);
  //          } else {  
  //             $("#state_led_4").html(bulb_off_img);
  //          }   
  //    });

  //    $("#btled4_on").click(function(){
  //      var firebaseRef4 = firebase.database().ref().child("ledStatus4");
       
  //         firebaseRef4.set(1);
  //         ledStatus4 = 1;                        
  // })
  //   $("#btled4_off").click(function(){
  //      var firebaseRef4 = firebase.database().ref().child("ledStatus4");

  //        firebaseRef4.set(0);
  //        ledStatus4 = 0;
  // }); 


 // Pond System ####################################################
   var pond_motor;
   var led_bord_stat4;
  
  database.ref().on("value", function(snap){
     
     pond_motor = snap.val().pondmoState;
     // pond_motor_bor_state = snap.val().pondmoState;

          if(pond_motor == 1){
             $("#pond_satat").html(pond_on_img);
           } else {  
              $("#pond_satat").html(pond_off_img);
           }   
     });

     $("#pond_on").click(function(){
       var firebaseRef5 = firebase.database().ref().child("pondmoState");
       
          firebaseRef5.set(1);
          pond_motor = 1;                        
  })
    $("#pond_off").click(function(){
       var firebaseRef5 = firebase.database().ref().child("pondmoState");

         firebaseRef5.set(0);
         pond_motor = 0;
  }); 
 
});