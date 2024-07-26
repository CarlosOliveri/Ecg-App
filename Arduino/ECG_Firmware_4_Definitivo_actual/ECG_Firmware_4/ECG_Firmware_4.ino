#include <Arduino.h>
#include <bluefruit.h>

float adcvalue = 0;

#define LOp       29
#define LO_       30
#define Sig       31

#define LED     10

#define BUZ     11

#define SDN     28

#define FasR     27
#define BATin    5

String cad;
String cad1;
int state ;
unsigned long lastSend;
String Data;


bool buttonPressed=false;
float mv_per_lsb = 3600.0F/1024.0F; 
/************************ ADS1292 FUNCTIONS *************************************************************/
String hex_to_char(int hex_in) {
  int precision = 2;
  char tmp[16];
  char format[128];
  sprintf(format, "0x%%.%dX", precision);
  sprintf(tmp, format, hex_in);
  //Serial.print(tmp);
  return(String(tmp));
}

// BLE Service


BLEDfu  bledfu;  // OTA DFU service
BLEDis  bledis;  // device information
BLEUart bleuart; // uart over ble
BLEBas  blebas;  // battery


// callback invoked when central connects
void connect_callback(uint16_t conn_handle)
{
  // Get the reference to current connection
  BLEConnection* connection = Bluefruit.Connection(conn_handle);

  char central_name[32] = { 0 };
  connection->getPeerName(central_name, sizeof(central_name));

  Serial.print("Connected to ");
  Serial.println(central_name);
  digitalWrite(LED, HIGH);
}


void disconnect_callback(uint16_t conn_handle, uint8_t reason)
{
  (void) conn_handle;
  (void) reason;
  digitalWrite(LED, LOW);
}
void setupBluetooth(){
 
  Bluefruit.autoConnLed(true);
  Bluefruit.configPrphBandwidth(BANDWIDTH_MAX);

  Bluefruit.begin();
  Bluefruit.setTxPower(4);    // Check bluefruit.h for supported values
  //Bluefruit.setName(getMcuUniqueID()); // useful testing with multiple central connections
  Bluefruit.Periph.setConnectCallback(connect_callback);
  Bluefruit.Periph.setDisconnectCallback(disconnect_callback);

  // To be consistent OTA DFU should be added first if it exists
  bledfu.begin();
  // Configure and Start Device Information Service
  bledis.setManufacturer("Adafruit Industries:)");
  bledis.setModel("Fea Bluefruit  :=)");
  bledis.begin();

  // Configure and Start BLE Uart Service
  bleuart.begin();

  // Start BLE Battery Service
  blebas.begin();
  blebas.write(100);

  // Set up and start advertising
  startAdv();

}
void startAdv(void)
{
  // Advertising packet
  Bluefruit.Advertising.addFlags(BLE_GAP_ADV_FLAGS_LE_ONLY_GENERAL_DISC_MODE);
  Bluefruit.Advertising.addTxPower();

  // Include bleuart 128-bit uuid
  Bluefruit.Advertising.addService(bleuart);

  // Secondary Scan Response packet (optional)
  // Since there is no room for 'Name' in Advertising packet
  Bluefruit.ScanResponse.addName();
  
  /* Start Advertising
   * - Enable auto advertising if disconnected
   * - Interval:  fast mode = 20 ms, slow mode = 152.5 ms
   * - Timeout for fast mode is 30 seconds
   * - Start(timeout) with timeout = 0 will advertise forever (until connected)
   * 
   * For recommended advertising interval
   * https://developer.apple.com/library/content/qa/qa1931/_index.html   
   */
  Bluefruit.Advertising.restartOnDisconnect(true);
  Bluefruit.Advertising.setInterval(32, 244);    // in unit of 0.625 ms
  Bluefruit.Advertising.setFastTimeout(30);      // number of seconds in fast mode
  Bluefruit.Advertising.start(0);                // 0 = Don't stop advertising after n seconds  
}
//V4
void readAndSend(){
  if (digitalRead(LOp) == 1 || digitalRead(LO_) == 1){
    cad1 = String(int(0)+'\n');
  }else{
    cad1 = String( int( analogRead(Sig)) )+ '\n';
  }
  cad = cad1;
  bleuart.write( cad.c_str(), cad.length() );//enviamos en formato string
  delay(27);//40
  cad = "";
  cad1 = "";
}

String receiveData(){
  String received;
  if (bleuart.available()){
    received = bleuart.read();
  }
  return received;
}

void setup(){
    // initialize the serial communication:
  Serial.begin(115200);
  pinMode(LOp, INPUT); // Setup for leads off detection LO +
  pinMode(LO_, INPUT); // Setup for leads off detection LO -
  pinMode(SDN, OUTPUT);
  digitalWrite(SDN, HIGH);
  pinMode(FasR, OUTPUT);
  digitalWrite(FasR, HIGH);

  pinMode(LED, OUTPUT);
  pinMode(BUZ, OUTPUT);

  delay(1000);
  digitalWrite(LED, HIGH);
  delay(2000);

  digitalWrite(LED, LOW);
   delay(1000);

  digitalWrite(LED, HIGH);
  delay(1000);
  digitalWrite(LED, LOW);

  setupBluetooth();
  state = 1;
}

void loop() {
  // put your main code here, to run repeatedly:
  switch(state){
    case 1:
      //Espera ordenes del smartphone
      if (receiveData() == "1"){
        state = 2;
        digitalWrite(LED,LOW);
        delay(500);
        digitalWrite(LED,HIGH);
        delay(500);
        digitalWrite(LED,LOW);
        delay(500);
        digitalWrite(LED,HIGH);
      }; 
      break;
    case 2:
      //data = receiveData();
      if (receiveData() == "0"){
        state = 1;
        digitalWrite(LED,LOW);
        delay(500);
        digitalWrite(LED,HIGH);
        break;
      }
      readAndSend();
      //lastSend = millis();
      /* while(millis() - lastSend < 10){
        Serial.println("Esperando 10 ms");
      } */
      break;
  }
}
