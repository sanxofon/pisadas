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
    'n': 'Guitarra en D Mayor', // NAME
  },
  {
    't': ['D2', 'G2', 'D3', 'G3', 'B3', 'D4'], // TUNING
    's': 6, // NUM STRINGS
    'c': [-1,-1,-1,-1,-1,-1], // INITIAL CHORD
    'n': 'Guitarra en G Mayor', // NAME (Open G tuning)
  },
  {
    't': ['D2', 'A2', 'D3', 'G3', 'A3', 'D4'], // TUNING
    's': 6, // NUM STRINGS
    'c': [-1,-1,-1,-1,-1,-1], // INITIAL CHORD
    'n': 'Guitarra Open D', // NAME (Open D tuning)
  },
  {
    't': ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'], // TUNING
    's': 6, // NUM STRINGS
    'c': [-1,-1,-1,-1,-1,-1], // INITIAL CHORD
    'n': 'Guitarra Drop D', // NAME (Drop D tuning)
  },
  {
    't': ['C2', 'G2', 'C3', 'G3', 'C4', 'E4'], // TUNING
    's': 6, // NUM STRINGS
    'c': [-1,-1,-1,-1,-1,-1], // INITIAL CHORD
    'n': 'Guitarra en C', // NAME (Open C tuning)
  },
  {
    't': ['E2', 'A2', 'E3', 'A3', 'C#4', 'E4'], // TUNING
    's': 6, // NUM STRINGS
    'c': [-1,-1,-1,-1,-1,-1], // INITIAL CHORD
    'n': 'Guitarra en A Mayor', // NAME (Open A tuning)
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
    'n': 'Jarana en A Mayor', // NAME
  },
  {
    't': ['G3', 'D3', 'A3', 'E4'], // TUNING
    's': 4, // NUM STRINGS
    'c': [-1,-1,-1,-1], // INITIAL CHORD
    'n': 'Mandolina', // NAME (Standard GCEA tuning)
  },
  {
    't': ['C4', 'E4', 'G4', 'A4'], // TUNING
    's': 4, // NUM STRINGS
    'c': [-1,-1,-1,-1], // INITIAL CHORD
    'n': 'Ukulele', // NAME (Standard GCEA tuning)
  },
  {
    't': ['G3', 'C4', 'E4', 'A4'], // TUNING
    's': 4, // NUM STRINGS
    'c': [-1,-1,-1,-1], // INITIAL CHORD
    'n': 'Ukulele en G', // NAME (Standard GCEA tuning)
  },
  {
    't': ['D4', 'G4', 'B4', 'E5'], // TUNING
    's': 4, // NUM STRINGS
    'c': [-1,-1,-1,-1], // INITIAL CHORD
    'n': 'Ukulele en D', // NAME (D tuning)
  },
  {
    't': ['D3', 'G3', 'B4', 'D4'], // TUNING
    's': 4, // NUM STRINGS
    'c': [-1,-1,-1,-1], // INITIAL CHORD
    'n': 'Cavaquinho Brasil en D', // NAME (Standard Brazilian tuning)
  },
  {
    't': ['D3', 'G3', 'B4', 'E4'], // TUNING
    's': 4, // NUM STRINGS
    'c': [-1,-1,-1,-1], // INITIAL CHORD
    'n': 'Cavaquinho Brasil en D (Moderna)', // NAME (Modern Brazilian tuning)
  },
  {
    't': ['G3', 'D4', 'A4', 'E4'], // TUNING
    's': 4, // NUM STRINGS
    'c': [-1,-1,-1,-1], // INITIAL CHORD
    'n': 'Cavaquinho Brasil en G', // NAME (Secondary Brazilian tuning)
  },
  {
    't': ['C3', 'G3', 'A3', 'D4'], // TUNING
    's': 4, // NUM STRINGS
    'c': [-1,-1,-1,-1], // INITIAL CHORD
    'n': 'Cavaquinho Portugal en C', // NAME (Standard Portuguese tuning)
  },
  {
    't': ['D3', 'A3', 'B4', 'C4'], // TUNING
    's': 4, // NUM STRINGS
    'c': [-1,-1,-1,-1], // INITIAL CHORD
    'n': 'Cavaquinho Portugal en D', // NAME (Secondary Portuguese tuning)
  }
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
const DARK_MODE_STORAGE_KEY = 'darkMode'; // Storage key for dark mode preference

// Constants for favorites
const FAVORITES_STORAGE_KEY = 'savedChords';
const saveChordBtn = document.getElementById('saveChordBtn');
const clearFavoritesBtn = document.getElementById('clearFavoritesBtn');
const favoritesList = document.getElementById('favoritesList');
const exportFavoritesBtn = document.getElementById('exportFavoritesBtn');
const importFavoritesBtn = document.getElementById('importFavoritesBtn');

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

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem(DARK_MODE_STORAGE_KEY, isDarkMode ? 'enabled' : 'disabled');
}

function checkDarkModePreference() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  if (!darkModeToggle) return; // Safety check
  
  const darkMode = localStorage.getItem(DARK_MODE_STORAGE_KEY);
  
  if (darkMode === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeToggle.checked = true;
  } else {
    document.body.classList.remove('dark-mode');
    darkModeToggle.checked = false;
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
  
  // If the clicked cell is already selected, unselect it and mute the string
  if (cell.classList.contains('selected')) {
    cell.classList.remove('selected');
    selectedFrets[stringIndex] = -1; // Mark string as muted
  } else {
    // If another fret on this string was selected, unselect it
    const previouslySelectedFret = selectedFrets[stringIndex];
    if (previouslySelectedFret !== -1) {
      const prevCellIndex = previouslySelectedFret * NUM_STRINGS + stringIndex;
      if (prevCellIndex < fretboardCells.length) {
        fretboardCells[prevCellIndex].classList.remove('selected');
      }
    }
    // Select the new fret
    selectedFrets[stringIndex] = fretIndex;
    cell.classList.add('selected');
  }
  
  // Update the muting style for all strings
  updateStringMutingStyle();
  updateChordInfo();
  saveFretPositions(); // Save to localStorage
}

function updateStringMutingStyle() {
  // For each string
  for (let stringIndex = 0; stringIndex < NUM_STRINGS; stringIndex++) {
    const isMuted = selectedFrets[stringIndex] === -1;
    
    // For each fret on this string
    for (let fretIndex = 0; fretIndex < NUM_FRETS; fretIndex++) {
      const cellIndex = fretIndex * NUM_STRINGS + stringIndex;
      
      if (cellIndex < fretboardCells.length) {
        const cell = fretboardCells[cellIndex];
        
        // Apply or remove the muted class based on string state
        if (isMuted) {
          cell.classList.add('muted');
        } else {
          cell.classList.remove('muted');
        }
      }
    }
  }
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
  let savedPositions = localStorage.getItem(STORAGE_KEY);
  if (savedPositions) {
    savedPositions = JSON.parse(savedPositions);
    if (NUM_STRINGS!==savedPositions.length) { // Fret positions cleared from localStorage due to NUM_STRINGS change
      localStorage.removeItem(STORAGE_KEY);
      selectedFrets = Array(NUM_STRINGS).fill(-1);
      if (verbose) console.log('Fret positions deleted from localStorage for a change in NUM_STRINGS');
    } else {
      selectedFrets = savedPositions;
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
  
  // Get fingering pattern from chord if available, otherwise use default
  let fingeringPattern = '-'.repeat(NUM_STRINGS);
  
  // Check if this chord exists in favorites to get its fingering
  const favorites = loadFavorites();
  const matchingChord = favorites.find(chord => 
    chord.name === chordName && 
    chord.instrumento === instrumento &&
    JSON.stringify(chord.tablatura) === JSON.stringify(tablature)
  );
  
  if (matchingChord && matchingChord.fingering) {
    fingeringPattern = matchingChord.fingering;
  }
  
  if (verbose) {
    console.log('Chord Generation Debug:');
    console.log('- Chord Name:', chordName);
    console.log('- Tablature String:', tabString);
    console.log('- Fingering Pattern:', fingeringPattern);
  }

  // Use createChordFromTablature like in the demo
  try {
    chordGenerator.createChordFromTablature({
      name: chordName,
      tablature: tabString,
      fingering: fingeringPattern,
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
  if (acordeNotas.length <= 1) {
    vaciarUI()
    saveChordBtn.disabled = true; // Disable save button when no chord is selected
    return;
  }
  if(REVERSA)acordeNotas.reverse(); // REVERSA
  
  // Enable save button when a chord is selected
  saveChordBtn.disabled = false;
  
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
  saveChordBtn.disabled = true; // Disable save button when UI is cleared
}

/* function updateStringMutingStyle() {
  for (let stringIndex = 0; stringIndex < NUM_STRINGS; stringIndex++) {
    const isMuted = selectedFrets[stringIndex] < 0;
    for (let fretIndex = 0; fretIndex < NUM_FRETS; fretIndex++) {
      // Calculate the correct index based on how cells are added in createFretboard
      const cellIndex = fretIndex * NUM_STRINGS + stringIndex;
      if (cellIndex < fretboardCells.length) {
        const cell = fretboardCells[cellIndex];
        if (isMuted) {
          cell.classList.add('muted');
        } else {
          cell.classList.remove('muted');
        }
      }
    }
  }
} */

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
  if (il < 3) return acordesConocidos[intervals.join(' ')][0] || "?";
  // Check for known chords, prioritizing longer matches
  for (let i = il; i >= 2; i--) {
    const chordKey = intervals.slice(0, i).join(' ');
    if (acordesConocidos[chordKey] && acordesConocidos[chordKey][0]) {
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
      return acordesConocidos[chordKey][0] + suffix + (il!=i ? '?':'');
    } else {
      // No se encontró la definición
      if (verbose) console.log("No se encontró la definición", chordKey, acordesConocidos[chordKey][0]);
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

// Save chord to favorites
function saveChordToFavorites() {
  // Check if there's a chord to save
  if (acordeReduxInput.value === "") {
    alert("No hay acorde para guardar");
    return;
  }
  
  // Ask for fingering pattern
  const defaultPattern = "-".repeat(NUM_STRINGS);
  const fingeringPattern = prompt("Ingrese la cadena de digitación (dedos utilizados):", defaultPattern);
  
  // If user cancels, don't save
  if (fingeringPattern === null) return;
  
  // Create chord object
  const chord = {
    id: Date.now().toString(), // Unique ID based on timestamp
    name: acordeReduxInput.value,
    displayName: acordeInput.innerHTML,
    tonica: tonicaInput.textContent,
    bajo: bajoInput.textContent,
    instrumento: instrumento,
    instrumentoNombre: instrumentos[instrumento].n,
    tablatura: getTablature(),
    fingering: fingeringPattern,
    date: new Date().toISOString(),
    notas: notasInput.textContent
  };
  
  // Get existing favorites
  let favorites = JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) || '[]');
  
  // Add new chord
  favorites.push(chord);
  
  // Save to localStorage
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  
  // Update favorites list
  updateFavoritesList();
  
  // Show confirmation
  flashConfigIcon();
  if (verbose) alert(`Acorde "${chord.name}" guardado correctamente`);
}

// Function to flash the config icon to guide users
function flashConfigIcon() {
  const configIcon = document.querySelector('.modal-config-icon');
  if (!configIcon) return;
  
  // Add a flash class that we'll define in CSS
  configIcon.classList.add('flash-icon');
  
  // Flash 3 times (6 transitions) over 3 seconds
  setTimeout(() => {
    configIcon.classList.remove('flash-icon');
  }, 3000);
}

// Load favorites from localStorage
function loadFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) || '[]');
}

// Update favorites list in the config modal
function updateFavoritesList() {
  const favorites = loadFavorites();
  
  // Clear current list
  favoritesList.innerHTML = '';
  
  if (favorites.length === 0) {
    favoritesList.innerHTML = '<div class="no-favorites">No hay acordes guardados</div>';
    return;
  }
  
  // Sort by date (newest first)
  favorites.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Create list items
  favorites.forEach(chord => {
    const item = document.createElement('div');
    item.className = 'favorite-item';
    item.dataset.id = chord.id;
    
    const formattedDate = new Date(chord.date).toLocaleDateString();
    
    item.innerHTML = `
      <div class="favorite-info">
        <div class="favorite-name">${chord.name}</div>
        <div class="favorite-details">
          ${chord.instrumentoNombre} - ${formattedDate}
        </div>
      </div>
      <div class="favorite-actions">
        <button class="load-favorite favorites-btn" title="Cargar acorde"><img src="./send.png" class="favorites-img chica"></button>
        <button class="delete-favorite favorites-btn" title="Eliminar"><img src="./trash.png" class="favorites-img chica"></button>
      </div>
    `;
    
    favoritesList.appendChild(item);
    
    // Add event listeners
    item.querySelector('.load-favorite').addEventListener('click', () => loadFavoriteChord(chord.id));
    item.querySelector('.delete-favorite').addEventListener('click', () => deleteFavoriteChord(chord.id));
    
    // Make the whole item clickable to load the chord
    item.addEventListener('click', (e) => {
      // Only trigger if not clicking on a button
      if (!e.target.closest('button')) {
        loadFavoriteChord(chord.id);
      }
    });
  });
}

// Load a favorite chord
function loadFavoriteChord(id) {
  const favorites = loadFavorites();
  const chord = favorites.find(c => c.id === id);
  
  if (!chord) {
    alert("No se encontró el acorde");
    return;
  }
  
  // Set instrument if different
  if (instrumento !== chord.instrumento) {
    setInstrumento(chord.instrumento);
  }
  
  // Set the chord
  setAcorde([-1,-1,-1,-1,-1,-1]); // Clear the fretboard
  setAcorde(chord.tablatura);
  
  // Store the fingering pattern for use in setChordImage
  if (chord.fingering) {
    // We don't need to store it separately as setChordImage will look it up
    if (verbose) console.log(`Cargando digitación: ${chord.fingering}`);
  }
  
  // Close the modal
  closeModal();
  
  // Show confirmation
  if (verbose) alert(`Acorde "${chord.name}" cargado correctamente`);
}

// Delete a favorite chord
function deleteFavoriteChord(id) {
  if (!confirm("¿Está seguro de eliminar este acorde?")) return;
  
  let favorites = loadFavorites();
  favorites = favorites.filter(chord => chord.id !== id);
  
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  updateFavoritesList();
}

// Clear all favorites
function clearAllFavorites() {
  if (!confirm("¿Está seguro de eliminar TODOS los acordes guardados?")) return;
  
  localStorage.removeItem(FAVORITES_STORAGE_KEY);
  updateFavoritesList();
}
// Importar acordes guardados como JSON
function importFavorites() {
  // Create a file input element
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.json';
  
  // Handle file selection
  fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(event) {
      try {
        // Parse the JSON content
        const importedChords = JSON.parse(event.target.result);
        
        // Get existing favorites
        let currentFavorites = loadFavorites();
        let addedCount = 0;
        let updatedCount = 0;
        
        // Process each imported chord
        importedChords.forEach(importedChord => {
          // Check if this chord already exists
          const existingIndex = currentFavorites.findIndex(existing => 
            existing.instrumento === importedChord.instrumento &&
            JSON.stringify(existing.tablatura) === JSON.stringify(importedChord.tablatura) &&
            existing.name === importedChord.name
          );
          
          if (existingIndex === -1) {
            // Chord doesn't exist, add it with a new ID
            importedChord.id = Date.now().toString() + Math.random().toString(36).substr(2, 5);
            currentFavorites.push(importedChord);
            addedCount++;
          } else {
            // Chord exists, check if we should update it (prefer one with fingering)
            const existingChord = currentFavorites[existingIndex];
            
            if ((!existingChord.fingering || existingChord.fingering === '-'.repeat(NUM_STRINGS)) && 
                importedChord.fingering && importedChord.fingering !== '-'.repeat(NUM_STRINGS)) {
              // Keep the existing ID but update other properties
              importedChord.id = existingChord.id;
              currentFavorites[existingIndex] = importedChord;
              updatedCount++;
            }
          }
        });
        
        // Save the updated favorites
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(currentFavorites));
        
        // Update the UI
        updateFavoritesList();
        
        // Show results
        alert(`Importación completada:\n- ${addedCount} acordes nuevos añadidos\n- ${updatedCount} acordes actualizados con digitación`);
        
      } catch (error) {
        console.error('Error parsing JSON:', error);
        alert('Error al importar: El archivo no contiene un formato JSON válido de acordes.');
      }
    };
    
    reader.onerror = function() {
      alert('Error al leer el archivo.');
    };
    
    reader.readAsText(file);
  });
  
  // Trigger the file selection dialog
  fileInput.click();
}

// Exportar acordes guardados como JSON
function exportFavorites() {
  const favorites = loadFavorites();
  
  if (favorites.length === 0) {
    alert("No hay acordes guardados para exportar");
    return;
  }
  
  // Crear el contenido JSON formateado
  const jsonContent = JSON.stringify(favorites, null, 2);
  
  // Crear modal para mostrar el JSON y opciones
  const modalContent = document.createElement('div');
  modalContent.className = 'export-modal';
  modalContent.innerHTML = `
    <h3>Exportar Acordes</h3>
    <p>Tienes ${favorites.length} acordes guardados.</p>
    <div class="export-options">
      <button id="downloadJsonBtn">Descargar como JSON</button>
      <button id="copyJsonBtn">Copiar al portapapeles</button>
    </div>
    <textarea id="jsonContent" readonly>${jsonContent}</textarea>
    <button id="closeExportBtn">Cerrar</button>
  `;
  
  // Crear el modal
  const exportModal = document.createElement('div');
  exportModal.className = 'modal';
  exportModal.id = 'export-modal';
  exportModal.appendChild(modalContent);
  
  // Agregar el modal al DOM
  document.body.appendChild(exportModal);
  
  // Mostrar el modal
  exportModal.style.display = 'grid';
  
  // Agregar event listeners
  document.getElementById('downloadJsonBtn').addEventListener('click', () => {
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    // Format current date for filename
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD format
    const timeStr = now.toTimeString().slice(0, 8).replace(/:/g, ''); // HHMMSS format
    
    a.download = `mis_acordes-${dateStr}-${timeStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
  
  document.getElementById('copyJsonBtn').addEventListener('click', () => {
    const textarea = document.getElementById('jsonContent');
    textarea.select();
    document.execCommand('copy');
    alert('Contenido copiado al portapapeles');
  });
  
  document.getElementById('closeExportBtn').addEventListener('click', () => {
    document.body.removeChild(exportModal);
  });
  
  // Cerrar al hacer clic fuera del contenido
  exportModal.addEventListener('click', (e) => {
    if (e.target === exportModal) {
      document.body.removeChild(exportModal);
    }
  });
}

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
  instrumento = n;
  instrumentos[instrumento];
  DEFAULT_TUNING = instrumentos[instrumento]['t'];
  NUM_STRINGS = instrumentos[instrumento]['s'];
  // NUM_FRETS = instrumentos[n]['f'];
  fretboard.style.setProperty('--num-strings', NUM_STRINGS);
  // fretboard.style.setProperty('--num-frets', NUM_FRETS);
  createGetNota();
  createFretboard();
  setAcorde(instrumentos[instrumento]['c']);
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
  const note = key.textContent; // Obtenemos el texto de la nota (sin octava)
  
  if (verbose) console.log(`Nota del piano tocada: ${note}`);
  
  // Verificamos si la tecla ya está iluminada
  if (key.classList.contains('highlighted')) {
    // Si ya está iluminada, la desactivamos
    key.classList.remove('highlighted');
    clearHighlightedFrets();
  } else {
    // Primero, eliminamos cualquier iluminación previa
    clearHighlightedPianoKeys();
    clearHighlightedFrets();
    
    // Luego iluminamos la tecla actual
    key.classList.add('highlighted');
    
    // Y también iluminamos todos los trastes que contienen esta nota
    highlightFretsWithNote(note);
  }
}

// Función para eliminar la iluminación de todas las teclas del piano
function clearHighlightedPianoKeys() {
  pianoKeys.forEach(key => {
    key.classList.remove('highlighted');
  });
}

// Función para eliminar la iluminación de todos los trastes
function clearHighlightedFrets() {
  fretboardCells.forEach(cell => {
    cell.classList.remove('highlighted');
  });
}

// Función para iluminar todos los trastes que contienen una nota específica
function highlightFretsWithNote(noteName) {
  fretboardCells.forEach(cell => {
    // Extraemos solo el nombre de la nota sin la octava
    const cellNoteName = cell.textContent.replace(/[0-9]/g, '');
    
    // Si la nota del traste coincide con la nota del piano, iluminamos
    if (cellNoteName === noteName) {
      cell.classList.add('highlighted');
    }
  });
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

function saveChordImage() {
  const chordName = document.getElementById('acorde').textContent;
  const pisadimg = document.getElementById('pisadimg');
  const canvas = pisadimg.querySelector('canvas');
  
  if (!canvas) {
      console.error('No chord diagram found to save');
      return;
  }

  // Sanitize the chord name for filename
  const sanitizedName = chordName
      .replace(/[^a-zA-Z0-9]/g, '_')
      .replace(/_+/g, '_')
      .toLowerCase();

  // Create a temporary link to trigger the download
  const link = document.createElement('a');
  link.download = `chord_${sanitizedName}.png`;
  link.href = canvas.toDataURL('image/png');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Populate instrument select
function populateInstrumentSelect() {
  const select = document.getElementById('instrumento');
  for (let i = 0; i < instrumentos.length; i++) {
    const option = document.createElement('option');
    option.value = i;
    const l = instrumentos[i].c.length;
    option.textContent = `${l}: ${instrumentos[i].n} [${instrumentos[i].t.join(' ')}]`;
    option.selected = (i === instrumento); // Add this line to select current instrument
    select.appendChild(option);
  }
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
    .then((registration) => {
      if (verbose) console.log('Service Worker registered: ', registration);
      
      // Check for updates on page load
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New version available
            if (confirm('¡Nueva versión disponible! ¿Desea actualizar ahora?')) {
              window.location.reload();
            }
          }
        });
      });
      
      // Check for updates periodically
      setInterval(() => {
        registration.update();
      }, 60 * 60 * 1000); // Check every hour
    })
    .catch((error) => {
      if (verbose) console.log('Service Worker registration failed: ', error);
    });
  });
  
  // Listen for controller change to reload the page
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    window.location.reload();
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
// Splash screen functionality
document.addEventListener('DOMContentLoaded', function() {
  const splashScreen = document.getElementById('splashScreen');
  const isReturningUser = localStorage.getItem('hasVisitedBefore');
  
  // Set timeout duration based on whether user is new or returning
  const timeoutDuration = isReturningUser ? 300 : 3000;
  
  // Hide splash screen after timeout
  setTimeout(function() {
    splashScreen.classList.add('splash-hidden');
    
    // Remove from DOM after transition completes
    setTimeout(function() {
      splashScreen.style.display = 'none';
    }, 500);
    
    // Mark user as returning for next visit
    localStorage.setItem('hasVisitedBefore', 'true');
  }, timeoutDuration);
});
window.addEventListener('DOMContentLoaded', (event) => {
  // Load saved number of frets if exists
  const savedFrets = localStorage.getItem(FRETS_STORAGE_KEY);
  if (savedFrets) {
    const numFrets = parseInt(savedFrets);
    if (numFrets >= 8 && numFrets <= 13) {
      NUM_FRETS = numFrets;
      if (verbose) console.log('NUM_FRETS:', NUM_FRETS);
      document.getElementById('numFrets').value = NUM_FRETS;
      fretboard.style.setProperty('--num-frets', NUM_FRETS);
    }
  }
  // Load saved instrument if exists
  let searchParams = new URLSearchParams(window.location.search);
  if(searchParams.has('i')) {
    instrumento = parseInt(searchParams.get('i'));
  }
  
  // Add event listeners for favorites functionality
  saveChordBtn.addEventListener('click', saveChordToFavorites);
  clearFavoritesBtn.addEventListener('click', clearAllFavorites);

  // Event listeners for favorites functionality
  saveChordBtn.addEventListener('click', saveChordToFavorites);
  clearFavoritesBtn.addEventListener('click', clearAllFavorites);
  // Agregar event listener para exportar
  if (exportFavoritesBtn) {
    exportFavoritesBtn.addEventListener('click', exportFavorites);
  }
  // Agregar event listener para importar
  if (importFavoritesBtn) {
    importFavoritesBtn.addEventListener('click', importFavorites);
  }
  
  // Initialize favorites list
  updateFavoritesList();
  // Disable save button initially
  saveChordBtn.disabled = true;

  setInstrumento(instrumento);
  createPiano(); //Initialize the piano
  // Populate instruments select
  populateInstrumentSelect();
  
  // Check dark mode preference
  checkDarkModePreference();
  
  // Add event listener for dark mode toggle
  const darkModeToggle = document.getElementById('darkModeToggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('change', toggleDarkMode);
  }

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