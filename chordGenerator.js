/**
 * chordGenerator.js
 * 
 * A helper script to dynamically create chord diagrams using chords.js
 */

// Create a namespace for our chord generator
const chordGenerator = (function() {
    function createChord(options) {
        // Set default values for optional parameters
        const defaults = {
            size: 4,
            containerId: "chord-container",
            layout: "1",
            stringNames: "EADGBe"
        };
        
        // Merge options with defaults
        const config = Object.assign({}, defaults, options);
        
        // Validate required parameters
        if (!config.name || !config.positions || !config.fingers) {
            console.error("Chord name, positions, and fingers are required parameters");
            return null;
        }
        
        // Format positions and fingers to match chords.js requirements
        // Ensure positions are uppercase and exactly 6 characters
        const formattedPositions = config.positions.toUpperCase()
            .replace(/[^0-9X-]/g, '-')
            .padEnd(6, '-')
            .slice(0, 6);

        // Ensure fingers are exactly 6 characters
        const formattedFingers = config.fingers
            .replace(/[^0-9-]/g, '-')
            .padEnd(6, '-')
            .slice(0, 6);

        // Generate the chord canvas
        const chordCanvas = chords.generate(
            config.name,
            formattedPositions,
            formattedFingers,
            config.size,
            config.layout,
            config.stringNames
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
        // Standardize the tablature format
        let tab = options.tablature.replace(/,/g, ' ').trim().split(/\s+/);
        
        // Convert to positions format (ensure 6 positions)
        let positions = tab
            .map(fret => fret === 'x' || fret === 'X' ? 'X' : fret)
            .concat(Array(6).fill('X'))
            .slice(0, 6)
            .join('');
        
        // Generate default fingers (ensure 6 fingers)
        let fingers = Array(6).fill('-').join('');
        
        // Create the chord with the processed data
        return createChord({
            name: options.name,
            positions: positions,
            fingers: fingers,
            size: options.size || 4,
            containerId: options.containerId,
            layout: options.layout || "1",
            stringNames: options.stringNames
        });
    }
    
    return {
        createChord: createChord,
        clearChords: clearChords,
        createChordFromTablature: createChordFromTablature
    };
})();