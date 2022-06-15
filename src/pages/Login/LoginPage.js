// Modules:
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { SourceContext } from "../../context/source.context";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";

// Styles:
import styles from "./LoginPage.module.scss";
import "animate.css";

// Components:
import AllCenteredLayout from "../../components/layout/AllCenteredLayout";

function LoginPage() {
  const { API_URL } = useContext(SourceContext);
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [style, setstyle] = useState("animate__animated animate__backInUp");

  const goToSignup = () => {
    setstyle("animate__animated animate__backOutUp");
    setTimeout(() => {
      navigate("/signup");
    }, 1200);
  };

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${API_URL}/api/auth/login`, requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        setstyle("animate__animated animate__bounce");
        setTimeout(() => {
          setstyle("animate__animated animate__backOutUp");
        }, 1500);
        setTimeout(() => {
          authenticateUser();
          navigate("/home");
        }, 3000);
      })
      .catch((error) => {
        setErrorMessage("Oops, those credentials are not working!");
      });
  };

  return (
    <AllCenteredLayout>
      <div className={style}>
        <form className={styles.form} onSubmit={handleLoginSubmit}>
          <h1 className={styles.form__title}>Let's get started!</h1>
          <input
            className={styles.form__input}
            placeholder="email"
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
          />
          <input
            className={styles.form__input}
            placeholder="password"
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />
          <button className={styles.button} type="submit">
            Login
          </button>
        </form>

        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <p className={styles.changeText}>Don't have an account yet?</p>
        <button
          onClick={goToSignup}
          className={[styles.button, styles.buttonSecondary].join(" ")}
        >
          Sign Up
        </button>
      </div>
    </AllCenteredLayout>
  );
}

export default LoginPage;
