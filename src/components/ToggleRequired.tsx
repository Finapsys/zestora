"use client";

import React from "react";
import styles from "../styles/ToggleRequired.module.css";

interface ToggleRequiredProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleRequired: React.FC<ToggleRequiredProps> = ({
  checked,
  onChange,
}) => {
  return (
    <label className={styles.toggleSwitch}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-label="Toggle"
      />
      <span className={styles.slider}></span>
    </label>
  );
};

export default ToggleRequired;
