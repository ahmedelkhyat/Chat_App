import Sidebar from "../../components/sidebar/Sidebar";
import Chat from "../../components/chat/Chat";
import styles from "./home.module.css";

function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default Home;
