import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import cam from "../../images/cam.png";
import add from "../../images/add.png";
import more from "../../images/more.png";
import Messages from "../messages/Messages";
import Input from "../../components/input/Input";
import styles from "./chat.module.css";

function Chat() {
  const { data } = useContext(ChatContext);

  return (
    <div className={styles.chat}>
      <div className={styles["chat-info"]}>
        <span>{data.user?.displayName}</span>
        <div className={styles["chat-icons"]}>
          <img src={cam} alt="Cam Icon" />
          <img src={add} alt="Add Icon" />
          <img src={more} alt="More Icon" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}

export default Chat;
