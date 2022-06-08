import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

const API_URL = "http://localhost:5005";

function LoginPage() {

    // email, password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState(undefined);
    const navigate = useNavigate();
  
    const { storeToken, authenticateUser } = useContext(AuthContext);
  
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
  
    const handleLoginSubmit = (e) => {
      e.preventDefault();
      const requestBody = { email, password };
  
      axios
        .post(`${API_URL}/api/auth/login`, requestBody)
        .then((response) => {
          // Request to the server's endpoint `/auth/login` returns a response
          // with the JWT string ->  response.data.authToken
          console.log("JWT token", response.data.authToken);
  
          storeToken(response.data.authToken);
          authenticateUser();
          navigate("/home");
        })
        .catch((error) => {
          const errorDescription = error.response.data.errors[0].defaultMessage;
          setErrorMessage(errorDescription);
        });
    };
  
    return (
      <div className="LoginPage">
        <h1>Login</h1>
  
        <form onSubmit={handleLoginSubmit}>
          <label>Email:</label>
          <input type="email" name="email" value={email} onChange={handleEmail} />
  
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />
  
          <button type="submit">Login</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
  
        <p>Don't have an account yet?</p>
        <Link to={"/signup"}> Sign Up</Link>
      </div>
    );
  }

export default LoginPage;