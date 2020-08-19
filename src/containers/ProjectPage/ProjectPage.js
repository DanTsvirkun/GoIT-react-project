import React, { useState, useEffect } from "react";
import ProjectSidebar from "../../components/ProjectSidebar/ProjectSidebar";
import SingleSprint from "../../components/SingleSprint/SingleSprint";
import CreatingSprint from "../../components/CreatingSprint/CreatingSprint";
import SprintCreationModal from "../../components/SprintCreationModal/SprintCreationModal";
import { getSprints } from "../../redux/actions/sprintActions";
import { itemsSelector } from "../../redux/selectors/SprintsSelector";
import { connect } from "react-redux";
import styles from "./ProjectPage.module.css";
import { getSprintsOperation } from "../../redux/operations/SprintOperation";
import MembersCreationModal from "../../components/MembersModal/MembersModal";

const ProjectPage = ({ sprints = [], getSprints }) => {
  const [modal, setModal] = useState(false);
  const [membersModal, setMembersModal] = useState(false);

  const modalToggle = () => {
    setModal((state) => !state);
  };

  const membersModalToggle = () => {
    setMembersModal((state) => !state);
  };

  useEffect(() => {
    getSprints();
  }, []);

  return (
    <>
      <div className={styles.page_wrapper}>
        <ProjectSidebar />
        <CreatingSprint />
        <div className={styles.projectWrapper}>
          <div className={styles.project__header__wrapper}>
            <div
              className={`${styles.project__button__wrapper} ${styles.project__wrapper}`}
            >
              <h1 className={styles.project__header}>Project 1</h1>
              <button
                className={`${styles.button} ${styles.button__pencil}`}
              ></button>
            </div>
            <div className={styles.plusBtnWrapper}>
              <div
                className={`${styles.project__button__wrapper} ${styles.project__wrapper}`}
              >
                <button
                  className={`${styles.button} ${styles.button__plus}`}
                  onClick={modalToggle}
                ></button>
                <p className={styles.sprint_text}>Створити спринт</p>
              </div>
              <div
                className={`${styles.project__button__wrapper} ${styles.project__wrapper}`}
              >
                <button
                  className={`${styles.button} ${styles.button__plus}`}
                  onClick={membersModalToggle}
                ></button>
                <p className={styles.sprint_text}>Додати людей</p>
              </div>
            </div>
          </div>
          <div className={styles.project__info}></div>
          <ul className={styles.sprints_container}>
            {sprints.map((sprint) => (
              <SingleSprint key={sprint.id} id={sprint.id} sprint={sprint} />
            ))}
          </ul>
          <SprintCreationModal status={modal} onClose={modalToggle} />
          <MembersCreationModal
            status={membersModal}
            onClose={membersModalToggle}
          />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    sprints: itemsSelector(state),
  };
};

const mapDispatchToProps = {
  getSprints: getSprintsOperation,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);
