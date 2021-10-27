import React, { useEffect } from "react";
import PropTypes from "prop-types";
import s from "./Modal.module.css";

const Modal = ({ onToggleModal, largeImageURL }) => {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onToggleModal();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onToggleModal();
    }
  };

  return (
    <>
      <div className={s.Overlay} onClick={handleBackdropClick}>
        <div className={s.Modal}>
          <img src={largeImageURL} alt="" />
        </div>
      </div>
    </>
  );
};

Modal.propTypes = {
  onToggleModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default Modal;
