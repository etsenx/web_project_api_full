import { createRef, useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);
  const saveButton = createRef();

  useEffect(() => {
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
  }, [currentUser]);

  function handleChange(e) {
    e.preventDefault();
    e.target.name === "name"
      ? setName(e.target.value)
      : setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const updatedUserData = {
      name,
      about: description,
    };
    props.onUpdateUser(saveButton, updatedUserData);
    saveButton.current.textContent = "Menyimpan...";
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Edit Profil"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      saveButton={saveButton}
    >
      <label className="popup__field">
        <input
          name="name"
          id="name-input"
          type="text"
          className="popup__input popup__input-name"
          placeholder="Nama"
          required
          minLength="2"
          maxLength="400"
          value={name}
          onChange={handleChange}
        />
        <span className="name-input-error"></span>
      </label>
      <label className="popup__field">
        <input
          name="description"
          id="about-input"
          type="text"
          className="popup__input popup__input-about"
          placeholder="Tentang Diriku"
          required
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleChange}
        />
        <span className="about-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
