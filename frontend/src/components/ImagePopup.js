import closeImg from "../images/close-icon.png";

function ImagePopup(props) {
  return (
    // <!-- Image Popup when Clicked -->
    <div className={`popup popup-img ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup-img__container">
        <img
          className="popup-img__img"
          src={props.isOpen ? props.selectedCard.link : 'none'}
          alt={props.isOpen ? props.selectedCard.name : 'none'}
        />
        <p className="popup-img__name">{props.isOpen && props.selectedCard.name}</p>
        <button className="popup__close" type="button" onClick={props.onClose}>
          <img
            src={closeImg}
            alt="icon tutup"
            className="popup__close-img popup-img__close-img"
          />
        </button>
      </div>
    </div>
  );
}

export default ImagePopup;
