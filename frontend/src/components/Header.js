import logo from "../images/Logo.png";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Header(props) {
  const { pathname } = useLocation();
  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <img src={logo} alt="Around The US Logo" className="logo" />
      {props.loggedIn === false &&
        (pathname === "/signin" ? (
          <a href="/signup" className="header__link">
            Daftar
          </a>
        ) : (
          <a href="/signin" className="header__link">
            Login
          </a>
        ))}
      {props.loggedIn && (
        <div className="header-detail__container">
          <p className="header-detail__email">{currentUser.email}</p>
          <a
            href="/"
            className="header__link header-detail__link"
            onClick={props.handleLogout}
          >
            Keluar
          </a>
        </div>
      )}
    </header>
  );
}

export default Header;
