import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import Swal from "sweetalert2";
import styles from "./login.module.css";

function Login() {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError(true);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Login failed! Please try again.",
      });
    }
  };

  return (
    <div className={styles["form-container"]}>
      <div className={styles["form-wrapper"]}>
        <span className={styles.logo}>Chat App</span>
        <span className={styles.title}>Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Enter your email" />
          <input type="password" placeholder="Enter your password" />
          <button>Login</button>
          {error && <span className={styles.error}>Something went wrong</span>}
        </form>
        <p>
          You don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
