import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import "./App.css";
import { useState } from "react";
import { uid } from "uid";

function App() {
  const [colors, setColors] = useState(initialColors);
  console.log("colors: ", colors);

  function onSubmitColor(data) {
    return setColors([{ id: uid(), ...data }, ...colors]);
  }

  function handleDeleteColor(colorId) {
    const updatedColors = colors.filter((color) => color.id !== colorId);
    setColors(updatedColors);
  }
  

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onSubmitColor={onSubmitColor} />
      <div className="color-container" >
        { colors.length === 0 ? (
          <p className="color-empty" >No more Colors! Add new colors please</p>
        ) : (
          colors.map((color) => {
            return <Color key={color.id} color={color} onDelete={handleDeleteColor} />;
          })
        )

        }
      
      </div>
    </>
  );
}

export default App;
