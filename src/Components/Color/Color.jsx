import  ColorForm  from "../ColorForm/ColorForm";
import  ContrastChecker  from "../ContrastChecker/ContrastChecker";
import "./Color.css";
import { useState, useEffect } from "react";

export default function Color({ color, onDelete, onEdit }) {
  const [confirm, setConfirm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [copy, setCopy] = useState("Copy");

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
    onEdit(color.id, changedColor);
    setEdit(false);
  }

  function handleCancelEdit() {
    setEdit(false);
  }

  async function handleCopyToClipboard() {
    try {
      await navigator.clipboard.writeText(color.hex);
      setCopy("Successfully Copied");
    } catch (error) {
      setCopy("copy failed");
    }
  }

  useEffect(() => {
    if (copy === "Successfully Copied") {
      const timer = setTimeout(() => {
        setCopy("Copy")
      }, 5000);

      return () => clearTimeout(timer);

    }
  }, [copy])


  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card-headline">{color.hex}</h3>
      <button onClick={handleCopyToClipboard}>{copy}</button>
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p>
      <ContrastChecker color={color} />
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
          <ColorForm
            initialData={color}
            onSubmitColor={handleChange}
            buttonText={"change color"}
          />
          <button onClick={handleCancelEdit}>Cancel</button>
        </>
      )}
    </div>
  );
}
