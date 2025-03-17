/**
 * chordGenerator2.js
 * 
 * A helper script to dynamically create chord diagrams using chords.js
 * Modified to support instruments with different numbers of strings
 */

// Create a namespace for our chord generator
const chordGenerator = (function() {
    function createChord(options) {
        // Set default values for optional parameters
        const defaults = {
            size: 4,
            containerId: "pisadimg",
            layout: "1",
            stringNames: "EADGBE",
            numStrings: 6 // Default to 6 strings for guitar
        };
        
        // Merge options with defaults
        const config = Object.assign({}, defaults, options);
        
        // Validate required parameters
        if (!config.name || !config.positions || !config.fingers) {
            console.error("Chord name, positions, and fingers are required parameters");
            return null;
        }
        
        // Format positions and fingers to match chords.js requirements
        // Ensure positions are uppercase and match the number of strings
        const formattedPositions = config.positions.toUpperCase()
            .replace(/[^0-9X-]/g, '-')
            .padEnd(config.numStrings, '-')
            .slice(0, config.numStrings);

        // Ensure fingers match the number of strings
        const formattedFingers = config.fingers
            .replace(/[^0-9-]/g, '-')
            .padEnd(config.numStrings, '-')
            .slice(0, config.numStrings);

        // Generate the chord canvas
        const chordCanvas = chords.generate(
            config.name,
            formattedPositions,
            formattedFingers,
            config.size,
            config.layout,
            config.stringNames,
            config.numStrings
        );
        
        // Append to container if specified
        const container = document.getElementById(config.containerId);
        if (container) {
            container.appendChild(chordCanvas);
        }
        
        return chordCanvas;
    }
    
    function clearChords(containerId = "chord-container") {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = '';
        }
    }
    
    function createChordFromTablature(options) {
        // Get the number of strings from options or default to 6
        const numStrings = options.numStrings || 6;
        
        // Standardize the tablature format
        let tab = options.tablature.replace(/,/g, ' ').trim().split(/\s+/);
        
        // Convert to positions format (ensure correct number of positions)
        let positions = tab
            .map(fret => fret === 'x' || fret === 'X' ? 'X' : fret)
            .concat(Array(numStrings).fill('X'))
            .slice(0, numStrings)
            .join('');
        
        // Generate default fingers (ensure correct number of fingers)
        let fingers = Array(numStrings).fill('-').join('');
        
        // Create the chord with the processed data
        return createChord({
            name: options.name,
            positions: positions,
            fingers: fingers,
            size: options.size || 4,
            containerId: options.containerId,
            layout: options.layout || "1",
            stringNames: options.stringNames,
            numStrings: numStrings
        });
    }
    
    return {
        createChord: createChord,
        clearChords: clearChords,
        createChordFromTablature: createChordFromTablature
    };
})();
