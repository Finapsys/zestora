"use client";
import React from "react";
import styles from "../styles/PopupModal.module.css";

interface PopupModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  input?: boolean;
  defaultValue?: string;
  onClose: () => void;
  onConfirm: (value?: string) => void;
}

const PopupModal: React.FC<PopupModalProps> = ({
  isOpen,
  title,
  message,
  input = false,
  defaultValue = "",
  onClose,
  onConfirm,
}) => {
  const [value, setValue] = React.useState(defaultValue);

  React.useEffect(() => {
    if (isOpen) setValue(defaultValue);
  }, [isOpen, defaultValue]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {title && <h2 className={styles.title}>{title}</h2>}
        {message && <p className={styles.message}>{message}</p>}

        {input && (
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={styles.input}
            placeholder="Enter value..."
          />
        )}

        <div className={styles.actions}>
          <button type="button" onClick={onClose} className={styles.cancel}>
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm(value);
              onClose();
            }}
            className={styles.confirm}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
