// ACORDES CONOCIDOS
acordesConocidosVersion = 0.3;
// 0    1    2    3    4    5    6    7    8    9   10   11   
// T    2m   2    3m  (3)   4    4+  (5)   6m   6    7   7M   |1a 8va
//                               5-        5+                 |1a 8va alternativas
// 8    9m   9    9+  10   11m  11   11+  12   13   13+  14   |2a 8va
acordesConocidos = {
  '0 7': '5(s3)',               // de quinta justa
    '0 7 9': '56(s3)',          // de quinta con 6a
    '0 7 10': '57(s3)',         // de quinta con 7a menor
      '0 7 10 11': '5714(s3)',  // de quinta con 7a menor y 7a Mayor
      '0 7 9 10': '567(s3)',    // de quinta con 6a y 7a menor
  '0 1 4 8': '5+9m',            // Mayor con 5a aumentada y 9a menor
    '0 1 4 7 8': '6m9m',        // Mayor con 6a menor y 9a menor
  '0 1 5 6 9': '45-69m',        // suspendida de 4a con 5a disminuida y, 6a y 9a menor y 9a
  '0 1 7 10': '79m(s3)',        // de quinta con 7a menor y 9a menor (sin 3a)
  '0 1 8 11': '5+7M9m(s3)',     // de quinta aumentada con 7a Mayor y 9a menor (sin 3a)
  '0 2 5': '24(s5)',            // suspendida de 2a y 4a (sin 5a)
    '0 2 5 8 11': '245+7M',     // suspendida de 2a y 4a con 5a aumentada y 7a Mayor
    '0 2 5 9': '469(s5)',       // suspendida de 4a con 6a y 9a (sin 5a)  (no se usa sus)
    '0 2 5 11': '247M(s5)',     // suspendida de 2a y 4a con 7a Mayor (sin 5a)
    '0 2 5 10': '247(s5)',      // suspendida de 2a y 4a con 7a menor (sin 5a)
      '0 2 5 9 10': '2467(s5)', // suspendida de 2a y 4a con 6a, 7a menor y 9a (sin 5a)
    '0 2 9 11': '267M(s5)',     // suspendida de 2a con 6a y s7a Mayor (sin 5a)
  '0 2 6': '25-',               // sus25b // suspendida de 2a con 5a disminuida (no se usa sus)
    '0 2 6 9': '25-6',          // sus25b6 // suspendida de 2a con 5a disminuida y 6a (no se usa sus)
  '0 2': 'sus2(s5)',            // suspendida de 2a (sin 5a)
  '0 2 7': 'sus2',              // suspendida de 2a
    '0 2 7 8': '26m',           // suspendida de 2a con 6a menor  (no se usa sus)
    '0 2 7 9': '26',            // suspendida de 2a con 6a  (no se usa sus)
    '0 2 7 10': '27',           // suspendida de 2a con 7a menor  (no se usa sus)
    '0 2 6 7': '211+',          // suspendida de 2a con 11a  (no se usa sus)
      '0 2 6 7 11': '4+7M',     // suspendida de 2a con 4a aumentada y 7a Mayor  (no se usa sus)
      '0 2 6 7 9': '2611+',     // suspendida de 2a con 6a y 11a  (no se usa sus)
    '0 2 5 7': '24',            // suspendida de 2a y 4a  (no se usa sus)
      '0 1 2 5 7': '249m',      // suspendida de 2a y 4a con 9a menor  (no se usa sus)
      '0 2 5 7 10': '247',      // suspendida de 2a y 4a con 7a menor  (no se usa sus)
      '0 2 5 7 11': '247M',     // suspendida de 2a y 4a con 7a Mayor  (no se usa sus)
      '0 1 2 5 10': '2479m',    // suspendida de 2a y 4a con 7a menor y 9a menor  (no se usa sus)
  '0 2 9': '26(s5)',            // suspendida de 2a con 6a (sin 5a)  (no se usa sus)
    '0 1 2 9': '269m(s5)',      // suspendida de 2a con 6a y 9a menor (sin 5a)  (no se usa sus)
      '0 1 2 6 9': '25-69m',    // suspendida de 2a con 5a disminuida, 6a y 9a menor  (no se usa sus)
  '0 3 4': '3m(s5)',            // 3a menor y 3a Mayor (sin 5a)
    '0 3 4 5': '3m4(s5)',       // 3a menor y 3a Mayor con 4a (sin 5a)
      '0 3 4 5 9': '3m4·6',     // 3a menor y 3a Mayor con 4a y 6a (sin 5a)
    '0 3 4 9': '3m6(s5)',       // 3a menor y 3a Mayor con 6a (sin 5a)
    '0 3 4 6 9': '3m5-6',       // 3a menor y 3a Mayor con 5a disminuida y 6a
    '0 3 4 7 9': '3m6',         // 3a menor y 3a Mayor con 5a y 6a
    '0 3 4 8 9': '3m5+6',       // 3a menor y 3a Mayor con 5a aumentada y 6a
  '0 3 5': 'm4(s5)',            // menor con 4a (sin 5a)
    '0 3 5 6': 'm45-',          // menor con 4a y 5a disminuida
      '0 3 5 6 10': 'm45-7',    // menor con 4a y 5a disminuida con 7a menor
    '0 3 5 7': 'm4',            // menor con 4a
      '0 3 5 7 10': 'm47',      // menor con 4a y 7a menor
    '0 3 5 8': 'm45+',          // menor con 4a con 5a aumentada
        '0 3 5 6 7 10': 'm4711',// menor con 4a con 7a menor y 11a
      '0 1 3 5 8': 'm45+9m',    // menor con 4a con 5a aumentada y 9a menor
      '0 2 3 5 8': 'm45+9',     // menor con 4a con 5a aumentada y 9a menor
    '0 3 5 9': 'm46(s5)',       // menor con 4a con 6a (sin 5a)
      '0 3 5 9 10': 'm467(s5)', // menor con 4a con 6a y 7a menor (sin 5a)
    '0 3 5 10': 'm47(s5)',      // menor con 4a con 7a menor (sin 5a)
      '0 3 5 8 10': 'm45+7',    // menor con 4a con 5a aumentada y 7a menor
    '0 2 3 5': 'm49(s5)',       // menor con 4a con 9a (sin 5a)
  '0 3 6': 'ø(sdim)',           // sdim // semidisminuida // 3a menor con 5a disminuida
    '0 1 3 6': 'ø(sdim)9m',     // sdim // semidisminuida con 9a menor -> menor con 5a disminuida y 9a menor
      '0 1 3 6 9': '○(dim)9m',  // dim // disminuida con 9a menor -> menor con 5a disminuida, 6a Mayor y 9a menor
    '0 3 6 7': 'm11',           // menor con 11a
    '0 3 6 7 8': 'm6m11',       // menor con 6a menor y 11a
    '0 3 6 7 9': 'm4+6',        // menor con 4a aumentada y 6a
    '0 3 6 7 11': 'm7M11',      // menor con 7a Mayor y 11a aumentada
    '0 3 6 9': '○(dim)',        // dim // disminuida // 3a menor, 5a disminuida, 6a Mayor
    '0 3 6 9 10': '○(dim)7',    // dim // disminuida con 7a menor // 3a menor, 5a disminuida, 6a Mayor y 7a menor
  '0 3 7': 'm',                 // menor
    '0 3 7 8': 'm6m',           // menor con 6a menor
    '0 3 7 9': 'm6',            // menor con 6a
    '0 3 7 10': 'm7',           // menor con 7a menor
      '0 3 7 8 10': 'm6m7',     // menor con 6a menor y 7a menor
      '0 2 3 7 10': 'm79',      // menor con 7a menor y 9a
    '0 3 7 11': 'm7M',          // menor con 7a Mayor
    '0 1 3 7': 'm9m',           // menor con 9a menor
      '0 1 3 7 8': 'm6m9m',       // menor con 6a menor y 9a menor
    '0 2 3 7': 'm9',            // menor con 9a
      '0 2 3 7 9': 'm69',       // menor con 6a y 9a 
  '0 3 8': 'm5+',               // menor con 5a aumentada
    '0 3 8 10': 'm5+7',         // menor con 5a aumentada con 7a menor
      '0 3 8 10 11': 'm5+77M',  // menor con 5a aumentada con 7a menor y 7a Mayor
    '0 3 6 8': 'm5-6m',         // menor con 5a disminuida y 6a menor
      '0 1 3 6 8': 'm5-6m',     // menor con 5a disminuida, 6a menor y 9a menor
  '0 3 9': 'm6(s5)',            // menor con 6a (sin 5a)
    '0 2 3 9': 'm69(s5)',       // menor con 6a y 9a (sin 5a)
  '0 3 10': 'm7(s5)',           // menor con 7a menor (sin 5a)
    '0 1 3 10': 'm79m(s5)',     // menor con 7a menor y 9a menor (sin 5a)
    '0 3 9 10': 'm713(s5)',     // menor con 7a menor y 13a aumentada (sin 5a)
  '0 3 11': 'm7M(s5)',          // menor con 7a Mayor (sin 5a)
  '0 4 5': '4(s5)',             // Mayor con 4a (sin 5a)
    '0 4 5 7': '4',             // Mayor con 4a
    '0 4 5 8': '45+',           // Mayor co n 4a Y 5a aumentada
    '0 4 5 9': '46(s5)',        // Mayor con 4a y 6a (sin 5a)
      '0 4 5 9 10': '467(s5)',    // Mayor con 4a y 6a y 7a menor (sin 5a)
      '0 4 5 7 9': '46',          // Mayor con 4a y 6a
      '0 4 5 7 10': '47',       // Mayor con 4a y 7a menor
      '0 4 5 7 11': '47M',      // Mayor con 4a y 7a Mayor
      '0 4 5 8 11': '45+7M',    // Mayor con 4a 5a aumentada y 7a Mayor
  '0 4 7': '(maj)',             // Mayor
    '0 4 7 8': '6m',            // Mayor con 6a menor
    '0 4 7 9': '6',             // Mayor con 6a
      '0 2 4 7 9': '69',        // Mayor con 6a y 9a
      '0 4 7 8 10': '6m7',      // Mayor con 6a menor y 7a menor
      '0 4 7 9 10': '67',       // Mayor con 6a y 7a menor
    '0 4 7 10': '7',            // Mayor con 7a menor
    '0 4 7 11': '7M',           // Mayor con 7a Mayor
      '0 4 7 10 11': '77M',     // Mayor con 7a menor y Mayor
      '0 2 4 7 10': '79',       // Mayor con 7a menor y 9a
      '0 2 4 7 11': '7M9',      // Mayor con 7a Mayor y 9a
      '0 2 3 4 7': '3m9',       // 3a Mayor y 3a menor con 9a (sin 7a menor)
    '0 1 4 7': '9m',            // Mayor con 9a menor
    '0 2 4 7': '9',             // Mayor con 9a 
  '0 4 8': '+(aug)',            // aug // Aumentada -> Mayor con 5a aumentada
  '0 4 9': '6(s5)',             // Mayor con 6a (sin 5a)
    '0 2 4 9': '69(s5)',        // Mayor con 6a y 9a (sin 5a)
    '0 4 6 9': '65-',           // Mayor con 6a, con la 5a disminuida
    '0 4 9 11': '5-6',          // Mayor con 5a disminuida con 6a
      '0 1 4 9 11': '5-67M',    // Mayor con 5a disminuida con 6a y 7a Mayor
  '0 4 10': '7(s5)',            // Mayor con 7a menor (sin 5a)
    '0 4 10 11': '67M(s5)',     // Mayor con 6a y 7a Mayor (sin 5a)
  '0 4 11': '7M(s5)',           // Mayor con 7a Mayor (sin 5a)
    '0 4 6 11': '5-7M',         // Mayor con 5a disminuida y 7a Mayor
  '0 5': 'sus4(s5)',            // suspendida de 4a (sin 5a)
  '0 5 7': 'sus4',              // suspendida de 4a
    '0 1 5 7': '49m',           // suspendida de 4a con 9a menor  (no se usa sus)
    '0 5 7 9': '46',            // suspendida de 4a con 6a (no se usa sus)
    '0 5 7 10': '47',           // suspendida de 4a con 7a menor  (no se usa sus)
    '0 5 7 8 9': '466m',        // suspendida de 4a con 6a y 6a menor  (no se usa sus)
  '0 5 8': '45+',               // suspendida de 4a con 5a aumentada  (no se usa sus)
    '0 5 8 10': '45+7',         // suspendida de 4a con 5a aumentada y 7a menor  (no se usa sus)
    '0 5 8 11': '45+7M',        // suspendida de 4a con 5a aumentada y 7a Mayor  (no se usa sus)
    '0 1 5 8 11': '45+7M9m',    // suspendida de 4a con 5a aumentada y 7a Mayor y 9a menor  (no se usa sus)
    '0 1 5 8': '45+9m',         // suspendida de 4a con 5 aumentada y 9a menor  (no se usa sus)
    '0 1 5 6 8': '45-6m9m',     // suspendida de 4a con 5a disminuida, 6a menor y 9a menor  (no se usa sus)
  '0 5 9': '46(s5)',            // suspendida de 4a y 6a (sin 5a)  (no se usa sus)
  '0 5 10': '47(s5)',           // suspendida de 4a y 7a menor (sin 5a)  (no se usa sus)
    '0 5 6 10': '45-7',         // suspendida de 4a con 5a disminuida y 7a menor  (no se usa sus)
  '0 6 7': '4+',                // suspendida de 4a aumentada
    '0 6 7 8': '4+6m',          // suspendida de 4a aumentada con 6a menor (no se usa sus)
    '0 6 7 9': '4+6',           // suspendida de 4a aumentada con 6a  (no se usa sus)
  '0 6 9': '5 6(s3)',           // de quinta disminuida y 6a (sin 3a)
    '0 1 6 9': '5-69m(s3)',     // de quinta disminuida con 6a y 9a menor (sin 3a)
    '0 6 9 11': '5-67M(s3)',    // de quinta disminuida con 6a y 7a Mayor (sin 3a)
};