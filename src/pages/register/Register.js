import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { auth, storage, db } from "../../firebase";
import Swal from "sweetalert2";
import addAvatar from "../../images/addAvatar.png";
import styles from "./register.module.css";

function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const displayName = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    const file = event.target[3].files[0];

    try {
      // Create user
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            // Update Profile
            await updateProfile(response.user, {
              displayName,
              photoURL: downloadURL,
            });
            // Create user on firestore
            await setDoc(doc(db, "users", response.user.uid), {
              uid: response.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            // Create empty user on chats on firestore
            await setDoc(doc(db, "userChats", response.user.uid), {});
            navigate("/");
          } catch (error) {
            setLoading(false);
            setError(true);
          }
        });
      });
    } catch (error) {
      setLoading(false);
      setError(true);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Registration failed! Please try again.",
      });
    }
  };

  return (
    <div className={styles["form-container"]}>
      <div className={styles["form-wrapper"]}>
        <span className={styles.logo}>Chat App</span>
        <span className={styles.title}>Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter your name" required />
          <input type="email" placeholder="Enter your email" required />
          <input type="password" placeholder="Enter your password" required />
          <input type="file" id="file" required />
          <label htmlFor="file">
            <img src={addAvatar} alt="Add Avatar" />
            <span>Add an avatar</span>
          </label>
          <button disabled={loading}>Register</button>
          {loading && (
            <span className={styles.loading}>
              Uploading and compressing the image please wait...
            </span>
          )}
          {error && <span className={styles.error}>Something went wrong</span>}
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
