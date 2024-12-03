import ColorForm from "../ColorForm/ColorForm";
import "./Color.css";
import { useState } from "react";

export default function Color({ color, onDelete, onEdit }) {
  const [confirm, setConfirm] = useState(false);
  const [edit, setEdit] = useState(false);

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

  function handleEditColor() {
    setEdit(true);
  }

  function handleChange(changedColor) {
    //console.log("changedColor: ", changedColor);
    //console.log("colorId: ", color.id)
    onEdit(color.id, changedColor);
    setEdit(false); 
  }

  function handleCancelEdit() {
    setEdit(false);
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
        <>
        <button type="button" onClick={handleDeleteColor}>
          DELETE
        </button>
         <button type="button" onClick={handleEditColor}>
         Edit
       </button>
       </>
      )}

      {edit && (
        <>
        <ColorForm initialData={color} onSubmitColor={handleChange}
                   buttonText={"change color"} />
        <button onClick={handleCancelEdit}>Cancel</button>
        </>
      )}
    </div>
  );
}
