import pencilImg from "../images/profile-edit.png";
import pencilImgLarge from "../images/pencil-large.png";
import addImg from "../images/addimg.png";
import Card from "./Card";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile-pic" onClick={props.onEditAvatarClick}>
          <img
            src={currentUser.avatar}
            alt="Profile"
            className="profile__picture"
          />
          <div className="profile-pic__content">
            <img
              src={pencilImgLarge}
              alt="edit profile pencil"
              className="profile-pic__pencil-img"
            />
          </div>
        </div>
        <div className="profile-info">
          <div className="profile-info__name-edit-container">
            <h1 className="profile-info__name">{currentUser.name}</h1>
            <button
              className="profile-info__edit-button"
              type="button"
              onClick={props.onEditProfileClick}
            >
              <img
                src={pencilImg}
                alt="edit profile pencil"
                className="profile-info__pencil-img"
              />
            </button>
          </div>
          <p className="profile-info__about">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={props.onAddPlaceClick}
        >
          <img src={addImg} alt="add" className="profile__add-img" />
        </button>
      </section>
      <section className="elements">
        {props.cards.map((cardData) => (
          <Card
            card={cardData}
            key={cardData._id}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
