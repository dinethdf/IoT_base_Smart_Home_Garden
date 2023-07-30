#include <ESP8266WiFi.h>                                                
#include <FirebaseArduino.h>
                                            
#define WIFI_SSID "GalaxyA100C67"                                        
#define WIFI_PASSWORD "12345678" 

#define FIREBASE_HOST "prosem0225-default-rtdb.firebaseio.com" //-->  URL address of your Firebase Realtime Database.
#define FIREBASE_AUTH "dlmOAqKZQHAgJCQblbpwdufTSiAHNAWgIfr0YDar" //--> Your firebase database secret code.


int water_Motor_pin = D4;
const int sensor_pin = A0;

int water_Motor_state;
//sencer variables
long duration;
int distance ;
int watermoterstate;
int watermoterstate1;
String set;
String up_lim;

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
    pinMode(water_Motor_pin, OUTPUT);
    pinMode(sensor_pin, INPUT);
   }

void watering_system1(){
  
   
  // Firebase.setString("senser_value",set);
   
   watermoterstate1 = Firebase.getInt("watermoState");
  // set = Firebase.getString("senser_value");
  up_lim = Firebase.getString("upper_limit");
}
void watering_system(){
  float moisture_percentage;
  moisture_percentage = ( 100.00 - ( (analogRead(sensor_pin)/1023.00) * 100.00 ) );
  Serial.print("Soil Moisture(in Percentage) = ");
  Serial.print(moisture_percentage);
  Serial.println("%");
  set = String(moisture_percentage);
  Firebase.setString("senser_value",set);
  
// set = Firebase.getString("senser_value");
 watermoterstate = watermoterstate1;
   

  if(up_lim == "999"){
    
      if(watermoterstate == 1){
       digitalWrite(water_Motor_pin, HIGH);
       Serial.println("Water moter ON");
      } else {
        digitalWrite(water_Motor_pin, LOW);
        Serial.println("Water moter off");
      } 
    
  }
  else if(up_lim == "555"){  
    digitalWrite(water_Motor_pin, LOW);
      Serial.println("System OFF");
  }  
  else if(up_lim == "666"){  
    digitalWrite(water_Motor_pin, LOW);
     Serial.println("Water moter off");
    
  } else if( up_lim.toInt() < 101 )  {
     String low_lim = Firebase.getString("low_limit");
    Serial.println("Limit set");
    Serial.println(low_lim);
          if(set < low_lim){
             Serial.println("Limit set ON");
              digitalWrite(water_Motor_pin, HIGH);
              Serial.println("Water moter ON");
           } else if (set > up_lim){  
             Serial.println("Limit set OFF");
              digitalWrite(water_Motor_pin, LOW);   
              Serial.println("Water moter off");
           } 
           else {  
               Serial.println("System IN Range  ");
       if(watermoterstate == 1){
         digitalWrite(water_Motor_pin, HIGH);
         Serial.println("Water moter On In range");
          } else {
           digitalWrite(water_Motor_pin, LOW);
           Serial.println("Water moter off in range");
           }}}}


void loop() {
 watering_system(); 
 watering_system1();
}
