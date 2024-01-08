import closeImg from "../images/close-icon.png";
import authSuccess from "../images/authsuccess.png";
import authFailed from "../images/authfailed.png";

function InfoToolTip(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""} popup-info`}>
      <div className="popup__container">
        <img src={props.success ? authSuccess : authFailed} className="popup-info__logo" alt="Success" />
        <h2 className="popup__title popup-info__title">{props.success ? "Berhasil! Kamu sekarang telah terdaftar" : "Ups! Ada yang salah. Coba lagi."}</h2>
        <button className="popup__close" type="button" onClick={props.onClose}>
          <img src={closeImg} alt="icon tutup" className="popup__close-img popup-info__close" />
        </button>
      </div>
    </div>
  );
}

export default InfoToolTip;
