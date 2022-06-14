import styles from "./NewListForm.module.scss";
import { useContext, useState } from "react";
import { SourceContext } from "../../../context/source.context";
import { AuthContext } from "../../../context/auth.context";
import axios from "axios";



function NewListForm() {
    const [ listName, setListName] = useState("");
    const [ listDescription, setListDescription] = useState("");
    const handleListName = (e) => setListName(e.target.value);
    const handleListDescription = (e) => setListDescription(e.target.value);

    const { user } = useContext(AuthContext);
    console.log(user);
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
          console.log(response.data);
          console.log(response.data.id);
        })
        .catch((error) => console.log(error));        
    }

    return (
        <form className={styles.form} onSubmit={handleNewListSubmit}>
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
          <button type="submit">Save new list</button>
        </form>
    );
}

export default NewListForm;