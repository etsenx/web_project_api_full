import closeImg from "../images/close-icon.png";

function PopupWithForm(props) {
  return (
    <div className={`popup popup-${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" name={props.name} onSubmit={props.onSubmit}>
          <fieldset className="popup__set">
            {props.children}
            <button
                name="simpan-button"
                className="popup__save"
                type="submit"
                ref={props.saveButton}
              >
                Simpan
              </button>
              <button className="popup__close" type="button" onClick={props.onClose}>
                <img
                  src={closeImg}
                  alt="icon tutup"
                  className="popup__close-img"
                />
              </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
