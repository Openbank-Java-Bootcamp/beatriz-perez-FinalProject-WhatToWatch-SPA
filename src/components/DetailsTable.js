// Modules:
import { Link } from "react-router-dom";

// Styles:
import styles from "./DetailsTable.module.scss";

// Images:
import defaultUser from "../images/default-user-image.png";

function DetailsTable({ rows, type, showEdit, task, userId, isOwner }) {
  return (
    <>
      {rows.map((r) => (
        <div key={r.id} className={styles.row}>
          {/* ---- LINK ------------------------------------- */}
          {/* ----------------------------------------------- */}
          <Link
            key={r.id}
            className={styles.rowLink}
            to={type === "item" ? `/watchitem/${r.id}` : `/users/${r.id}`}
          >
            {/* ---- image ------------------------------------- */}
            <img
              className={styles.image}
              src={r.image || r.imageUrl || defaultUser}
              alt={`${r.title || r.username} poster`}
            />
            {/* ---- title ------------------------------------- */}
            <div className={styles.textBox}>
              <h3 className={styles.title}>{r.title || r.username}</h3>
              {type === "item" ? (
                <p>
                  watched:{" "}
                  <strong>
                    {r.watchers.length === 0
                      ? "NO"
                      : r.watchers.filter((u) => u.id === userId).length > 0
                      ? "YES"
                      : "NO"}
                  </strong>
                </p>
              ) : (
                <p>{r.name}</p>
              )}
            </div>
          </Link>
          {/* ---- REMOVE BUTTON ---------------------------- */}
          {/* ----------------------------------------------- */}
          {showEdit &&
            isOwner &&
            (type === "item" ? (
              <svg
                className={styles.rowRemoveIcon}
                onClick={() => {
                  task(r.id);
                }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="9" />
                <line x1="9" y1="12" x2="15" y2="12" />
              </svg>
            ) : r.id === userId ? (
              <></>
            ) : (
              <svg
                className={styles.rowRemoveIcon}
                onClick={() => {
                  task(r.id);
                }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="9" />
                <line x1="9" y1="12" x2="15" y2="12" />
              </svg>
            ))}
          {!isOwner &&
            (type === "item" ? (
              <></>
            ) : r.id === userId ? (
              <svg
                className={styles.rowRemoveIcon}
                onClick={() => {
                  task(r.id);
                }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="9" />
                <line x1="9" y1="12" x2="15" y2="12" />
              </svg>
            ) : (
              <></>
            ))}
        </div>
      ))}
    </>
  );
}

export default DetailsTable;
