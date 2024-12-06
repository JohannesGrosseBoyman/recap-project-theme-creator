
import { useState } from "react";
import { uid } from "uid";
import "./MultipleThemes.css"
import useLocalStorageState from "use-local-storage-state";

export default function MultipleThemes({ 
    themes ,
    selectedThemeId, 
    handleThemeSelect,
    handleAddTheme,
 }) {

    const [newThemeName, setNewThemeName] = useLocalStorageState("newThemeName", {defaultValue: ""});

    function handleInputValue(event) {
        setNewThemeName(event.target.value);
    }

    function isDuplicateName(newThemeName) {
        const newName = newThemeName.toLowerCase();
        return themes.some((theme) => theme.name.toLowerCase() === newName);
    }
    function handleNewTheme(newThemeName) {

        if (newThemeName.trim() === "") {
            alert("Please add a Theme name");
        } else if (isDuplicateName(newThemeName))  {
            alert("This Theme name already exists"); 
               
            }  else { 
                const newTheme = {id: uid(), name: newThemeName, colors: []};
                console.log("newTheme: ", newTheme);
                handleAddTheme(newTheme);
                setNewThemeName(newThemeName);
            } 
    }






return(
    <div className="theme-container" >
    <h2>Chose your Theme or create a new one</h2>
    <label htmlFor="theme" >Your Theme: </label>
    <select name="theme" id="theme" value={selectedThemeId} 
      onChange={(e) => handleThemeSelect(e.target.value) }>
        {themes.map((theme) => (
          <option key={theme.id} value={theme.id} >
            {theme.name}
          </option>
        ))}
    </select> <br />
    <div className="newTheme" >
    <button onClick={() => handleNewTheme(newThemeName)} >Add a new Theme</button>
    <label htmlFor="newTheme">Your new Theme name:</label>
    <input type="text" id="newTheme" value={newThemeName} 
            onChange={handleInputValue} 
            placeholder="Your new Themename"/>
            </div>
    </div>

)

}