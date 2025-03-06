import { useState } from "react"

export default function Player({initialName ,symbol}) {
    const [playerName, setPlayerName] = useState(initialName)
    const [isEditing, setIsEditing] = useState(false);
    
    function handleEditClick() {
         setIsEditing((editing) => !isEditing);
    }

    function handleChange(event){
        console.log(event);
        setPlayerName(event.target.value);
    }

    let editplayerName = <span className="player-name">{playerName}</span>;
    if (isEditing) {
        editplayerName = ( 
        <input type="text" value={playerName} onChange={handleChange} required />
        );
    }

    return(
        <li>
        <span className='player'>
        {editplayerName}
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button> 
      </li>
    )
}