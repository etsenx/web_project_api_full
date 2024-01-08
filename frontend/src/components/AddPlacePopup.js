import { createRef, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const saveButton = createRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlaceSubmit(saveButton ,{
      name,
      link
    });
    saveButton.current.textContent = "Menyimpan...";
  }

  function handleChange(e) {
    e.preventDefault();
    e.target.name === "title"
      ? setName(e.target.value)
      : setLink(e.target.value);
  }
  return (
    <PopupWithForm
      name="add-place"
      title="Tempat Baru"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      saveButton={saveButton}
    >
      <label className="popup__field">
        <input
          name="title"
          id="title-input"
          type="text"
          className="popup__input popup__input-title"
          placeholder="Judul:"
          required
          aria-invalid="true"
          minLength="2"
          maxLength="30"
          value={name}
          onChange={handleChange}
        />
        <span className="title-input-error"></span>
      </label>
      <label className="popup__field">
        <input
          name="link"
          id="url-input"
          type="url"
          className="popup__input popup__input-url"
          placeholder="URL Gambar"
          required
          value={link}
          onChange={handleChange}
        />
        <span className="url-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
