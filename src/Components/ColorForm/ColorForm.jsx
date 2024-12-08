import ColorInput from "../ColorInput/ColorInput";
import "./ColorForm.css";

export default function ColorForm({ onSubmitColor, initialData, buttonText }) {
  const { role, hex, contrastText } = initialData || { role: "some color", 
                                    hex: "#123456", contrastText: "#ffffff" };


  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmitColor(data);
  }

  return (
    <>
    <form className="color-form" onSubmit={handleSubmit}>
    <h2>Add a new color to your Theme</h2>
      <label htmlFor="role">
        Role
        <br />
        <input
          type="text"
          id="role"
          name="role"
          defaultValue={role}
        />
      </label>
      <br />
      <label htmlFor="hex">
        Hex
        <br />
        <ColorInput id="hex" defaultValue={hex} />
      </label>
      <br />
      <label htmlFor="contrastText">
        Contrast Text
        <br />
        <ColorInput id="contrastText" defaultValue={contrastText} />
      </label>
      <br />
      <button type="submit">{buttonText}</button>
    </form>
    </>
  );
}
