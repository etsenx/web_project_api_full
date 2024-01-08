import { createRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatar = createRef();
  const saveButton = createRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(saveButton, {
      avatar: avatar.current.value,
    });
    saveButton.current.textContent = "Menyimpan...";
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Ubah foto profil"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      saveButton={saveButton}
    >
      <label className="popup__field">
        <input
          type="url"
          className="popup__input popup-prof-pic__input"
          id="profpic-input-url"
          ref={avatar}
          required
        />
        <span className="profpic-input-url-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
