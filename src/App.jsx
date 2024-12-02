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
  

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onSubmitColor={onSubmitColor} />

      {colors.map((color) => {
        return <Color key={color.id} color={color} />;
      })}
    </>
  );
}

export default App;
