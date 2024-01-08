import logo from "../images/Logo.png";
import { useLocation } from "react-router-dom";

function Header(props) {
  const { pathname } = useLocation();

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
          <p className="header-detail__email">{props.userData.email}</p>
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
