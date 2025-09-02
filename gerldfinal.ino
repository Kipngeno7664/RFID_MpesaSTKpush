// // // #include <ESP8266WiFi.h>
// // // #include <ESP8266HTTPClient.h>
// // // #include <ArduinoJson.h>

// // // #include <SPI.h>
// // // #include <MFRC522.h>

// // // #include <Wire.h>
// // // #include <LiquidCrystal_I2C.h>

// // // /* ---------- Wi-Fi credentials ---------- */
// // // const char* ssid     = "Redmi A2+";
// // // const char* password = "kevin2021";

// // // /* ---------- Backend ---------- */
// // // const char* serverUrl = "http://192.168.208.137:3000";
// // // const char* paybillPhone = "254724652816";

// // // /* ---------- RC522 pins ---------- */
// // // #define SS_PIN  D4   // SDA
// // // #define RST_PIN D3   // RST

// // // MFRC522 rfid(SS_PIN, RST_PIN);

// // // /* ---------- LCD ---------- */
// // // LiquidCrystal_I2C lcd(0x27, 16, 2);

// // // /* ---------- Cart handling ---------- */
// // // struct CartItem { String item; int amount; };
// // // CartItem cart[10];
// // // uint8_t  cartSize = 0;

// // // unsigned long lastScanTime = 0;
// // // const unsigned long scanWindow = 30 * 1000UL;  // 30 s
// // // bool waitingForPush = false;

// // // /* ---------- Forward declarations ---------- */
// // // String uidToString(const byte* uid, byte len);
// // // CartItem fetchCardInfo(const String& uid);
// // // String   sendStkPush(const String& phone, int amount);

// // // /* ----------------------------------------------------------------- */
// // // void setup() {
// // //   Serial.begin(115200);
// // //   SPI.begin();
// // //   rfid.PCD_Init();

// // //   lcd.init();
// // //   lcd.backlight();
// // //   lcd.clear();
// // //   lcd.setCursor(0, 0); lcd.print("RFID Smart Pay");
// // //   lcd.setCursor(0, 1); lcd.print("Scan items...");

// // //   WiFi.begin(ssid, password);
// // //   while (WiFi.status() != WL_CONNECTED) {
// // //     delay(500); Serial.print(".");
// // //   }
// // //   Serial.println("\nWiFi connected.");
// // // }

// // // /* ----------------------------------------------------------------- */
// // // void loop() {
// // //   if (rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial()) {
// // //     String uid = uidToString(rfid.uid.uidByte, rfid.uid.size);
// // //     Serial.println("UID: " + uid);

// // //     CartItem item = fetchCardInfo(uid);
// // //     if (!item.item.isEmpty()) {
// // //       if (cartSize < 10) cart[cartSize++] = item;

// // //       lcd.clear();
// // //       lcd.setCursor(0, 0); lcd.print(item.item);
// // //       lcd.setCursor(0, 1); lcd.print("KES "); lcd.print(item.amount);
// // //       delay(1500);

// // //       lastScanTime = millis();
// // //       waitingForPush = true;
// // //     } else {
// // //       lcd.clear(); 
// // //       lcd.print("Access Denied");
// // //       delay(1000);
// // //       lcd.clear();
// // //     }

// // //     rfid.PICC_HaltA();
// // //     delay(500);
// // //   }

// // //   if (waitingForPush && (millis() - lastScanTime > scanWindow)) {
// // //     int total = 0;
// // //     for (uint8_t i = 0; i < cartSize; ++i) total += cart[i].amount;

// // //     lcd.clear();
// // //     lcd.setCursor(0, 0); lcd.print("Total Pay:");
// // //     lcd.setCursor(0, 1); lcd.print("KES "); lcd.print(total);
// // //     delay(2000);

// // //     /* STK Push section */
// // //     sendStkPush(paybillPhone, total);
// // //     lcd.clear(); 
// // //     lcd.print("STK initiated");
// // //     delay(30000); // wait 8 seconds

// // //     lcd.clear(); 
// // //     lcd.print("Payment Success");
// // //     delay(4000);

// // //     lcd.clear();
// // //     lcd.setCursor(0, 0); lcd.print("RFID Smart Pay");
// // //     lcd.setCursor(0, 1); lcd.print("Scan items...");
// // //     delay(1000);

// // //     cartSize = 0;
// // //     waitingForPush = false;
// // //   }
// // // }

// // // /* --------------------------- helpers ----------------------------- */
// // // String uidToString(const byte* uid, byte len) {
// // //   String s;
// // //   for (byte i = 0; i < len; ++i) {
// // //     if (uid[i] < 0x10) s += "0";
// // //     s += String(uid[i], HEX);
// // //   }
// // //   s.toUpperCase();
// // //   return s;
// // // }

// // // /* ---------- GET /cards ---------- */
// // // CartItem fetchCardInfo(const String& uid) {
// // //   CartItem ret = {"", 0};
// // //   if (WiFi.status() != WL_CONNECTED) return ret;

// // //   HTTPClient http; WiFiClient client;
// // //   http.begin(client, String(serverUrl) + "/cards");
// // //   int code = http.GET();
// // //   if (code == 200) {
// // //     StaticJsonDocument<1024> doc;
// // //     DeserializationError e = deserializeJson(doc, http.getString());
// // //     if (!e) {
// // //       for (JsonObject obj : doc.as<JsonArray>()) {
// // //         if (obj["uid"].as<String>() == uid) {
// // //           ret.item = obj["item"].as<String>();
// // //           ret.amount = obj["amount"].as<int>();
// // //           break;
// // //         }
// // //       }
// // //     }
// // //   }
// // //   http.end();
// // //   return ret;
// // // }

// // // /* ---------- POST /stkpush ---------- */
// // // String sendStkPush(const String& phone, int amount) {
// // //   if (WiFi.status() != WL_CONNECTED) return "";

// // //   HTTPClient http;
// // //   WiFiClient client;
// // //   http.begin(client, String(serverUrl) + "/stkpush");
// // //   http.addHeader("Content-Type", "application/json");

// // //   String body = "{\"phoneNumber\":\"" + phone + "\",\"amount\":" + String(amount) + "}";
// // //   int code = http.POST(body);
// // //   delay(200); // allow server time to respond
// // //   String response = http.getString();
// // //   String checkoutId = "";

// // //   Serial.println("STK push HTTP code: " + String(code));
// // //   Serial.println("STK push response: " + response);

// // //   if (code > 0 && code == 200) {
// // //     StaticJsonDocument<512> doc;
// // //     DeserializationError e = deserializeJson(doc, response);
// // //     if (!e) {
// // //       checkoutId = doc["CheckoutRequestID"].as<String>();
// // //       Serial.println("CheckoutRequestID: " + checkoutId);
// // //     } else {
// // //       Serial.println("JSON parsing failed!");
// // //     }
// // //   } else {
// // //     Serial.printf("HTTP POST failed with error code: %d\n", code);
// // //   }

// // //   http.end();
// // //   return checkoutId;
// // // }

// // #include <ESP8266WiFi.h>
// // #include <ESP8266HTTPClient.h>
// // #include <ArduinoJson.h>

// // #include <SPI.h>
// // #include <MFRC522.h>

// // #include <Wire.h>
// // #include <LiquidCrystal_I2C.h>

// // /* ---------- Wi-Fi credentials ---------- */
// // const char* ssid     = "Redmi A2+";
// // const char* password = "kevin2021";

// // /* ---------- Backend ---------- */
// // const char* serverUrl = "//http://192.168.115.3:3000";
// // const char* paybillPhone = "254719499149";

// // /* ---------- RC522 pins ---------- */
// // #define SS_PIN  D4   // SDA
// // #define RST_PIN D3   // RST

// // MFRC522 rfid(SS_PIN, RST_PIN);

// // /* ---------- LCD ---------- */
// // LiquidCrystal_I2C lcd(0x27, 16, 2);

// // /* ---------- Cart handling ---------- */
// // struct CartItem { String item; int amount; };
// // CartItem cart[10];
// // uint8_t  cartSize = 0;

// // unsigned long lastScanTime = 0;
// // const unsigned long scanWindow = 30 * 1000UL;  // 30 s
// // bool waitingForPush = false;

// // /* ---------- Forward declarations ---------- */
// // String uidToString(const byte* uid, byte len);
// // CartItem fetchCardInfo(const String& uid);
// // String   sendStkPush(const String& phone, int amount);
// // void     checkPaymentStatus(const String& checkoutId);

// // /* ----------------------------------------------------------------- */
// // void setup() {
// //   Serial.begin(115200);
// //   SPI.begin();
// //   rfid.PCD_Init();

// //   lcd.init();
// //   lcd.backlight();
// //   lcd.clear();
// //   lcd.setCursor(0, 0); lcd.print("RFID Smart Pay");
// //   lcd.setCursor(0, 1); lcd.print("Scan items...");

// //   WiFi.begin(ssid, password);
// //   while (WiFi.status() != WL_CONNECTED) {
// //     delay(500); Serial.print(".");
// //   }
// //   Serial.println("\nWiFi connected.");
// // }

// // /* ----------------------------------------------------------------- */
// // void loop() {
// //   if (rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial()) {
// //     String uid = uidToString(rfid.uid.uidByte, rfid.uid.size);
// //     Serial.println("UID: " + uid);

// //     CartItem item = fetchCardInfo(uid);
// //     if (!item.item.isEmpty()) {
// //       if (cartSize < 10) cart[cartSize++] = item;

// //       lcd.clear();
// //       lcd.setCursor(0, 0); lcd.print(item.item);
// //       lcd.setCursor(0, 1); lcd.print("KES "); lcd.print(item.amount);
// //       delay(1500);

// //       lastScanTime = millis();
// //       waitingForPush = true;
// //     } else {
// //       lcd.clear(); 
// //       lcd.print("Access Denied");
// //       delay(1000);
// //       lcd.clear();
// //     }

// //     rfid.PICC_HaltA();
// //     delay(500);
// //   }

// //   if (waitingForPush && (millis() - lastScanTime > scanWindow)) {
// //     int total = 0;
// //     for (uint8_t i = 0; i < cartSize; ++i) total += cart[i].amount;

// //     lcd.clear();
// //     lcd.setCursor(0, 0); lcd.print("Total Pay:");
// //     lcd.setCursor(0, 1); lcd.print("KES "); lcd.print(total);
// //     delay(2000);

// //     String checkoutId = sendStkPush(paybillPhone, total);
// //     lcd.clear(); 
// //     lcd.print("STK initiated");
// //     delay(10000);  // Give user time to approve payment

// //     if (checkoutId != "") {
// //       checkPaymentStatus(checkoutId);
// //     } else {
// //       lcd.clear();
// //       lcd.print("Push failed");
// //       delay(3000);
// //     }

// //     lcd.clear();
// //     lcd.setCursor(0, 0); lcd.print("RFID Smart Pay");
// //     lcd.setCursor(0, 1); lcd.print("Scan items...");
// //     delay(1000);

// //     cartSize = 0;
// //     waitingForPush = false;
// //   }
// // }

// // /* --------------------------- helpers ----------------------------- */
// // String uidToString(const byte* uid, byte len) {
// //   String s;
// //   for (byte i = 0; i < len; ++i) {
// //     if (uid[i] < 0x10) s += "0";
// //     s += String(uid[i], HEX);
// //   }
// //   s.toUpperCase();
// //   return s;
// // }

// // /* ---------- GET /cards ---------- */
// // CartItem fetchCardInfo(const String& uid) {
// //   CartItem ret = {"", 0};
// //   if (WiFi.status() != WL_CONNECTED) return ret;

// //   HTTPClient http; WiFiClient client;
// //   http.begin(client, String(serverUrl) + "/cards");
// //   int code = http.GET();
// //   if (code == 200) {
// //     StaticJsonDocument<1024> doc;
// //     DeserializationError e = deserializeJson(doc, http.getString());
// //     if (!e) {
// //       for (JsonObject obj : doc.as<JsonArray>()) {
// //         if (obj["uid"].as<String>() == uid) {
// //           ret.item = obj["item"].as<String>();
// //           ret.amount = obj["amount"].as<int>();
// //           break;
// //         }
// //       }
// //     }
// //   }
// //   http.end();
// //   return ret;
// // }

// // /* ---------- POST /stkpush ---------- */
// // String sendStkPush(const String& phone, int amount) {
// //   if (WiFi.status() != WL_CONNECTED) return "";

// //   HTTPClient http;
// //   WiFiClient client;
// //   http.begin(client, String(serverUrl) + "/stkpush");
// //   http.addHeader("Content-Type", "application/json");

// //   String body = "{\"phoneNumber\":\"" + phone + "\",\"amount\":" + String(amount) + "}";
// //   int code = http.POST(body);
// //   delay(200); // allow server time to respond
// //   String response = http.getString();
// //   String checkoutId = "";

// //   Serial.println("STK push HTTP code: " + String(code));
// //   Serial.println("STK push response: " + response);

// //   if (code > 0 && code == 200) {
// //     StaticJsonDocument<512> doc;
// //     DeserializationError e = deserializeJson(doc, response);
// //     if (!e) {
// //       checkoutId = doc["CheckoutRequestID"].as<String>();
// //       Serial.println("CheckoutRequestID: " + checkoutId);
// //     } else {
// //       Serial.println("JSON parsing failed!");
// //     }
// //   } else {
// //     Serial.printf("HTTP POST failed with error code: %d\n", code);
// //   }

// //   http.end();
// //   return checkoutId;
// // }

// // /* ---------- GET /transaction/<id> ---------- */
// // void checkPaymentStatus(const String& checkoutId) {
// //   HTTPClient http;
// //   WiFiClient client;
// //   String url = String(serverUrl) + "/transaction/" + checkoutId;
// //   http.begin(client, url);

// //   int code = http.GET();
// //   if (code == 200) {
// //     String payload = http.getString();
// //     StaticJsonDocument<1024> doc;
// //     DeserializationError error = deserializeJson(doc, payload);

// //     if (!error) {
// //       String status = doc["status"].as<String>();
// //       String desc = doc["responseDescription"].as<String>();

// //       lcd.clear();
// //       lcd.setCursor(0, 0); lcd.print("Payment:");
// //       lcd.setCursor(0, 1); lcd.print(status);
// //       delay(5000);
// //     } else {
// //       lcd.clear(); lcd.print("Parse error");
// //       delay(2000);
// //     }
// //   } else {
// //     lcd.clear();
// //     lcd.setCursor(0, 0); lcd.print("Status Fetch");
// //     lcd.setCursor(0, 1); lcd.print("Failed");
// //     delay(3000);
// //   }

// //   http.end();
// // }

// #include <ESP8266WiFi.h>
// #include <ESP8266HTTPClient.h>
// #include <ArduinoJson.h>

// #include <SPI.h>
// #include <MFRC522.h>

// #include <Wire.h>
// #include <LiquidCrystal_I2C.h>

// /* ---------- Wi-Fi credentials ---------- */
// const char* ssid     = "Redmi A2+";
// const char* password = "kevin2021";

// /* ---------- Backend ---------- */
// const char* serverUrl = "http://192.168.115.3:3000";
// const char* paybillPhone = "254724652816";

// /* ---------- RC522 pins ---------- */
// #define SS_PIN  D4   // SDA
// #define RST_PIN D3   // RST

// MFRC522 rfid(SS_PIN, RST_PIN);

// /* ---------- LCD ---------- */
// LiquidCrystal_I2C lcd(0x27, 16, 2);

// /* ---------- Cart handling ---------- */
// struct CartItem { String item; int amount; };
// CartItem cart[10];
// uint8_t  cartSize = 0;

// unsigned long lastScanTime = 0;
// const unsigned long scanWindow = 30 * 1000UL;  // 30 s
// bool waitingForPush = false;

// /* ---------- Forward declarations ---------- */
// String uidToString(const byte* uid, byte len);
// CartItem fetchCardInfo(const String& uid);
// String   sendStkPush(const String& phone, int amount);
// void showWelcome();

// /* ----------------------------------------------------------------- */
// void setup() {
//   Serial.begin(115200);
//   SPI.begin();
//   rfid.PCD_Init();

//   lcd.init();
//   lcd.backlight();
//   showWelcome();

//   WiFi.begin(ssid, password);
//   while (WiFi.status() != WL_CONNECTED) {
//     delay(500); Serial.print(".");
//   }
//   Serial.println("\nWiFi connected.");
// }

// /* ----------------------------------------------------------------- */
// void loop() {
//   if (rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial()) {
//     String uid = uidToString(rfid.uid.uidByte, rfid.uid.size);
//     Serial.println("UID: " + uid);

//     CartItem item = fetchCardInfo(uid);
//     if (!item.item.isEmpty()) {
//       if (cartSize < 10) cart[cartSize++] = item;

//       lcd.clear();
//       lcd.setCursor(0, 0); lcd.print(item.item);
//       lcd.setCursor(0, 1); lcd.print("KES "); lcd.print(item.amount);
//       delay(1500);
//       showWelcome();

//       lastScanTime = millis();
//       waitingForPush = true;
//     } else {
//       lcd.clear(); lcd.print("Access Denied");
//       delay(1500);
//       showWelcome(); // reset after deny
//     }

//     rfid.PICC_HaltA();
//     delay(500);
//   }

//   if (waitingForPush && (millis() - lastScanTime > scanWindow)) {
//     int total = 0;
//     for (uint8_t i = 0; i < cartSize; ++i) total += cart[i].amount;

//     lcd.clear();
//     lcd.setCursor(0, 0); lcd.print("Total Pay:");
//     lcd.setCursor(0, 1); lcd.print("KES "); lcd.print(total);
//     delay(2000);

//     /* STK Push section */
//     sendStkPush(paybillPhone, total);
//     lcd.clear(); 
//     lcd.print("STK initiated");
//     delay(8000); // wait 8 seconds

//     lcd.clear(); 
//     lcd.print("Payment Success");
//     delay(4000);

//     showWelcome();
//     cartSize = 0;
//     waitingForPush = false;
//   }
// }

// /* --------------------------- helpers ----------------------------- */
// String uidToString(const byte* uid, byte len) {
//   String s = "";
//   for (byte i = 0; i < len; ++i) {
//     if (uid[i] < 0x10) s += "0";
//     s += String(uid[i], HEX);
//   }
//   s.toUpperCase();         // convert in-place
// return s;                // now return it
//  // ensures UID is uppercase
// }

// void showWelcome() {
//   lcd.clear();
//   lcd.setCursor(0, 0); lcd.print("RFID Smart Pay");
//   lcd.setCursor(0, 1); lcd.print("Scan items...");
// }

// /* ---------- GET /cards ---------- */
// CartItem fetchCardInfo(const String& uid) {
//   CartItem ret = {"", 0};
//   if (WiFi.status() != WL_CONNECTED) return ret;

//   HTTPClient http; WiFiClient client;
//   http.begin(client, String(serverUrl) + "/cards");
//   int code = http.GET();

//   Serial.println("Fetching card info...");
//   Serial.println("UID from scanner: " + uid);
//   Serial.println("HTTP status: " + String(code));

//   if (code == 200) {
//     String payload = http.getString();
//     Serial.println("Response payload: " + payload);

//     StaticJsonDocument<1024> doc;
//     DeserializationError e = deserializeJson(doc, payload);
//     if (!e) {
//       for (JsonObject obj : doc.as<JsonArray>()) {
//         String dbUid = obj["uid"].as<String>();
//         Serial.println("Checking DB UID: " + dbUid);
//         if (dbUid.equalsIgnoreCase(uid)) {
//           Serial.println("✅ Match found!");
//           ret.item = obj["item"].as<String>();
//           ret.amount = obj["amount"].as<int>();
//           break;
//         }
//       }
//     } else {
//       Serial.println("❌ JSON parse error");
//     }
//   } else {
//     Serial.println("❌ HTTP GET failed");
//   }

//   http.end();
//   return ret;
// }

// /* ---------- POST /stkpush ---------- */
// String sendStkPush(const String& phone, int amount) {
//   if (WiFi.status() != WL_CONNECTED) return "";

//   HTTPClient http;
//   WiFiClient client;
//   http.begin(client, String(serverUrl) + "/stkpush");
//   http.addHeader("Content-Type", "application/json");

//   String body = "{\"phoneNumber\":\"" + phone + "\",\"amount\":" + String(amount) + "}";
//   int code = http.POST(body);
//   delay(200); // allow server time to respond
//   String response = http.getString();
//   String checkoutId = "";

//   Serial.println("STK push HTTP code: " + String(code));
//   Serial.println("STK push response: " + response);

//   if (code > 0 && code == 200) {
//     StaticJsonDocument<512> doc;
//     DeserializationError e = deserializeJson(doc, response);
//     if (!e) {
//       checkoutId = doc["CheckoutRequestID"].as<String>();
//       Serial.println("CheckoutRequestID: " + checkoutId);
//     } else {
//       Serial.println("JSON parsing failed!");
//     }
//   } else {
//     Serial.printf("HTTP POST failed with error code: %d\n", code);
//   }

//   http.end();
//   return checkoutId;
// }

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

#include <SPI.h>
#include <MFRC522.h>

#include <Wire.h>
#include <LiquidCrystal_I2C.h>

/* ---------- Wi-Fi credentials ---------- */
const char* ssid     = "Redmi A2+";
const char* password = "kevin2021";

/* ---------- Backend ---------- */
const char* serverUrl = "http://192.168.115.3:3000";
const char* paybillPhone = "254724652816";

/* ---------- RC522 pins ---------- */
#define SS_PIN  D4   // SDA
#define RST_PIN D3   // RST

MFRC522 rfid(SS_PIN, RST_PIN);

/* ---------- LCD ---------- */
LiquidCrystal_I2C lcd(0x27, 16, 2);

/* ---------- Cart handling ---------- */
struct CartItem { String item; int amount; };
CartItem cart[10];
uint8_t  cartSize = 0;

unsigned long lastScanTime = 0;
const unsigned long scanWindow = 30 * 1000UL;  // 30 s
bool waitingForPush = false;

/* ---------- Forward declarations ---------- */
String uidToString(const byte* uid, byte len);
CartItem fetchCardInfo(const String& uid);
String   sendStkPush(const String& phone, int amount);
void showWelcome();

/* ----------------------------------------------------------------- */
void setup() {
  Serial.begin(115200);
  SPI.begin();
  rfid.PCD_Init();

  lcd.init();
  lcd.backlight();
  showWelcome();

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500); Serial.print(".");
  }
  Serial.println("\nWiFi connected.");
}

/* ----------------------------------------------------------------- */
void loop() {
  if (rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial()) {
    String uid = uidToString(rfid.uid.uidByte, rfid.uid.size);
    Serial.println("UID: " + uid);

    CartItem item = fetchCardInfo(uid);
    if (!item.item.isEmpty()) {
      if (cartSize < 10) cart[cartSize++] = item;

      lcd.clear();
      lcd.setCursor(0, 0); lcd.print(item.item);
      lcd.setCursor(0, 1); lcd.print("KES "); lcd.print(item.amount);
      delay(1500);
      showWelcome();

      lastScanTime = millis();
      waitingForPush = true;
    } else {
      lcd.clear(); lcd.print("Access Denied");
      delay(1500);
      showWelcome(); // reset after deny
    }

    rfid.PICC_HaltA();
    delay(500);
  }

  if (waitingForPush && (millis() - lastScanTime > scanWindow)) {
    int total = 0;
    for (uint8_t i = 0; i < cartSize; ++i) total += cart[i].amount;

    lcd.clear();
    lcd.setCursor(0, 0); lcd.print("Total Pay:");
    lcd.setCursor(0, 1); lcd.print("KES "); lcd.print(total);
    delay(2000);

    // Send STK Push & get feedback
    String result = sendStkPush(paybillPhone, total);

    lcd.clear();
    lcd.setCursor(0, 0); lcd.print("Payment Result:");
    lcd.setCursor(0, 1); lcd.print(result.substring(0, 16));  // max 16 chars on 2nd row
    delay(5000);

    showWelcome();
    cartSize = 0;
    waitingForPush = false;
  }
}

/* --------------------------- helpers ----------------------------- */
String uidToString(const byte* uid, byte len) {
  String s = "";
  for (byte i = 0; i < len; ++i) {
    if (uid[i] < 0x10) s += "0";
    s += String(uid[i], HEX);
  }
  s.toUpperCase();
  return s;
}

void showWelcome() {
  lcd.clear();
  lcd.setCursor(0, 0); lcd.print("RFID Smart Pay");
  lcd.setCursor(0, 1); lcd.print("Scan items...");
}

/* ---------- GET /cards ---------- */
CartItem fetchCardInfo(const String& uid) {
  CartItem ret = {"", 0};
  if (WiFi.status() != WL_CONNECTED) return ret;

  HTTPClient http; WiFiClient client;
  http.begin(client, String(serverUrl) + "/cards");
  int code = http.GET();

  Serial.println("Fetching card info...");
  Serial.println("UID from scanner: " + uid);
  Serial.println("HTTP status: " + String(code));

  if (code == 200) {
    String payload = http.getString();
    Serial.println("Response payload: " + payload);

    StaticJsonDocument<1024> doc;
    DeserializationError e = deserializeJson(doc, payload);
    if (!e) {
      for (JsonObject obj : doc.as<JsonArray>()) {
        String dbUid = obj["uid"].as<String>();
        Serial.println("Checking DB UID: " + dbUid);
        if (dbUid.equalsIgnoreCase(uid)) {
          Serial.println("✅ Match found!");
          ret.item = obj["item"].as<String>();
          ret.amount = obj["amount"].as<int>();
          break;
        }
      }
    } else {
      Serial.println("❌ JSON parse error");
    }
  } else {
    Serial.println("❌ HTTP GET failed");
  }

  http.end();
  return ret;
}

/* ---------- POST /stkpush ---------- */
String sendStkPush(const String& phone, int amount) {
  if (WiFi.status() != WL_CONNECTED) return "WiFi Error";

  HTTPClient http;
  WiFiClient client;
  http.begin(client, String(serverUrl) + "/stkpush");
  http.addHeader("Content-Type", "application/json");

  String body = "{\"phoneNumber\":\"" + phone + "\",\"amount\":" + String(amount) + "}";
  int code = http.POST(body);
  delay(200); // allow server time to respond
  String response = http.getString();

  Serial.println("STK push HTTP code: " + String(code));
  Serial.println("STK push response: " + response);

  String resultMsg = "Unknown";

  if (code > 0 && code == 200) {
    StaticJsonDocument<512> doc;
    DeserializationError e = deserializeJson(doc, response);
    if (!e) {
      resultMsg = doc["message"] | "No status";
    } else {
      Serial.println("JSON parsing failed!");
      resultMsg = "Parse error";
    }
  } else {
    resultMsg = "HTTP Error";
  }

  http.end();
  return resultMsg;
}
