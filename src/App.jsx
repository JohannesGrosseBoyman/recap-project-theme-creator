import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import "./App.css";
import { uid } from "uid";
import  useLocalStorageState  from "use-local-storage-state";

function App() {
 // const [colors, setColors] = useState(initialColors);
  const [colors, setColors] = useLocalStorageState("colors",  {defaultValue: initialColors} );

  function onSubmitColor(data) {
    return setColors([{ id: uid(), ...data }, ...colors]);
  }

  function handleDeleteColor(colorId) {
    const updatedColors = colors.filter((color) => color.id !== colorId);
    setColors(updatedColors);
  }

  function handleEditColor(colorId, changedColor) {
    const changedColors = colors.map((color) => 
    color.id === colorId ? { ...color, ... changedColor } : color );
    setColors(changedColors);
  }
  

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onSubmitColor={onSubmitColor} buttonText={"Add color"} />
      <div className="color-container" >
        { colors.length === 0 ? (
          <p className="color-empty" >No more Colors! Add new colors please</p>
        ) : (
          colors.map((color) => {
            return <Color key={color.id} 
                          color={color} 
                          onDelete={handleDeleteColor}
                          onEdit = {handleEditColor} />;
          })
        )

        }
      
      </div>
    </>
  );
}

export default App;
