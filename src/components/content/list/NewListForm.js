import styles from "./NewListForm.module.scss";
import { useContext, useState } from "react";
import { SourceContext } from "../../../context/source.context";
import { AuthContext } from "../../../context/auth.context";
import axios from "axios";



function NewListForm({ handleCreated }) {

    const [ listName, setListName] = useState("");
    const [ listDescription, setListDescription] = useState("");
    const [ errorMessage, setErrorMessage] = useState("");
    const handleListName = (e) => setListName(e.target.value);
    const handleListDescription = (e) => setListDescription(e.target.value);

    const { user } = useContext(AuthContext);
    const {API_URL} = useContext(SourceContext);

    const handleNewListSubmit = (e) => {
      e.preventDefault();
      // Build newListDTO object:
      const requestBody = {
          name: listName,
          description: listDescription,
          ownerId: user.id,
      };
      // Get the token from the localStorage
      const storedToken = localStorage.getItem("authToken");
      // Send the token through the request "Authorization" Headers
      axios
        .post(`${API_URL}/api/lists/new`, requestBody, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          handleCreated(prevState => {return prevState.updates +1});
          setListName("");
          setListDescription("");
          setErrorMessage("");
        })
        .catch((error) => {
          console.log(error)
          setErrorMessage(error.response.data.message);
          setListName("");
          setListDescription("");
        });        
    }

    return (
      <>
        <h2 className={styles.title}>Create a new WatchList</h2>

        <form className={styles.form} onSubmit={handleNewListSubmit}>
          <svg className={styles.form__icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
            <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
            <line x1="12" y1="11" x2="12" y2="17" />
            <line x1="9" y1="14" x2="15" y2="14" />
          </svg>

          <input 
              className={styles.form__input} 
              placeholder="List name"
              type="text"
              name="name"
              value={listName}
              onChange={handleListName}
          />
          <input 
              className={styles.form__input} 
              placeholder="List description"
              type="text"
              name="description"
              value={listDescription}
              onChange={handleListDescription}
          />

          <button className={styles.form__button} type="submit">Save new list</button>
        </form>
        {errorMessage !== "" && <p className={styles.messageText}>{errorMessage}</p>}
      </>

    );
}

export default NewListForm;