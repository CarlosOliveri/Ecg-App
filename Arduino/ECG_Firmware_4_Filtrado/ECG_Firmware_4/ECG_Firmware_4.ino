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

bool Pruebas_setting = true; // permite activar el modo de debug para graficar la variable QRS = 800 y ver los picos graficados
// sino la variable QRS toma un valor de 1 o 0

float treshold = 0; //DEBE SER REINICIADO EN CADA PROCESO DE MEDICION

String cad; // cadena de envio de mensaje
String cad1; //cadena de caracteres que almacena la medicion
int state ; // estados de la maquina de estados que controla el funcionamiento del firmware
unsigned long lastSend; //en desuso 
String Data; // almacena temporalmente los datos que seran enviados concatenados en formato string
int value; // medicion actual 
int QRS; // indica cuando ocurre un pico en la señal, se enviara concatenado a cada valor leido 0 si no hay pico 1 si lo hay
bool QRS_detected; // Indicador de deteccion de picos
unsigned long RR_peak = 0;  //tiempo en el que se detecto el pico en milis
int send_interval = 0; //
int send_treshold = 10; //Indica la frecuencia con la que se hace el envio de datos
int timer;
// number of starting iterations, used determine when moving windows are filled
int number_iter = 0;//NECESITA SER REINICIADA EN CADA PROCESO DE MEDICION

// running sums for HP and LP filters, values shifted in FILO
float hp_sum = 0;
float lp_sum = 0;

// LP filter outputs a single point for every input point
// This goes straight to adaptive filtering for eval
float next_eval_pt = 0;

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

//V4
String readAndFilter(){
  //////////Leer entrada analógica//////////
  if (digitalRead(LOp) == 1 || digitalRead(LO_) == 1){
    value = int(0);
    cad1 = String(value);
  }else{
    //cad1 = String( int( analogRead(Sig)) )+ '\n';
    value = int( analogRead(Sig) );
    cad1 = String( value );

  }
  ///////////Detectar Picos QRS//////////////
  QRS_detected = detect(float(value));
  if (QRS_detected == false){
    QRS = 0;
  }else if (QRS_detected == true){
    RR_peak = millis();
    if (Pruebas_setting == true){
      QRS = 800;
    }
    QRS = 1;
  }
  /////////retornar valor leido/////////////
  return cad1 + "," + String(next_eval_pt) + "," + String(QRS) + "," + String(millis()) + '\n';
  /* cad = cad1;
  bleuart.write( cad.c_str(), cad.length() );
  delay(40);//40 */
}

String receiveData(){
  String received;
  if (bleuart.available()){
    received = bleuart.read();
  }
  return received;
}

void sendData(String data){
  cad = data;
  bleuart.write( cad.c_str(), cad.length() );
}

void loop() {
  // put your main code here, to run repeatedly:
  switch(state){
    case 1:
      //Espera ordenes del smartphone
      treshold = 0;
      number_iter = 0;
      hp_sum = 0;
      lp_sum = 0;
      if (receiveData() == "1"){
        state = 2;
        timer = millis();
      }; 
      break;
    case 2:
      if (receiveData() == "0"){
        state = 1;
        break;
      }
      delay(2);
      Data = readAndFilter();
      send_interval++;
      if(send_interval > send_treshold && millis() - timer < 10000){
        sendData(Data);
        send_interval = 0;
      }

      /////////////debug///////////////////
      /* if(Data[Data.length()-1] == '1'){
        sendData(Data);
      } */
      //lastSend = millis();
      /* while(millis() - lastSend < 10){
        Serial.println("Esperando 10 ms");
      } */
      break;
  }
}

/* This section contains the Pan-Tompkins algorithm and is adapted from https://github.com/blakeMilner/real_time_QRS_detection
 Portion pertaining to Pan-Tompkins QRS detection */
// circular buffer for input ecg signal
// we need to keep a history of M + 1 samples for HP filter
#define M  5
#define N  30
#define winSize 250
#define HP_CONSTANT   ((float) 1 / (float) M)
#define RAND_RES 100000000

float ecg_buff[M + 1] = {0};
int ecg_buff_WR_idx = 0;
int ecg_buff_RD_idx = 0;

// circular buffer for input ecg signal
// we need to keep a history of N+1 samples for LP filter
float hp_buff[N + 1] = {0};
int hp_buff_WR_idx = 0;
int hp_buff_RD_idx = 0;

// working variables for adaptive thresholding

boolean triggered = false;
int trig_time = 0;
float win_max = 0;
int win_idx = 0;
int tmp = 0;

boolean detect(float new_ecg_pt) {
  // guardamos la nueva lectura en el buffer circular e inclementamos le index
  ecg_buff[ecg_buff_WR_idx++] = new_ecg_pt;  
  ecg_buff_WR_idx %= (M+1); //mantenemos el indice dentro del circulo 
  
 
  /* Filtrado paso alto */
  if(number_iter < M){
    // Primero llenamos el buffer con suficientes puntos para el algoritmo de filtrado paso alto
    hp_sum += ecg_buff[ecg_buff_RD_idx]; // sumamos consecutivamente las nuevas mediciones hasta que se llene 
    hp_buff[hp_buff_WR_idx] = 0; //ponemos a cero todos los elementos del buffer hp_buff
  }
  else{
    hp_sum += ecg_buff[ecg_buff_RD_idx]; //se suma en hp_sum la ultima medicion para que no quede fuera
    
    tmp = ecg_buff_RD_idx - M; //tmp contendra el valor del (indice actualmente leido - M) posiciones
    if(tmp < 0) tmp += M + 1; //esto simplemente se asegura que no se vuelva negatico en las primeras iteraciones
    
    hp_sum -= ecg_buff[tmp]; // la linea anterior se hace para poder restar el primer elemento del buffer de la suma
    //Lo que ocurre es que llega una nueva medicion que se adicciona a la suma y se resta el primer termino del buffer de la suma porque queda fuera de la ventana 

    float y1 = 0;
    float y2 = 0;
    
    tmp = (ecg_buff_RD_idx - ((M+1)/2)); //tmp contendra el indice del elemento medio entre el indice actualmente leido y el primer elemento 
    if(tmp < 0) tmp += M + 1; // esto solo se asegura que no se vuelva negativo en las primeras iteraciones
    
    y2 = ecg_buff[tmp]; // y2 almacena el valor del elemento medio 
    
    y1 = HP_CONSTANT * hp_sum; //y1 almacena el valor de la sumatoria, el cual es una media movil (filtro digital)
    
    hp_buff[hp_buff_WR_idx] = y2 - y1; // de la media movil se le resta el valor medio guardado previamente y se almacen en el buffer
  }
  
  // done reading ECG buffer, increment position
  ecg_buff_RD_idx++;
  ecg_buff_RD_idx %= (M+1);
  
  // done writing to HP buffer, increment position
  hp_buff_WR_idx++;
  hp_buff_WR_idx %= (N+1);
  

  /* Low pass filtering */
  
  // shift in new sample from high pass filter
  lp_sum += hp_buff[hp_buff_RD_idx] * hp_buff[hp_buff_RD_idx];
  
  if(number_iter < N){
    // first fill buffer with enough points for LP filter
    next_eval_pt = 0;
    
  }
  else{
    // shift out oldest data point
    tmp = hp_buff_RD_idx - N;
    if(tmp < 0) tmp += (N+1);
    
    lp_sum -= hp_buff[tmp] * hp_buff[tmp];
    
    next_eval_pt = lp_sum;
  }
  
  // done reading HP buffer, increment position
  hp_buff_RD_idx++;
  hp_buff_RD_idx %= (N+1);
  

  //AQUI IMPLEMENTAMOS UN FILTRO DERIVATIVO
  

  //AQUI ELEVAMOS AL CUADRADO LA SALIDA DEL FILTRO

  //AQUI APLICAMOS UN VENTANEADO

  /* Adapative thresholding beat detection */
  // set initial threshold        
  if(number_iter < winSize) {
    if(next_eval_pt > treshold) {
      treshold = next_eval_pt;
    }
    number_iter++;
  }
  
  // check if detection hold off period has passed
  if(triggered == true){
    trig_time++;
    if(trig_time >= 100){
      triggered = false;
      trig_time = 0;
    }
  }
  
  // find if we have a new max
  if(next_eval_pt > win_max) win_max = next_eval_pt;
  
  // find if we are above adaptive threshold
  if(next_eval_pt > treshold && !triggered) {
    triggered = true;
    
    return true;
  }
 
        // else we'll finish the function before returning FALSE,
        // to potentially change threshold
          
  // adjust adaptive threshold using max of signal found 
  // in previous window            
  if(win_idx++ >= winSize){
    // weighting factor for determining the contribution of
    // the current peak value to the threshold adjustment
    float gamma = 0.4;
    
    // forgetting factor - 
    // rate at which we forget old observations
                // choose a random value between 0.01 and 0.1 for this, 
    float alpha = 0.1 + ( ((float) random(0, RAND_RES) / (float) (RAND_RES)) * ((0.1 - 0.01)));
    
                // compute new threshold
    treshold = alpha * gamma * win_max + (1 - alpha) * treshold;
    
    // reset current window index
    win_idx = 0;
    win_max = -10000000;
  }
      
        // return false if we didn't detect a new QRS
  return false;
    
    
}
