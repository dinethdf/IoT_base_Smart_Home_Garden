#include <ESP8266WiFi.h>                                                
#include <FirebaseArduino.h>                                            


#define WIFI_SSID "GalaxyA100C67"                                        
#define WIFI_PASSWORD "12345678" 


#define FIREBASE_HOST "prosem0225-default-rtdb.firebaseio.com" //-->  URL address of your Firebase Realtime Database.
#define FIREBASE_AUTH "dlmOAqKZQHAgJCQblbpwdufTSiAHNAWgIfr0YDar" //--> Your firebase database secret code.

// Light system pins

int ledPower1 = D0;
int ledPower2 = D1;
int ledPower3 = D2;
int ledPower4 = D6;
int ledPower5 = D7;
int ledPower6 = D8;
int pond_Motor_pin = D4;


int led1_state;
int led2_state;
int led3_state;
int led4_state;
int led5_state;
int led6_state;
int pond_motor_state;

  


//sencer variables
long duration;
int distance ;


void setup() {

  Serial.begin(115200);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  pinMode(ledPower1, OUTPUT);
  pinMode(ledPower2, OUTPUT);
  pinMode(ledPower3, OUTPUT);
  pinMode(ledPower4, OUTPUT);
  pinMode(ledPower5, OUTPUT);
  pinMode(ledPower6, OUTPUT);
  pinMode(pond_Motor_pin, OUTPUT);

   }



void light_system(){

  // ########  BULB 01 #######
   int ledStatus1 = Firebase.getInt("ledStatus1");
  if(ledStatus1 == 1){
    digitalWrite(ledPower1, HIGH);
    digitalWrite(ledPower2, LOW);
    digitalWrite(ledPower3, LOW);
    //led1_state = 1;
  }  else if(ledStatus1 == 2){
    //led1_state = 2;
   digitalWrite(ledPower1, HIGH);
   digitalWrite(ledPower2, HIGH);
   digitalWrite(ledPower3, LOW);
  } else if(ledStatus1 == 3){
   // led1_state = 3;
 
   digitalWrite(ledPower1, HIGH);
   digitalWrite(ledPower2, HIGH);
   digitalWrite(ledPower3, HIGH);
  }else if(ledStatus1 == 0){
    //led1_state = 0;
    digitalWrite(ledPower1, LOW);
   digitalWrite(ledPower2, LOW);
   digitalWrite(ledPower3, LOW);
  }
 // Firebase.setInt("led_bord_Status1",led1_state);

  // ########  BULB 02 #######
  int ledStatus2 = Firebase.getInt("ledStatus2");
  if(ledStatus2 == 1){
    digitalWrite(ledPower4, HIGH);
    digitalWrite(ledPower5, LOW);
    digitalWrite(ledPower6, LOW);
  } else if(ledStatus2 == 2){
    digitalWrite(ledPower4, HIGH);
    digitalWrite(ledPower5, HIGH);
    digitalWrite(ledPower6, LOW);
  }else if(ledStatus2 == 3){
   digitalWrite(ledPower4, HIGH);
   digitalWrite(ledPower5, HIGH);
   digitalWrite(ledPower6, HIGH);
  }else if(ledStatus2 == 0){
   
    digitalWrite(ledPower4, LOW);
    digitalWrite(ledPower5, LOW);
    digitalWrite(ledPower6, LOW);
  }
  
 // Firebase.setInt("led_bord_Status2",led2_state);
// ########  BULB 03 #######
//  int ledStatus3 = Firebase.getInt("ledStatus3");
//  if(ledStatus3 == 1){
//    digitalWrite(ledPower3, HIGH);
//    led3_state = 1;
//  } else {
//    led3_state = 0;
//    digitalWrite(ledPower3, LOW);
//  } 

  // ########  POND #######
  int pond_moter= Firebase.getInt("pondmoState");
  if(pond_moter == 1){
    digitalWrite(pond_Motor_pin, HIGH);
    
  } else {
    digitalWrite(pond_Motor_pin, LOW);
  }
}

void loop() {

 
  light_system();

}
