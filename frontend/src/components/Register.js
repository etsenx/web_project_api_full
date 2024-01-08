import { useRef, useState } from "react";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitButton = useRef();

  function handleChange(e) {
    e.preventDefault();
    e.target.name === "email"
      ? setEmail(e.target.value)
      : setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    submitButton.current.textContent = "Loading...";
    props.onSubmit(email, password, submitButton.current);
  }

  return (
    <section className="login">
      <h1 className="login__heading">Daftar</h1>
      <form onSubmit={handleSubmit}>
        <label className="login__field">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="login__input"
            value={email}
            onChange={handleChange}
            required
          />
        </label>
        <label className="login__field">
          <input
            type="password"
            name="password"
            placeholder="Kata Sandi"
            className="login__input"
            value={password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" className="login__submit" ref={submitButton}>
          Daftar
        </button>
        <a href="/signin" className="login__link">
          Sudah daftar? Masuk di sini!
        </a>
      </form>
    </section>
  );
}

export default Register;
