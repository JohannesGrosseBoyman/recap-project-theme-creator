import { uid } from "uid";
import "./MultipleThemes.css";
import useLocalStorageState from "use-local-storage-state";
import { initialThemes } from "../../lib/themes";
import { useState } from "react";

export default function MultipleThemes({
  themes,
  selectedThemeId,
  handleThemeSelect,
  handleAddTheme,
  onEditTheme,
  onDeleteTheme,
}) {
  const [newThemeName, setNewThemeName] = useLocalStorageState("newThemeName", {
    defaultValue: "",
  });
  const currentTheme = themes.find((theme) => theme.id === selectedThemeId);
  const themeName = currentTheme?.name || "Unknown Theme";
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  function handleInputValue(event) {
    setNewThemeName(event.target.value);

  }

  function isDuplicateName(newThemeName) {
    const newName = newThemeName.toLowerCase();
    return themes.some((theme) => theme.name.toLowerCase() === newName);
  }

  function addTheme() {
    setIsAdding(true);
  }
  function cancelAddTheme() {
    setIsAdding(false);
  }

  function handleNewTheme(newThemeName) {
    if (newThemeName.trim() === "") {
      alert("Please add a Theme name");
    } else if (isDuplicateName(newThemeName)) {
      alert("This Theme name already exists");
    } else {
      const newTheme = { id: uid(), name: newThemeName, colors: [] };
      handleAddTheme(newTheme);
      setNewThemeName("");
      setIsAdding(false);
    }
  }

  function cancelEditTheme() {
    setIsEditing(false);
  }

  function handleEditTheme() {
    setNewThemeName(themeName);
    setIsEditing(true);
  }

  function handleRenameTheme(newThemeName) {
    if (newThemeName.trim() === "") {
        alert("Please add a Theme name");
      } else if (isDuplicateName(newThemeName)) {
        alert("This Theme name already exists");
      } else {
    onEditTheme(newThemeName, selectedThemeId);
    setIsEditing(false);}
  }

  function handeleDeleteTheme() {
    setIsDeleting(true);
  }

function cancelDelete() {
    setIsDeleting(false);
}

function confirmDelete(selectedThemeId) {
    onDeleteTheme(selectedThemeId);
    setIsDeleting(false);
}

  return (
    <div className="theme-container">
      <h2>Chose your Theme or create a new one</h2>
      <label htmlFor="theme">Your Theme: </label>
      <select
        name="theme"
        id="theme"
        value={selectedThemeId}
        onChange={(e) => handleThemeSelect(e.target.value)}
      >
        {themes.map((theme) => (
          <option key={theme.id} value={theme.id}>
            {theme.name}
          </option>
        ))}
      </select>{" "}
      <br />
      <div className="newTheme">
        <button onClick={addTheme}>Add a new Theme</button>
        <button
          onClick={handleEditTheme}
          disabled={selectedThemeId === initialThemes[0].id}
        >
          Edit the Theme
        </button>
        <button
          onClick={handeleDeleteTheme}
          disabled={selectedThemeId === initialThemes[0].id}
        >
          Delete the Theme
        </button>

        {isAdding ? (
          <>
            <label htmlFor="newTheme">Your new Theme name:</label>
            <input
              type="text"
              id="newTheme"
              value={newThemeName}
              onChange={handleInputValue}
              placeholder="Your new Themename"
            />
            <div>
              <button onClick={cancelAddTheme}>Cancel</button>
              <button onClick={() => handleNewTheme(newThemeName)}>Add</button>
            </div>
          </>
        ) : isEditing ? (
          <>
            <p>The current Theme name is: {themeName}</p>
            <label htmlFor="newTheme">Your new Theme name:</label>
            <input
              type="text"
              id="newTheme"
              value={newThemeName}
              onChange={handleInputValue}
              placeholder="Your new Themename"
            />
            <div>
              <button onClick={cancelEditTheme}>Cancel</button>
              <button onClick={() => handleRenameTheme(newThemeName)}>
                Rename
              </button>
            </div>
          </>
        ) : isDeleting ? (
            <>
            <p>Really delete Theme: {themeName}?</p>
            <button onClick={cancelDelete} >No</button>
            <button onClick={() => confirmDelete(selectedThemeId)}  >Delete Theme {themeName}</button>
            </>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}
