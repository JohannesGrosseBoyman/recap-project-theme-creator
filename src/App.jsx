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

  function handleAddColorToTheme(newColor) {
    const updatedThemes = themes.map((theme) =>
      theme.id === selectedThemeId
        ? { ...theme, colors: [...theme.colors, newColor] }
        : theme
    );
    setThemes(updatedThemes); // persist themes including updated colors
  }

  function handleDeleteColorFromTheme(colorId) {
    setThemes((prevThemes) =>
      prevThemes.map((theme) => {
        if (theme.id === selectedThemeId) {
          const filteredColors = theme.colors.filter((color) => {
          return color.id !== colorId;
          });
          return { ...theme, colors: filteredColors };
        }
        return theme;
      })
    );
  }

  function handleEditColorInTheme(colorId, changedColor) {
    setThemes((prevThemes) =>
      prevThemes.map((theme) => 
        theme.id === selectedThemeId
        ? {
          ...theme,
          colors: theme.colors.map((color) => 
          colorId === color.id ? { ...color, ...changedColor} : color
         )
        }
        : theme
      )
    );
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
