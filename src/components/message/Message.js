import { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import styles from "./message.module.css";

function Message({ message }) {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      className={`${styles.message} ${
        message.senderId === currentUser.uid && styles.owner
      }`}
      ref={ref}
    >
      <div className={styles["message-info"]}>
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt="User Avatar"
        />
        <span>Just now</span>
      </div>
      <div className={styles["message-content"]}>
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="Message" />}
      </div>
    </div>
  );
}

export default Message;
