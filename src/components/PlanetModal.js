
import React from "react";
import styles from "./PlanetModal.module.css";

const PlanetModal = ({ setIsOpen, planetDetails }) => {
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>{planetDetails && planetDetails.name}</h5>
          </div>
          {planetDetails && <div className={styles.modalContent}>
            Diameter: <b>{planetDetails.diameter}</b><br />
            Climate: <b>{planetDetails.climate}</b><br />
            Population: <b>{planetDetails.population}</b><br />
            
          </div>}
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button
                className="brn btn-sm btn-danger"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlanetModal;
