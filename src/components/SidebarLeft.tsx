import React from "react";
import styles from "../styles/Sidebar.module.css";

interface SidebarLeftProps {
  onAdd: (type: "text") => void;
}

const SidebarLeft: React.FC<SidebarLeftProps> = ({ onAdd }) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarItem} onClick={() => onAdd("text")}>
        Text Input
      </div>
    </div>
  );
};

export default SidebarLeft;
