import { useState } from 'react';

export default function Player({ initialName, symbol, isActive, onChangeName }) {
    // State to manage the player's name and editing status
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    // Toggles the editing state and updates the player name if editing is turned off
    function handleEditClick() {
        setIsEditing((editing) => !editing); // Toggle editing state
        
        // If finishing editing, call onChangeName to update the player's name
        if (isEditing) {
            onChangeName(symbol, playerName);
        }
    }

    // Updates the playerName state when the input changes
    function handleChange(event) {
        setPlayerName(event.target.value);
    }

    // Default display of the player's name
    let editablePlayerName = <span className="player-name">{playerName}</span>;

    // If in editing mode, render an input field instead of the name
    if (isEditing) {
        editablePlayerName = (
            <input 
                type='text' 
                required 
                value={playerName} 
                onChange={handleChange} // Update playerName as the user types
            />
        );
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            {/* Button to toggle editing state and either save or edit */}
            <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}
