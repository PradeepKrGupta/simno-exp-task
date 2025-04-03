// // src/config/formConfig.ts

// // Default configuration and options for form fields.

// export const cellDefaults = {
//   ratType: "5G SA",
//   cellType: "DefaultCell",
//   duplexMode: "FDD",
//   band: "n41",
//   dlEarfcn: 42800,
//   ulEarfcn: 39000,
//   ssbNrArfcn: 39000,
// };

// export const ratTypeOptions = ["5G:SA", "4G", "5G:NSA/DSS", "NB-IOT", "Multi-RAT"];

// export const duplexOptions = ["FDD", "TDD"];

// export const bandOptions = ["n41", "n78", "n1"];

// export const mobilityOptions = ["Yes", "No"];

// export const subscriberDefaults = {
//   totalUEs: 10,
//   startingSupi: "001010123456001",
//   sharedKey: "00112233445566778899aabbccddeeff",
//   mncDigits: 2,
// };

// export const userPlaneDefaults = {
//   profileType: "Single",
//   dataType: "IPERF",
//   transportProtocol: "TCP",
//   startingPort: 5000,
//   apnName: "",
//   startDelay: 5,
//   duration: 600,
//   dataDirection: "both",
//   dlBitrate: 150,
//   ulBitrate: 50,
// };

// export const trafficDefaults = {
//   profileRange: "ApplyToAll",
//   attachType: "Bursty",
//   attachRate: 1,
//   attachDelay: 0,
//   powerOnDuration: 605,
//   staggerTime: 0,
// };

// export const mobilityDefaults = {
//   ueGroup: "ApplyToAll",
//   tripType: "Bidirectional",
//   delay: 5,
//   duration: 600,
//   waitTime: 0,
// };

// export const settingsDefaults = {
//   testCaseName: "",
//   logSetting: "debug",
//   successSetting: "new21",
// };



// ===========adding new code============

// src/config/formConfig.ts


// src/config/formConfig.ts

// Updated cellDefaults to include required properties: ratType and mobility.
export const cellDefaults = {
  defaultRat: "4G",
  "4G": {
    ratType: "4G",
    mobility: "No",
    cellType: "LTE",
    duplexMode: "FDD",
    band: "n1",
    dlEarfcn: 300,
    ulEarfcn: 18300,
  },
  "5G": {
    ratType: "5G",
    mobility: "No",
    cellType: "5G",
    duplexMode: "FDD",
    band: "n1",
    dlEarfcn: 42800,
    ulEarfcn: 39000,
    ssbNrArfcn: 39000,
  },
  "5G:NSA": {
    // For NSA, this default is not directly used in our code.
    // Instead, when "5G:NSA" is selected we create two cells:
    // one using the "4G" defaults and one using the "5G" defaults.
    ratType: "5G:NSA",
    mobility: "No",
    cellType: ["LTE", "5G"],
    duplexMode: "FDD",
    band: "n1",
    dlEarfcn: { "4G": 300, "5G": 42800 },
    ulEarfcn: { "4G": 18300, "5G": 39000 },
    ssbNrArfcn: 39000,
  },
};

export const ratTypeOptions = ["4G", "5G", "5G:NSA"];
export const duplexOptions = ["FDD", "TDD"];
export const bandOptionsFDD = [
  "n1", "n2", "n3", "n4", "n5", "n6", "n7", "n8", "n9", "n10", 
  "n11", "n12", "n13", "n14", "n15", "n16", "n17", "n18", "n19", "n20", "n21"
];
export const bandOptionsTDD = [
  "n21", "n22", "n23", "n24", "n25", "n26", "n27", "n28", "n29", "n30",
  "n31", "n32", "n33", "n34", "n35", "n36", "n37", "n38", "n39", "n40"
];

export const subscriberDefaults = {
  totalUEs: 10,
  startingSupi: "001010123456001",
  sharedKey: "00112233445566778899aabbccddeeff",
  mncDigits: 2,
};

export const userPlaneDefaults = {
  profileType: "Single",
  subscriberRange: "Range #1",
  dataType: "IPERF",
  transportProtocol: "TCP",
  startingPort: 5000,
  apnName: "",
  startDelay: 5,
  duration: 600,
  dataDirection: "both",
  dlBitrate: 150,
  ulBitrate: 50,
};

export const trafficDefaults = {
  profileRange: "ApplyToAll",
  attachType: "Bursty",
  attachRate: 1,
  attachDelay: 0,
  powerOnDuration: 605,
  staggerTime: 0,
};

export const mobilityDefaults = {
  ueGroup: "ApplyToAll",
  tripType: "Bidirectional",
  delay: 5,
  duration: 600,
  waitTime: 0,
};

export const settingsDefaults = {
  testCaseName: "",
  logSetting: "debug",
  successSetting: "new21",
};
