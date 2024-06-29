import { useState, useContext, useEffect } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { ChatContext } from "../../context/ChatContext";
import Message from "../../components/message/Message";
import styles from "./messages.module.css";

function Messages() {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unsub();
    };
  }, [data.chatId]);

  return (
    <div className={styles.messages}>
      {messages.map((message) => (
        <Message message={message} key={message.id} />
      ))}
    </div>
  );
}

export default Messages;
