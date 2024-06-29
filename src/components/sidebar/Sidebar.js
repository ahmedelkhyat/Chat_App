import Navbar from "../../components/navbar/Navbar";
import Search from "../../components/search/Search";
import Chats from "../../components/chats/Chats";
import styles from "./sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
}

export default Sidebar;
