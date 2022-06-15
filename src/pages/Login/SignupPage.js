// Modules:
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { SourceContext } from "../../context/source.context";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";

// Styles:
import styles from "./LoginPage.module.scss";
import "animate.css";

// Components:
import AllCenteredLayout from "../../components/layout/AllCenteredLayout";

function SignupPage() {
  const { API_URL } = useContext(SourceContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [style, setstyle] = useState("animate__animated animate__backInUp");

  const goToLogin = () => {
    setstyle("animate__animated animate__backOutUp");
    setTimeout(() => {
      navigate("/login");
    }, 1200);
  };

  const handleName = (e) => setName(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { name, username, email, password };

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${API_URL}/api/auth/signup`, requestBody)
      .then((response) => {
        setstyle("animate__animated animate__bounce");
        setTimeout(() => {
          setstyle("animate__animated animate__backOutUp");
        }, 1500);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      })
      .catch((error) => {
        const errorDescription = error.response.data.errors[0].defaultMessage;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <AllCenteredLayout>
      <div className={style}>
        <form className={styles.form} onSubmit={handleSignupSubmit}>
          <h1 className={styles.form__title}>Join us!</h1>
          <input
            className={styles.form__input}
            placeholder="name"
            type="text"
            name="name"
            value={name}
            onChange={handleName}
          />
          <input
            className={styles.form__input}
            placeholder="username"
            type="text"
            name="username"
            value={username}
            onChange={handleUsername}
          />
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
            Sign Up
          </button>
        </form>

        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <p className={styles.changeText}>Already have account?</p>
        <button
          onClick={goToLogin}
          className={[styles.button, styles.buttonSecondary].join(" ")}
        >
          Login
        </button>
      </div>
    </AllCenteredLayout>
  );
}

export default SignupPage;
