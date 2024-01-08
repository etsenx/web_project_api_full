import trashImg from "../images/trash-solid.svg";
import likeImg from "../images/like.svg";
import likeImgFilled from "../images/like(filled).svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const card = props.card;

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  function handleClick() {
    props.onCardClick(card);
  }
  function handleLikeClick() {
    props.onCardLike(card);
  }
  function handleDeleteClick() {
    props.onCardDelete(card);
  }
  return (
    <article className="element">
      <form>
        <div style={{ position: "relative" }}>
          <img
            className="element__image"
            alt="card"
            src={card.link}
            onClick={handleClick}
          />
          <button
            type="button"
            className="element__delete-button"
            style={{ display: isOwn ? "" : "none" }}
            onClick={handleDeleteClick}
          >
            <img
              src={trashImg}
              alt="trash icon"
              className="element__trash-image"
            />
          </button>
        </div>
        <div className="element__description">
          <h2 className="element__title">{card.name}</h2>
          <div className="element__like-container">
            <button
              type="button"
              className="element__like-button"
              onClick={handleLikeClick}
            >
              <img
                src={isLiked ? likeImgFilled : likeImg}
                alt="Tombol Like"
                className="element__like-img"
              />
            </button>
            <span className="element__like-counter">{card.likes.length}</span>
          </div>
        </div>
      </form>
    </article>
  );
}

export default Card;
