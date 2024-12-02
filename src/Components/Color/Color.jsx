import "./Color.css";
import { useState } from "react";

export default function Color({ color, onDelete }) {
  const [confirm, setConfirm] = useState(false);
  

  function handleDeleteColor() {
    setConfirm(true);
  }

  function confirmDelete() {
    setConfirm(false);
    onDelete(color.id);
  }

  function handleCancel() {
    setConfirm(false);
  }

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card-headline">{color.hex}</h3>
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p>

      {confirm ? (
        <div className="color-card-highlight">
          <p>Really delete?</p>
          <button onClick={confirmDelete}>DELETE</button>
          <button onClick={handleCancel}>CANCEL</button>
        </div>
      ) : (
        <button type="button" onClick={handleDeleteColor}>
          DELETE
        </button>
      )}
    </div>
  );
}
