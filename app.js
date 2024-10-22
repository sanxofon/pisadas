// Variables a incluir en Configuración de usuario en futuras versiones
let NUM_STRINGS = 6;  // Número de cuerdas
let NUM_FRETS = 13;    // Número de trastes
let TONIC_DEFINED_BY = 0; // + Grave:  0 = La nota más grave, el bajo, es la tónica
                          // xConteo:  1 = La nota que más aparece es la tónica aunque no sea el bajo
                          // Primera: -1 = La primera cuerda (de arriba a abajo!) es la tónica
      
let DEFAULT_TUNING = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']; // Inicialización de la afinación por defecto // Guitar standard tuning (INVERSO)

let REVERSA = false; // Para 'horizontal' debe estar TRUE

// Definiciones generales: E2, A2, D3, G3, B3, E4
if(REVERSA)DEFAULT_TUNING.reverse(); // REVERSA
const instrumentos = [
  {
    't': ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'], // TUNING
    's': 6, // NUM STRINGS
    'f': 13, // NUM FRETS
    'c': [0,0,0,0,0,0], // INITIAL CHORD
    'n': 'Guitarra', // NAME
  },
  {
    't': ['G3', 'C3', 'E4', 'A4', 'G3'], // TUNING
    's': 5, // NUM STRINGS
    'f': 12, // NUM FRETS
    'c': [0,0,0,0,0], // INITIAL CHORD
    'n': 'Jarana', // NAME
  },
  {
    't': ['A3', 'C#4', 'E4', 'A4', 'A3'], // TUNING
    's': 5, // NUM STRINGS
    'f': 12, // NUM FRETS
    'c': [0,0,0,0,0], // INITIAL CHORD
    'n': 'Jarana', // NAME
  },
];

// COSTANTES GLOBALES
const NUMBER_OF_NOTES = 12;
const MIN_NOTES_FOR_CHORD = 2;
// ACORDES CONOCIDOS
const acordesConocidos = {
  '0-7': '5',               // Quinta justa
  '0-2-5': 'sus24(s5)',     // suspendida de 2a y 4a (sin 5a)
    '0-2-5-9': 'sus469(s5)',// suspendida de 4a con 6a y 9a mayor (sin 5a)
  '0-2-6': 'sus25-',        // sus25b // Suspendida de 2a con 5a disminuida
    '0-2-6-9': 'sus25-6',   // sus25b6 // Suspendida de 2a con 5a disminuida y 6a
  '0-2-7': 'sus2',          // Suspendida de 2a
    '0-2-6-7': 'sus211+',   // Suspendida de 2a con 11a aumentada
      '0-2-6-7-9': 'sus2611+', // Suspendida de 2a con 6a y 11a aumentada
    '0-2-5-7': '49',        // 24 // 4a y 9a ó 2a y 4a 
      '0-2-5-7-11': '47M9', // 247M // 4a y 9a ó 2a y 4a con 7a mayor
  '0-3-5': 'm4(s5)',        // Menor con 4a (sin 5a)
    '0-3-5-8': 'm45+',      // Menor con 4a con 5a aumentada
      '0-1-3-5-8': 'm45+9m',// Menor con 4a con 5a aumentada y 9a menor
      '0-2-3-5-8': 'm45+9', // Menor con 4a con 5a aumentada y 9a menor
    '0-3-5-9': 'm46(s5)',   // Menor con 4a con 6a (sin 5a)
      '0-3-5-9-10': 'm467(s5)',// Menor con 4a con 5a y 7a menor (sin 5a)
  '0-3-6': '-(dim)',        // dim // Disminuida -> Menor con 5a disminuida
  '0-3-7': 'm',             // Menor
    '0-3-7-9': 'm6',        // Menor con 6a
    '0-3-7-10': 'm7',       // Menor con 7a menor
    '0-3-7-11': 'm7M',      // Menor con 7a mayor
    '0-1-3-7': 'm9m',       // Menor con 9a menor
    '0-2-3-7': 'm9',        // Menor con 9a mayor 
  '0-3-8': 'm5+',           // Menor con 5a aumentada
    '0-3-6-8': 'm5-6m',     // Menor con 5a disminuida y 6a menor
      '0-1-3-6-8': 'm5-6m', // Menor con 5a disminuida, 6a menor y 9a menor
  '0-3-9': 'm6(s5)',        // Menor con 6a (sin 5a)
  '0-3-10': 'm7(s5)',       // Menor con 7a menor (sin 5a)
  '0-3-11': 'm7M(s5)',      // Menor con 7a mayor (sin 5a)
  '0-4-5': '4(s5)',         // Mayor con 4a (sin 5a)
    '0-4-5-7': '4',         // Mayor con 4a
      '0-4-5-7-9': '46',    // Mayor con 4a y 6a
      '0-4-5-7-10': '47',   // Mayor con 4a y 7a menor
      '0-4-5-7-11': '47M',  // Mayor con 4a y 7a mayor
  '0-4-7': '(maj)',         // Mayor
    '0-4-7-9': '6',         // Mayor con 6a
    '0-4-7-10': '7',        // Mayor con 7a menor
    '0-4-7-11': '7M',       // Mayor con 7a mayor
      '0-2-4-7-11': '7M9',  // Mayor con 7a mayor y 9a mayor
    '0-1-4-7': '9m',        // Mayor con 9a menor
    '0-2-4-7': '9',         // Mayor con 9a mayor 
  '0-4-8': '+(aug)',        // aug // Aumentada -> Mayor con 5a aumentada
  '0-4-9': '6(s5)',         // Mayor con 6a (sin 5a)
  '0-4-10': '7(s5)',        // Mayor con 7a menor (sin 5a)
  '0-4-11': '7M(s5)',       // Mayor con 7a mayor (sin 5a)
  '0-5-7': 'sus4',          // Suspendida de 4a
    '0-5-7-9': 'sus46',     // Suspendida de 4a con 6a
  '0-5-8': 'sus45+',        // Suspendida de 4a con 5a aumentada
    '0-1-5-8': 'sus45+9m',  // Suspendida de 4a con 5 aumentada y 9a menor
  '0-5-9': '46(s5)',        // 4a y 6a (sin 5a)
};

const fretboard = document.querySelector('.fretboard');
const notasInput = document.querySelector('#notas');
const unicasInput = document.querySelector('#unicas');
const conteoInput = document.querySelector('#conteo');
const tonicaInput = document.querySelector('#tonica');
const bajoInput = document.querySelector('#bajo');
const acordeInput = document.querySelector('#acorde');
const interpretaInput = document.querySelector('#interpretaciones');

// Las cuerdas empiezan muteadas
let selectedFrets = Array(NUM_STRINGS).fill(-1);
let mutedStrings = Array(NUM_STRINGS).fill(true);  // All strings muted initially
let fretboardCells = []; //Array of fretboard cells

const todas_las_notas = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Pre-calculated lookup table of notes for each string and fret
let getNota = [];

// Populate the lookup table
function createGetNota() {
  getNota = [];
  for (let string = 0; string < NUM_STRINGS; string++) {
    getNota[string] = [];
    const [, baseNote, octave] = DEFAULT_TUNING[string].match(/([A-G][#b]?)([1-9])/);
    let noteIndex = todas_las_notas.indexOf(baseNote.toUpperCase());
    let currentOctave = parseInt(octave); // Start with the correct octave
    for (let fret = 0; fret < NUM_FRETS; fret++) {
      let newNoteIndex = (noteIndex + fret) % NUMBER_OF_NOTES;
      let note = todas_las_notas[newNoteIndex];
      // Correct octave calculation: Increment only when wrapping around from B to C
      if (fret > 0 && newNoteIndex < (noteIndex + fret - 1) % NUMBER_OF_NOTES) {
        currentOctave++;
      }
      // Handle case where first note is C and tuning octave is incremented
      if(fret === 0 && baseNote === "C") currentOctave++;
      getNota[string][fret] = note + currentOctave;
    }
  }
}

function createFretboard() {
  fretboard.innerHTML='';
  fretboardCells = []; // Initialize
  const numCols = NUM_STRINGS;
  const numRows = NUM_FRETS;
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const fretCell = document.createElement('div');
      fretCell.classList.add('fret');
      const stringIndex = col;
      const fretIndex = row;
      if (fretIndex === 0) fretCell.classList.add('open-string');
      fretCell.dataset.string = stringIndex;
      fretCell.dataset.fret = fretIndex;
      fretCell.addEventListener('click', selectFret);
      fretCell.textContent = getNota[stringIndex][fretIndex];
      fretboard.appendChild(fretCell);
      fretboardCells.push(fretCell);
    }
  }
}

function selectFret(event) {
  const cell = event.target;
  const stringIndex = parseInt(cell.dataset.string);
  const fretIndex = parseInt(cell.dataset.fret);
  let cellIndex = fretIndex * NUM_STRINGS + stringIndex;
  if (cell.classList.contains('selected')) {
      cell.classList.remove('selected');
      selectedFrets[stringIndex] = -1;
  } else {
      const previouslySelectedFret = selectedFrets[stringIndex];
      if (previouslySelectedFret !== -1) {
          let prevCellIndex = previouslySelectedFret * NUM_STRINGS + stringIndex;
          fretboardCells[prevCellIndex].classList.remove('selected');
      }
      selectedFrets[stringIndex] = fretIndex;
      cell.classList.add('selected');
  }
  updateChordInfo();
}

function getLowestNote(acordeNotas) {
  // Find lowest note with octave
  acordeNotas.reduce(function(prev, current) {
    const [,prevNote, prevOctave] = prev.match(/([A-G][#b]?)([1-9])/);
    const [,currentNote, currentOctave] = current.match(/([A-G][#b]?)([1-9])/);
    const prevNoteIndex = todas_las_notas.indexOf(prevNote);
    const currentNoteIndex = todas_las_notas.indexOf(currentNote);
    if (parseInt(prevOctave) > parseInt(currentOctave) || (parseInt(prevOctave) === parseInt(currentOctave) && prevNoteIndex > currentNoteIndex)) {
      return current;
    } else {
      return prev;
    }
  }, acordeNotas[0] || ''); // Initialize with the first note or an empty string if no notes
  return acordeNotas[0];
}

function updateChordInfo(setonica='') {
  const acordeNotas = [];
  for (let i = 0; i < NUM_STRINGS; i++) {
    if (selectedFrets[i] !== -1) {
      acordeNotas.push(getNota[i][selectedFrets[i]]);
    }
  }
  if (acordeNotas.length === 0) {
    vaciarUI()
    return;
  }
  if(REVERSA)acordeNotas.reverse(); // REVERSA

  notasInput.textContent = acordeNotas.join(", "); // Ahora muestra las notas con octavas
  let notasUnicasConteo = contarNotas(acordeNotas);
  const lowestNote = getLowestNote(acordeNotas);

  // Buscamos la tónica más adecuada
  let tonica;
  if (TONIC_DEFINED_BY<0) { // Primera cuerda
    tonica = acordeNotas[0]; // Para la primera cuerda
  } else if (TONIC_DEFINED_BY>0) { // El que aparece más
    notasUnicasConteo = getNotesSortedByCount(notasUnicasConteo);
    let conOctava = [];
    for (const n of notasUnicasConteo[0]) {
      for (const no of acordeNotas) {
        const x = no.replace(/[0-9]/g, '');
        if (x==n) {
          conOctava.push(no);
          break;
        }
      }
    }
    tonica = conOctava[0]; // Para la primera cuerda
  } else { // La más grave
    tonica = lowestNote;
  }
  // Si está definida y existe en el acorde se forza la tónica a la definida
  if (setonica!='' && notasUnicasConteo[0].indexOf(setonica) !== -1) {
    console.log("Forzar tónica:", setonica);
    tonica = setonica;
  }

  // calculamos las posibles interpretaciones
  const interpretaciones = getChordInterpretations(acordeNotas);

  // Actualizar salida UI para usuario
  tonicaInput.textContent = tonica;
  bajoInput.textContent = lowestNote;
  unicasInput.textContent = notasUnicasConteo[0].join(", ");
  conteoInput.textContent = Object.values(notasUnicasConteo[1]).join(", ");
  interpretaInput.innerHTML = createDataTable(interpretaciones,tonica);
  acordeInput.innerHTML = acordeMasProbable(interpretaciones,tonica,lowestNote);
  // Actualizamos el estilo de las cuerdas (muteadas o no)
  updateStringMutingStyle();
}

function vaciarUI() {
  notasInput.textContent = "Ninguna nota seleccionada";
  unicasInput.textContent = "";
  conteoInput.textContent = "";
  tonicaInput.textContent = "";
  bajoInput.textContent = "";
  acordeInput.textContent = "";
  interpretaInput.textContent = "";
}

/* function updateStringMutingStyle() {
  for (let stringIndex = 0; stringIndex < NUM_STRINGS; stringIndex++) {
    const isMuted = selectedFrets[stringIndex] < 0; // String is muted if no fret is selected
    for (let fretIndex = 0; fretIndex < NUM_FRETS; fretIndex++) {
        const cell = fretboardCells[fretIndex + stringIndex * NUM_FRETS];
        if (isMuted) {
          cell.classList.add('muted');
        } else {
          cell.classList.remove('muted');
        }
    }
  }
} */
function updateStringMutingStyle() {
  for (let stringIndex = 0; stringIndex < NUM_STRINGS; stringIndex++) {
    const isMuted = selectedFrets[stringIndex] < 0;
    for (let fretIndex = 0; fretIndex < NUM_FRETS; fretIndex++) {
      const cellIndex = fretIndex * NUM_STRINGS + stringIndex;
      const cell = fretboardCells[cellIndex];
      if (isMuted) {
        cell.classList.add('muted');
      } else {
        cell.classList.remove('muted');
      }
    }
  }
}

function acordeMasProbable(interpretaciones,tonica,bajo) {
  tonica = tonica.replace(/[0-9]/g, '');
  bajo = bajo.replace(/[0-9]/g, '');
  for (let i = 0; i < interpretaciones.length; i++) {
    const row = interpretaciones[i];
    if(row[0][0]==tonica) {
      if(tonica!=bajo) return row[4]+'&#8260;<sub>'+bajo+'</sub>';
      else return row[4];
    }
  }
  if (interpretaciones[0].length<MIN_NOTES_FOR_CHORD) return "Insuficiente"
  return "ERROR: No se encontró la tónica en la pisada!"
}

function createDataTable(data,tonica) {
  tonica = tonica.replace(/[0-9]/g, '');

  const rows = data.length;
  const cols = data[0].length;
  if (cols<MIN_NOTES_FOR_CHORD) return "Insuficiente";

  let html = `<table class="clicable" onclick="rowRadio(event);">`;
  // html += `<tr><th>&#932</th><th>&#127901;</th><th>#</th><th>&#128477;</th><th>&#119070;</th><th>&#128504;</th></tr>`;
  html += `<tr><th>&#932</th><th>&sung;</th><th>&#128477;</th><th>&#119070;</th><th>&#9745;</th></tr>`; // Recortado

  for (let i = 0; i < rows; i++) {
    html += `<tr>`;
    for (let j = -1; j < cols; j++) {
      if(j==1) continue; // Recortado
      html += `<td>`;
      if(j<0) {
        html += '<input type="radio" onclick="updateChordInfo(\''+data[i][0][0]+'\')" name="setonica" value="'+data[i][0][0]+'" '+(data[i][0][0]==tonica ? 'checked':'')+'><b>'+data[i][0][0]+'</b>';
      } else {
        if(Array.isArray(data[i][j])) {
          html += data[i][j].join(' ');
        } else {
          html += data[i][j];
        }
      }
      html += `</td>`;
    }
    html += `</tr>`;
  }

  html += `</table>`;

  return html;
}

function rowRadio(event) {
  const target = event.target;
  const row = target.closest('tr');
  if (row) {
    const radio = row.querySelector('input[type="radio"]');
    if (radio && !radio.checked) {
      radio.click();
    }
  }
}

function contarNotas(notas) {
  const notasSinOctava = notas.map(nota => nota.replace(/[0-9]/g, '')); // Remove octave information
  const counts = {};
  const unicas = [];
  for (const nota of notasSinOctava) {
    const numero = notasSinOctava.indexOf(nota);
    counts[numero] = (counts[numero] || 0) + 1;
    if (!unicas.includes(nota)) {
      unicas.push(nota);
    }
  }
  return [unicas, counts];
}

function getNotesSortedByCount(notasUnicasConteo) {
  const [uniqueNotes, counts] = notasUnicasConteo;
  
  // 1. Convert to Array of Objects with note and count
  const notesWithCounts = uniqueNotes.map(note => ({
    note: note,
    count: counts[uniqueNotes.indexOf(note)],
  }));
  
  // 2. Sort by count (descending)
  notesWithCounts.sort((a, b) => b.count - a.count);
  
  // 3. Reconstruct the uniqueNotes and counts objects
  const sortedUniqueNotes = notesWithCounts.map(item => item.note);
  const sortedCounts = {};
  sortedUniqueNotes.forEach(note => {
    sortedCounts[uniqueNotes.indexOf(note)] = counts[uniqueNotes.indexOf(note)];
  });
  
  // 4. Return in the same format as the input
  return [sortedUniqueNotes, sortedCounts];
}

function rotateAndShift(lista) {
  const salida = [lista];
  for (let i = 1; i < lista.length; i++) {
    const previousList = salida[salida.length - 1];
    const rotatedList = [...previousList.slice(1), previousList[0] + NUMBER_OF_NOTES];
    const shiftedList = rotatedList.map(n => n - rotatedList[0]);
    salida.push(shiftedList);
  }
  return salida;
}

function rotateLeft(arr, n=1) {
  if (arr.length <= 1 || n==0) return arr; // Handle empty or single-element arrays and 0 rotations
  n = n % arr.length; // Handle rotations larger than array length
  if (n < 0) n += arr.length; // Handle negative rotations (rotate right)
  return [...arr.slice(n), ...arr.slice(0, n)];
}

function getChordInterpretations(acordeNotas) {
  const notasSinOctava = acordeNotas.map(nota => nota.replace(/[0-9]/g, ''));
  let uniqueNotes = [...new Set(notasSinOctava)]; // Remove duplicates
  if (uniqueNotes.length < MIN_NOTES_FOR_CHORD) return "Muy pocas notas para un acorde";
  const numerNotas = uniqueNotes.map(note => todas_las_notas.indexOf(note));
  numerNotas.sort((a, b) => a - b); // Sort numerically
  uniqueNotes = numerNotas.map(n => todas_las_notas[n]); // Reescribe la variable con el orden de numerNotas
  
  // Reducimos las notas a Do/C/0 restando a todas la nota inicial
  const intervalo = [];
  let i = 0;
  for (const n of numerNotas) {
    const base = n-numerNotas[0];
    intervalo.push(base);
    i++;
  }

  const intervalos = rotateAndShift(intervalo);
  const lista = [];
  for (let i = 0; i < intervalos.length; i++) {
    const intint = intepretarIntervalo(intervalos[i]);
    const acorde = '<b>'+uniqueNotes[i]+'</b>'+intint.replace(/\([^)]*\)/g, "").replace(/([245679])(?=[1245679])/g, "$1·") // Elimina lo que está entre paréntesis
    lista.push([
      rotateLeft(uniqueNotes,i),
      rotateLeft(numerNotas,i),
      intervalos[i],
      intint,
      acorde
    ]);
  }
  return lista;
}

// Interpreta los intervalos
function intepretarIntervalo(intervals) {
  if (intervals.length < 2) return ""; 
  if (intervals.length < 3) return acordesConocidos[intervals.join('-')] || "?";
  // Check for known chords, prioritizing longer matches
  for (let i = intervals.length; i >= 2; i--) {
    const chordKey = intervals.slice(0, i).join('-');
    if (acordesConocidos[chordKey]) {
      let suffix = '';
      if (i < intervals.length) {
        for (let j = i; j < intervals.length; j++) {
          const diff = intervals[j] - (intervals[0]==0?0:intervals[0]); // Corrected interval calculation!
          if(diff==1) suffix += '9';
          if(diff==9) suffix += '6';
          if(diff==11) suffix += '11+';
          if(diff==4) suffix += '11';
          if(diff==14) suffix += '13';
        }
      }
      if(suffix!='') {
        suffix = '?';
      }
      return acordesConocidos[chordKey] + suffix;
    } else {
      // No se encontró la definición
      // console.log(chordKey,acordesConocidos[chordKey]);
    }
  }

  return "?";
}

/* function getNota(string, fret) {
  const [, baseNote, octave] = DEFAULT_TUNING[string].match(/([A-G][#b]?)([1-9])/);
  let noteIndex = todas_las_notas.indexOf(baseNote.toUpperCase());
  let newOctave = parseInt(octave);
  let newNoteIndex = (noteIndex + fret) % NUMBER_OF_NOTES;
  newOctave += Math.floor((noteIndex + fret) / NUMBER_OF_NOTES); // corrected octave calculation
  return todas_las_notas[newNoteIndex] + newOctave;
} */

const selTonica = document.getElementById('selTonicDef');
selTonica.addEventListener('change', (event) => {
  let v = parseInt(event.target.value);
  if(v<-1)v=-1;
  else if(v>1)v=1;
  TONIC_DEFINED_BY = v;
  updateChordInfo();
});

function setInstrumento(n) {
  n = parseInt(n);
  if(n<0 || n>=instrumentos.length) return;
  instrumentos[n];
  DEFAULT_TUNING = instrumentos[n]['t'];
  NUM_STRINGS = instrumentos[n]['s'];
  NUM_FRETS = instrumentos[n]['f'];
  const r=document.querySelector(':root');
  r.style.setProperty('--num-strings', NUM_STRINGS);
  r.style.setProperty('--num-frets', NUM_FRETS);
  createGetNota();
  createFretboard();
  setAcorde(instrumentos[n]['c']);
}

function setAcorde(acorde) {
  selectedFrets = acorde; // Acorde inicial
  if(REVERSA)selectedFrets.reverse(); // REVERSA
  for (let stringIndex = 0; stringIndex < NUM_STRINGS; stringIndex++) {
    const targetFret = selectedFrets[stringIndex];
    if (targetFret !== -1) {  // Only select if a fret is chosen for the string
        let cellIndex = targetFret * NUM_STRINGS + stringIndex;
        fretboardCells[cellIndex].classList.add('selected');
    }
  }
  updateChordInfo();
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then((registration) => {
        console.log('Service Worker registered: ', registration);
      })
      .catch((error) => {
        console.log('Service Worker registration failed: ', error);
      });
  });
}
let iniciado = false;
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
window.addEventListener('click', (event) => {
  if(!iniciado && isMobile) {
    //FullScreen
    if (document.fullscreenEnabled) {
      document.documentElement.requestFullscreen();
    } else if (document.webkitFullscreenEnabled) { // Para navegadores antiguos
      document.documentElement.webkitRequestFullscreen();
    }
    iniciado = true;
  }
});
window.addEventListener('DOMContentLoaded', (event) => {
  let searchParams = new URLSearchParams(window.location.search);
  let instrumento = 0;
  if(searchParams.has('i')) {
    instrumento = parseInt(searchParams.get('i'));
  }
  setInstrumento(instrumento);
});