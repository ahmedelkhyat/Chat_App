import { useState, useContext } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import styles from "./search.module.css";

function Search() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    if (username.trim() === "") {
      setUser(null);
      setError(false);
      return;
    }

    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setUser(null);
        setError(true);
      } else {
        setError(false);
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      }
    } catch (error) {
      setError(true);
    }
  };

  const handleKey = (event) => {
    event.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const response = await getDoc(doc(db, "chats", combinedId));

      if (!response.exists()) {
        // Create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        // Create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error("Error occurred while handling selection:", error);
    }
    setUsername("");
    setUser(null);
  };

  return (
    <div className={styles.search}>
      <div className={styles["search-form"]}>
        <input
          type="text"
          placeholder="Find a user"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          onKeyDown={handleKey}
        />
      </div>
      {error && <span className={styles.error}>User not found!</span>}
      {user && (
        <div className={styles["user-chat"]} onClick={handleSelect}>
          <img src={user.photoURL} alt="User" />
          <div className={styles["user-chat-info"]}>
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
