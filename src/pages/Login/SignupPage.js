import { useContext, useState } from "react";
import { SourceContext } from "../../context/source.context";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


function SignupPage() {
  const {API_URL} = useContext(SourceContext);

  // name, username, email, password
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState(undefined);
    const navigate = useNavigate();
  
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
          navigate("/login");
        })
        .catch((error) => {
          const errorDescription = error.response.data.errors[0].defaultMessage;
          setErrorMessage(errorDescription);
        });
    };
  
    return (
      <div className="SignupPage">
        <h1>Sign Up</h1>
  
        <form onSubmit={handleSignupSubmit}>
            <fieldset>
                <label>Name:</label>
                <input type="text" name="name" value={name} onChange={handleName} />
            </fieldset>
            <fieldset>
                <label>Username:</label>
                <input type="text" name="username" value={username} onChange={handleUsername} />
            </fieldset>
            <fieldset>
                <label>Email:</label>
                <input type="email" name="email" value={email} onChange={handleEmail} />
            </fieldset>
            <fieldset>
                <label>Password:</label>
                <input type="password" name="password" value={password} onChange={handlePassword} /> 
            </fieldset>
          <button type="submit">Sign Up</button>
        </form>
  
        {errorMessage && <p className="error-message">{errorMessage}</p>}
  
        <p>Already have account?</p>
        <Link to={"/login"}> Login</Link>
      </div>
    );
  }

export default SignupPage;