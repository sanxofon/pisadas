// Variables a incluir en Configuración de usuario en futuras versiones
let NUM_STRINGS = 6;  // Número de cuerdas
let NUM_FRETS = 13;    // Número de trastes
let TONIC_DEFINED_BY = 0; // 0 = más probable, 1 = más grave, 2 = más común, 3 = cuerda superior
// xConteo:  1 = La nota que más aparece es la tónica aunque no sea el bajo
// Primera: -1 = La primera cuerda (de arriba a abajo!) es la tónica

let SIZE_CHORD_IMAGE = 4; // Tamaño de la imagen del acorde

let DEFAULT_TUNING = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']; // Inicialización de la afinación por defecto // Guitar standard tuning (INVERSO)

let REVERSA = false; // Para 'horizontal' debe estar TRUE
let instrumento = 0; // Guitarra por defecto

let verbose = false; 

// Definiciones generales: E2, A2, D3, G3, B3, E4
if(REVERSA)DEFAULT_TUNING.reverse(); // REVERSA
const instrumentos = [
  {
    't': ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'], // TUNING
    's': 6, // NUM STRINGS
    'c': [-1,-1,-1,-1,-1,-1], // INITIAL CHORD
    'n': 'Guitarra', // NAME
  },
  {
    't': ['D2', 'A2', 'D3', 'F#3', 'A3', 'D4'], // TUNING
    's': 6, // NUM STRINGS
    'c': [-1,-1,-1,-1,-1,-1], // INITIAL CHORD
    'n': 'Guitarra en D', // NAME
  },
  {
    't': ['G3', 'C3', 'E4', 'A4', 'G3'], // TUNING
    's': 5, // NUM STRINGS
    'c': [-1,-1,-1,-1,-1], // INITIAL CHORD
    'n': 'Jarana', // NAME
  },
  {
    't': ['A3', 'C#4', 'E4', 'A4', 'A3'], // TUNING
    's': 5, // NUM STRINGS
    'c': [-1,-1,-1,-1,-1], // INITIAL CHORD
    'n': 'Jarana en A', // NAME
  },
];

// COSTANTES GLOBALES
const NUMBER_OF_NOTES = 12;
const MIN_NOTES_FOR_CHORD = 2;

const pisadimgDiv = document.getElementById('pisadimg');

const fretboard = document.querySelector('.fretboard');
const notasInput = document.querySelector('#notas');
const unicasInput = document.querySelector('#unicas');
const conteoInput = document.querySelector('#conteo');
const tonicaInput = document.querySelector('#tonica');
const bajoInput = document.querySelector('#bajo');
const acordeInput = document.querySelector('#acorde');
const acordeReduxInput = document.querySelector('#acorderedux');
const interpretaInput = document.querySelector('#interpretaciones');

// Las cuerdas empiezan muteadas
let selectedFrets = Array(NUM_STRINGS).fill(-1);
let mutedStrings = Array(NUM_STRINGS).fill(true);  // All strings muted initially
let fretboardCells = []; //Array of fretboard cells

const STORAGE_KEY = 'lastFretPositions'; // memoria último acorde
const FRETS_STORAGE_KEY = 'numFrets'; // memoria número de trastes

const todas_las_notas = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Global de acordes conocidos
let acordesConocidos = {};
let acordesConocidosVersion = 0;

// Pre-calculated lookup table of notes for each string and fret
let getNota = [];

// Piano related
const pianoContainer = document.querySelector('.piano');
const pianoKeys = [];
const pianoNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C"];
const pianoNotesIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
// NEW FUNCTION (before createGetNota())
function getNoteName(noteIndex, tonic) {
  const tonicIndex = todas_las_notas.indexOf(tonic.replace(/[0-9]/g, ''));
  const relativeIndex = (noteIndex + tonicIndex + NUMBER_OF_NOTES) % NUMBER_OF_NOTES;
  return todas_las_notas[relativeIndex];
}

function tunningToStr(t) {
  return t.join('').replaceAll(/[0-9]/g, '');
}

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

function loadScript(url, callback) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    script.onload = () => {
      if (verbose) console.log(`Script loaded successfully: ${url}`);
      if (callback) {
        callback(); // Execute the callback if provided
      }
      resolve(); // Resolve the promise after the callback
    };
    script.onerror = (error) => {
      if (verbose) console.error(`Error loading script: ${url}`, error);
      reject(error);
    };
    document.head.appendChild(script);
  });
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
  saveFretPositions(); // Memoria, guardar a LocalStorage
}

function getTablature() {
  let tablature = [];
  for (let stringIndex = 0; stringIndex < NUM_STRINGS; stringIndex++) {
    let fret = selectedFrets[stringIndex];
    if (fret === -1) {
      tablature.push('x'); // 'x' indicates that the string is not played
    } else {
      tablature.push(fret);
    }
  }
  return tablature;
}

// NEW FUNCTION (before getTablature())
function saveFretPositions() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedFrets));
  
}

// NEW FUNCTION (before setTablature())
function loadFretPositions() {
  const savedPositions = localStorage.getItem(STORAGE_KEY);
  if (savedPositions) {
    if (NUM_STRINGS!==savedPositions.length) { // Fret positions cleared from localStorage due to NUM_STRINGS change
      localStorage.removeItem(STORAGE_KEY);
      selectedFrets = Array(NUM_STRINGS).fill(-1);
      if (verbose) console.log('Fret positions deleted from localStorage for a change in NUM_STRINGS');
    } else {
      selectedFrets = JSON.parse(savedPositions);
      setAcorde(selectedFrets);
      if (verbose) console.log('Fret positions loaded from localStorage:', selectedFrets);
    }
  }
}

// Function to interpret the tablature input
function setTablature() {
  document.getElementById('tablature-input').value = document.getElementById('tablature-input').value.replaceAll(',', ' '); // Remove spaces
  const tablatureInput = document.getElementById('tablature-input').value.split(' ');
  tablature = tablatureInput.map(fret => fret.trim() === 'x' ? -1 : parseInt(fret.trim())); // Convert 'x' to -1
  setAcorde([-1,-1,-1,-1,-1,-1]); // Clear the fretboard
  setAcorde(tablature);
}

function setChordImage(chordName) {
  if (chordName.includes('?')) {
    const containerDiv = document.createElement('div');
    const imgElement = document.createElement('img');
    imgElement.src = 'desconocida.png';
    containerDiv.appendChild(imgElement);
    pisadimgDiv.innerHTML = containerDiv.innerHTML;
    return;
  }

  // Clear previous chord
  chordGenerator.clearChords('pisadimg');
  
  // Get tablature and convert to proper format
  const tablature = getTablature();
  
  // Convert tablature array to string format that matches the demo
  // e.g., [3, 2, 0, 0, 0, 3] -> "3 2 0 0 0 3"
  const tabString = tablature
    .map(fret => fret === -1 ? 'X' : fret)
    .join(' ');
  
  if (verbose) {
    console.log('Chord Generation Debug:');
    console.log('- Chord Name:', chordName);
    console.log('- Tablature String:', tabString);
  }

  // Use createChordFromTablature like in the demo
  try {
    chordGenerator.createChordFromTablature({
      name: chordName,
      tablature: tabString,
      containerId: 'pisadimg',
      size: SIZE_CHORD_IMAGE,
      stringNames: tunningToStr(instrumentos[instrumento]['t']),
      numStrings: NUM_STRINGS
    });
  } catch (error) {
    console.error('Chord generation error:', error);
  }
}

// Function to open the iINFO modal
function openModal() {
  document.getElementById('notation-modal').style.display = 'grid';
}

function openModalConfig() {
  document.getElementById('config-modal').style.display = 'grid';
}

// Function to close the modal
function closeModal() {
  document.getElementById('notation-modal').style.display = 'none';
  document.getElementById('config-modal').style.display = 'none';
}

// Close the modal when the user clicks anywhere outside of the modal
window.onclick = function(event) {
  const modal = document.getElementById('notation-modal');
  const modalConfig = document.getElementById('config-modal');
  if (event.target == modal || event.target == modalConfig) {
    modal.style.display = 'none';
    modalConfig.style.display = 'none';
  }
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

function codificarNameImg(str) {
  if(!str) return "";
  try {
    // OJO: El signo '∕' antes de '<sub>' en '∕<sub>' es especial, no es una / normal!!
    return str.replaceAll('/', '∕').replaceAll('&#183;','·'); // Reemplazar '/' con '∕' para evitar conflictos con la URL
  } catch (e) {
      console.error("Error decoding component:", e);
      return str; // Return original string if decoding fails.
  }
}

function laMasComun(acordeNotas,nuc) {
  nuc = getNotesSortedByCount(nuc);
  let conOctava = [];
  for (const n of nuc[0]) {
    for (const no of acordeNotas) {
      const x = no.replace(/[0-9]/g, '');
      if (x==n) {
        conOctava.push(no);
        break;
      }
    }
  }
  return conOctava[0];
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
  
  // calculamos las posibles interpretaciones
  const interpretaciones = getChordInterpretations(acordeNotas);

  // Buscamos la tónica más adecuada
  let tonica;
  
  const masComun = laMasComun(acordeNotas,notasUnicasConteo);
  
  // Si está definida y existe en el acorde se forza la tónica a la definida
  if (setonica!='' && notasUnicasConteo[0].indexOf(setonica) !== -1) {
    if (verbose) console.log("Forzar tónica:", setonica);
    tonica = setonica;
  } else if (TONIC_DEFINED_BY==3) { // La cuerda superior
    tonica = acordeNotas[0];
  } else if (TONIC_DEFINED_BY==2) { // La nota más común
    tonica = masComun;
  } else if (TONIC_DEFINED_BY==1) { // La nota más grave
    tonica = lowestNote;
  } else { // El acorde más simple
    tonica = calcularAcordeMasSimple(interpretaciones,lowestNote,masComun);
  }

  
  // Actualizar salida UI para usuario
  tonicaInput.textContent = tonica;
  bajoInput.textContent = lowestNote;
  unicasInput.textContent = notasUnicasConteo[0].join(", ");
  conteoInput.textContent = Object.values(notasUnicasConteo[1]).join(", ");
  interpretaInput.innerHTML = createDataTable(interpretaciones,tonica);
  acordeInput.innerHTML = formatChordString(acordeMasProbable(interpretaciones,tonica,lowestNote));
  acordeReduxInput.value = codificarNameImg(acordeMasProbable(interpretaciones,tonica,lowestNote,true).replace(/<[^>]*>/g, ''));
  // Actualizamos el estilo de las cuerdas (muteadas o no)
  updateStringMutingStyle();
  
  setChordImage(acordeReduxInput.value);
  
  const tablatureInput = document.getElementById('tablature-input');
  tablatureInput.value = getTablature().join(' '); // Update the input value
  
  // Highlight the piano keys
  updatePianoKeys(acordeNotas, tonica);
}

function vaciarUI() {
  notasInput.textContent = "Ninguna nota seleccionada";
  unicasInput.textContent = "";
  conteoInput.textContent = "";
  tonicaInput.textContent = "";
  bajoInput.textContent = "";
  acordeInput.textContent = "";
  acordeReduxInput.value = "";
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
        cell.classList.remove('selected');
      } else {
        cell.classList.remove('muted');
      }
    }
  }
}

function acordeMasProbable(interpretaciones,tonica,bajo,reducido=false) {
  tonica = tonica.replace(/[0-9]/g, '');
  bajo = bajo.replace(/[0-9]/g, '');
  tipo = reducido ? 4:3;
  for (let i = 0; i < interpretaciones.length; i++) {
    const row = interpretaciones[i];
    if(row[0][0]==tonica) {
      n = reducido ? row[4]:tonica+row[3]; // Cambia el acorde: 3 = Acorde Completo sin tónica (por eso se agrega) ó 4 = Reducido, sin paréntesis y ya trae tónica
      // if(tonica!=bajo) return n+'&#8260;<sub>'+bajo+'</sub>';
      if(tonica!=bajo) return n+'<sub>/'+bajo+'</sub>'; 
      else return n;
    }
  }
  if (interpretaciones[0].length<MIN_NOTES_FOR_CHORD) return "?";//"Insuficiente";
  return "ERROR: No se encontró la tónica en la pisada!";
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
    const acorde = '<b>'+uniqueNotes[i]+'</b>'+intint.replace(/\([^)]*\)/g, "").replace(/([245679])(?=[1245679])/g, "$1&#183;") // Elimina lo que está entre paréntesis
    // const acorde = '<b>'+uniqueNotes[i]+'</b>'+intint.replace(/\([^)]*\)/g, "").replace(/([245679])(?=[1245679])/g, "$1·") // Elimina lo que está entre paréntesis
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

function calcularAcordeMasSimple(interpretaciones,lowestNote,masComun) {
  lowestNote = lowestNote.replace(/[0-9]/g, '');
  masComun = masComun.replace(/[0-9]/g, '');
  let mejorAcorde = 0;
  let largo = 100;
  for (let i = 0; i < interpretaciones.length; i++) {
    let que = interpretaciones[i][3].replaceAll('sus','').replaceAll(/\([^)]+\)/g, '').replaceAll(/[mM#b+\-]+/g, '');
    let quelen = que.length;
    if (interpretaciones[i][0][0]==lowestNote) quelen -= 0.1
    if (interpretaciones[i][0][0]==masComun) quelen -= 0.1
    if (!que.includes('?') && quelen < largo) {
      largo = que.length;
      mejorAcorde = i;
    }
  }
  return interpretaciones[mejorAcorde][0][0];
}

// Interpreta los intervalos
function intepretarIntervalo(intervals) {
  const il = intervals.length;
  if (il < 2) return ""; 
  if (il < 3) return acordesConocidos[intervals.join(' ')] || "?";
  // Check for known chords, prioritizing longer matches
  for (let i = il; i >= 2; i--) {
    const chordKey = intervals.slice(0, i).join(' ');
    if (acordesConocidos[chordKey]) {
      let suffix = '';
      if (i < il) {
        for (let j = i; j < il; j++) {
          const diff = intervals[j] - (intervals[0]==0?0:intervals[0]); // Corrected interval calculation!
          if(diff==1) suffix += '9';
          if(diff==9) suffix += '6';
          if(diff==11) suffix += '11+';
          if(diff==4) suffix += '11';
          if(diff==14) suffix += '13';
        }
      }
      if(suffix != '' || il!=i) {
        suffix += '?';
      }
      return acordesConocidos[chordKey] + suffix + (il!=i ? '?':'');
    } else {
      // No se encontró la definición
      if (verbose) console.log("No se encontró la definición", chordKey, acordesConocidos[chordKey]);
    }
  }
  
  return "?";
}

function toggleExtraData() {
  const extraData = document.getElementById('extradata');
  extraData.classList.toggle('hidden');
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
  if(v<0 || v>3)v=0;
  TONIC_DEFINED_BY = v;
  updateChordInfo();
});

function cambiarInstrumento(i) {
  window.location.href = '?i=' + i;
}

function setInstrumento(n) {
  n = parseInt(n);
  if(n<0 || n>=instrumentos.length) return;
  instrumentos[n];
  DEFAULT_TUNING = instrumentos[n]['t'];
  NUM_STRINGS = instrumentos[n]['s'];
  // NUM_FRETS = instrumentos[n]['f'];
  fretboard.style.setProperty('--num-strings', NUM_STRINGS);
  // fretboard.style.setProperty('--num-frets', NUM_FRETS);
  createGetNota();
  createFretboard();
  setAcorde(instrumentos[n]['c']);
}

function setAcorde(acorde) {
  selectedFrets = acorde.map(fret => fret === 'x' ? -1 : parseInt(fret)); // Convert 'x' to -1
  if(REVERSA) selectedFrets.reverse(); // REVERSA
  for (let stringIndex = 0; stringIndex < NUM_STRINGS; stringIndex++) {
    const targetFret = selectedFrets[stringIndex];
    let cellIndex;
    if (targetFret !== -1) {  // Only select if a fret is chosen for the string
      cellIndex = targetFret * NUM_STRINGS + stringIndex;
      fretboardCells[cellIndex].classList.add('selected');
    } else {
      //Unselect muted strings
      for (let fretIndex = 0; fretIndex < NUM_FRETS; fretIndex++) {
        cellIndex = fretIndex * NUM_STRINGS + stringIndex;
        fretboardCells[cellIndex].classList.remove('selected');
      }
    }
  }
  updateChordInfo();
}

// Formatea HTML los nombre completos o reducidos de acordes
function formatChordString(chordString) {
  if(!chordString) return "";
  return chordString.replace(/([245679])(?=[1245679])/g, "$1&#183;").replace(/([A-G][#b]?)([^()]*)\(?([^()]*)\)?/g, (match, note, before, parens) => {
    let formattedString = "";
    if(note) formattedString += `<b>${note}</b>`
    if(before) formattedString += before;
    if(parens) formattedString += `<sup>(${parens})</sup>`;
    return formattedString;
    }
  );
}

// Crea el piano
function createPiano() {
  pianoContainer.innerHTML = ''; // Clear existing keys
  pianoKeys.length = 0; // Clear existing array
  for (let i = 0; i < pianoNotes.length; i++) {
    const note = pianoNotes[i];
    const key = document.createElement('div');
    key.classList.add('key');
    // NEW LINE: Set note text content based on current tonic
    key.textContent = getNoteName(pianoNotesIndexes[i], 'C'); // Default to C when piano is created. This will change in updatePianoKeys()
    key.dataset.note = note;
    
    if (note.includes('#')) {
      key.classList.add('black-key');
    } else {
      key.classList.add('white-key');
    }
    key.addEventListener('click', selectPianoKey);
    pianoContainer.appendChild(key);
    pianoKeys.push(key);
  }
}
function selectPianoKey(event) {
  const key = event.target;
  const note = key.dataset.note;
  if (verbose) console.log(`Nota del piano tocada: ${note}`);
  // Here you would add the logic to select a key
}
// FULL MODIFIED FUNCTION
function updatePianoKeys(acordeNotas, tonica) {
  pianoKeys.forEach((key, index) => {
    key.classList.remove('active'); // Reset key styles
    // NEW LINE: Update the note label based on the current tonic
    key.textContent = getNoteName(pianoNotesIndexes[index], tonica);
  });
  const tonicaIndex = todas_las_notas.indexOf(tonica.replace(/[0-9]/g, ''));
  
  acordeNotas.forEach(note => {
    const noteName = note.replace(/[0-9]/g, '');
    const noteIndex = todas_las_notas.indexOf(noteName);
    
    // Calculate the position of the note relative to C major scale
    let relativeNoteIndex = (noteIndex - tonicaIndex + NUMBER_OF_NOTES) % NUMBER_OF_NOTES;
    const pianoIndex = pianoNotesIndexes[relativeNoteIndex];
    
    if (pianoIndex < pianoKeys.length && pianoIndex >= 0) {
      pianoKeys[pianoIndex].classList.add('active');
    }
  });
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
    .then((registration) => {
      if (verbose) console.log('Service Worker registered: ', registration);
    })
    .catch((error) => {
      if (verbose) console.log('Service Worker registration failed: ', error);
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
  // Load saved number of frets if exists
  const savedFrets = localStorage.getItem(FRETS_STORAGE_KEY);
  if (savedFrets) {
    const numFrets = parseInt(savedFrets);
    if (numFrets >= 8 && numFrets <= 13) {
      NUM_FRETS = numFrets;
      console.log('NUM_FRETS:', NUM_FRETS);
      document.getElementById('numFrets').value = NUM_FRETS;
      fretboard.style.setProperty('--num-frets', NUM_FRETS);
    }
  }
  // Load saved instrument if exists
  let searchParams = new URLSearchParams(window.location.search);
  if(searchParams.has('i')) {
    instrumento = parseInt(searchParams.get('i'));
  }
  setInstrumento(instrumento);
  createPiano(); //Initialize the piano
  // loadFretPositions(); // memoria último acorde
  
  // Event listener for fret number input
  document.getElementById('numFrets').addEventListener('change', function(e) {
    const newValue = parseInt(e.target.value);
    if (newValue >= 8 && newValue <= 13) {
      NUM_FRETS = newValue;
      localStorage.setItem(FRETS_STORAGE_KEY, NUM_FRETS.toString());
      fretboard.style.setProperty('--num-frets', NUM_FRETS);
      createGetNota();
      createFretboard();
      setAcorde(instrumentos[instrumento]['c']);
    } else {
      e.target.value = NUM_FRETS; // Reset to current value if invalid
    }
  });

  // loadScript -> acordesConocidos
  loadScript('acordesConocidos.js', loadFretPositions)
    .then(() => {
      if (verbose) console.log("External script executed");
      // You can now use functions or variables from external-script.js here
    })
    .catch(error => {
      if (verbose) console.error("There was an error:", error);
    });
});