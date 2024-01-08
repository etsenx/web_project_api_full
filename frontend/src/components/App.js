import Header from "./Header";
import Main from "./Main";
import Login from "./Login";
import Register from "./Register";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import { auth } from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import InfoToolTip from "./InfoToolTip";

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedCard, setSelectedCard] = useState();
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    

    function checkToken() {
      if (localStorage.getItem("token")) {
        const token = localStorage.getItem("token");
        auth.getUserData(token).then((res) => {
          if (res) {
            setUserData(res.data);
            setLoggedIn(true);
            api.getUserInformation().then((data) => {
              setCurrentUser(data);
            });
        
            api.getCards().then((cards) => {
              setCards(cards);
            });
            navigate("/");
          }
        });
      }
    }

    checkToken();
  }, [navigate]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((prevState) =>
        prevState.map((c) => (c._id === card._id ? newCard : c))
      );
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id);
    setCards((prevState) => prevState.filter((c) => c._id !== card._id));
  }

  function handleEditAvatarClick() {
    setisEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(!isImagePopupOpen);
  }

  function handleUpdateUser(saveButton, updatedUserData) {
    api.updateProfile(saveButton, updatedUserData).then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    });
  }

  function handleUpdateAvatar(saveButton, avatar) {
    api.updateProfilePicture(saveButton, avatar).then((newAvatar) => {
      setCurrentUser({ ...currentUser, avatar: newAvatar });
      closeAllPopups();
    });
  }

  function handleAddPlaceSubmit(saveButton, newCardData) {
    api.addCard(saveButton, newCardData).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    });
  }

  function handleLogin(email, password, submitButton) {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res.status) {
          setSuccess(false);
          setIsInfoToolTipOpen(true);
        } else if (res.token) {
          auth.getUserData(res.token).then((res) => {
            if (res) {
              setLoggedIn(true);
              setUserData(res.data);
              navigate("/");
            }
          });
        }
      })
      .finally(() => {
        if (submitButton) {
          submitButton.textContent = "Login";
        }
      });
  }

  function handleRegister(email, password, submitButton) {
    auth
      .register(email, password)
      .then((res) => {
        if (res.status) {
          setSuccess(false);
          setIsInfoToolTipOpen(true);
        } else if (res.data) {
          setSuccess(true);
          setIsInfoToolTipOpen(true);
          handleLogin(email, password);
        }
      })
      .finally(() => {
        submitButton.textContent = "Daftar";
      });
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/signin");
    setLoggedIn(false);
  }

  function closeAllPopups() {
    setisEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoToolTipOpen(false);
  }

  return (
    <div className="App">
      <div className="page">
        <Header
          loggedIn={loggedIn}
          handleLogout={handleLogout}
          userData={userData}
        />
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route path="/signin" element={<Login onSubmit={handleLogin} />} />
            <Route
              path="/signup"
              element={<Register onSubmit={handleRegister} />}
            />
            <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
              <Route
                path="/"
                element={
                  <Main
                    onEditProfileClick={handleEditProfileClick}
                    onAddPlaceClick={handleAddPlaceClick}
                    onEditAvatarClick={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    selectedCard={selectedCard}
                    onClose={closeAllPopups}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />
                }
              />
            </Route>
            <Route
              path="*"
              element={
                loggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate to="/signin" replace />
                )
              }
            />
          </Routes>
          {/* Popup for Edit Profile */}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          {/* Popup for Profile Picture */}
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          {/* Popup for Add Place */}
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlaceSubmit={handleAddPlaceSubmit}
          />

          {/* Image Popup */}
          <ImagePopup
            selectedCard={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          />

          {/* Info Tool Tip */}
          <InfoToolTip
            success={success}
            isOpen={isInfoToolTipOpen}
            onClose={closeAllPopups}
          />
        </CurrentUserContext.Provider>
        <Footer />
      </div>
    </div>
  );
}

export default App;
