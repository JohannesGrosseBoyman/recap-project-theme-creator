import { initialThemes } from "./lib/themes";
import MultipleThemes from "./Components/MultipleThemes/MultipleThemes";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import "./App.css";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";

function App() {
  const [themes, setThemes] = useLocalStorageState("themes", {
    defaultValue: initialThemes,
  });
  const [selectedThemeId, setSelectedThemeId] = useLocalStorageState(
    "selectedThemeId",
    { defaultValue: "t1" }
  );

  function handleThemeSelect(selectedThemeId) {
    setSelectedThemeId(selectedThemeId);
  }

  function handleAddTheme(newTheme) {
    setThemes([...themes, newTheme]);
    setSelectedThemeId(newTheme.id);
  }

  function handleEditThemeName(newThemeName, selectedThemeId) {
    const updatedThemes = themes.map((theme) =>
      theme.id === selectedThemeId ? { ...theme, name: newThemeName } : theme
    );
    setThemes(updatedThemes);
  }

  function handleDeleteThemeName(selectedThemeId) {
    const updatedThemes = themes.filter(
      (theme) => theme.id !== selectedThemeId
    );
    setThemes(updatedThemes);
    setSelectedThemeId("t1");
  }

  function handleAddColorToTheme(newColor) {
    const updatedThemes = themes.map((theme) =>
      theme.id === selectedThemeId
        ? { ...theme, colors: [...theme.colors, newColor] }
        : theme
    );
    setThemes(updatedThemes); // persist themes including updated colors
  }

  function handleDeleteColorFromTheme(colorId) {
    const updatedThemes = themes.map((theme) =>
        theme.id === selectedThemeId
        ? { ...theme, colors: theme.colors.filter((color) =>
          color.id !== colorId)}
        : theme
    );
    setThemes(updatedThemes);
  }

  function handleEditColorInTheme(colorId, changedColor) {
    const updatedThemes = themes.map((theme) => 
        theme.id === selectedThemeId
        ? { ...theme, colors: theme.colors.map((color) =>
            colorId === color.id ? { ...color, ...changedColor } 
                                 : color 
                                ),
           }
           : theme
      );
      setThemes(updatedThemes);
  }

  function onSubmitColor(data) {
    const newColor = { id: uid(), ...data };
    handleAddColorToTheme(newColor);
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <MultipleThemes
        themes={themes}
        selectedThemeId={selectedThemeId}
        handleThemeSelect={handleThemeSelect}
        handleAddTheme={handleAddTheme}
        onEditTheme={handleEditThemeName}
        onDeleteTheme={handleDeleteThemeName}
      />
      <ColorForm onSubmitColor={onSubmitColor} buttonText={"Add color"} />
      <div className="color-container">
        {themes.length === 0 ||
        !themes.find((theme) => theme.id === selectedThemeId) ? (
          <p className="color-empty">
            No theme selected or no colors available!
          </p>
        ) : themes.find((theme) => theme.id === selectedThemeId)?.colors
            .length === 0 ? (
          <p className="color-empty">
            No colors in this theme! Add new colors please.
          </p>
        ) : (
          themes
            .find((theme) => theme.id === selectedThemeId)
            ?.colors.map((color) => (
              <Color
                key={color.id}
                color={color}
                onDelete={handleDeleteColorFromTheme}
                onEdit={handleEditColorInTheme}
              />
            ))
        )}
      </div>
    </>
  );
}

export default App;
