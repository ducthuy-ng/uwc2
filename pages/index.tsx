import type { NextPage } from "next";

import styles from "./../styles/Homepage.module.css";
import { Dispatch, SetStateAction, useState } from "react";

const Home: NextPage = () => {
  const [showJATrolleyModal, setShowJATrolleyModal] = useState(false);
  const [showCOAreaModal, setShowCOAreaModal] = useState(false);

  return (
    <div className={styles.Trang_chu}>
      <h1 className={styles.Homepage_title}>TRANG CHỦ</h1>
      <div className={styles.Actions_Board}>
        <div className={styles.Column}>
          <button className={styles.button}> Phân xe đẩy - lao công</button>
          <button
            className={styles.button}
            onClick={() => {
              setShowJATrolleyModal(true);
            }}
          >
            Quản lý lịch nền - lao công
          </button>
          <button className={styles.button}> Lịch làm việc - lao công</button>
        </div>

        <div className={styles.Column}>
          <button className={styles.button}> Phân khu vực - xe rác</button>
          <button
            className={styles.button}
            onClick={() => {
              setShowCOAreaModal(true);
            }}
          >
            Quản lý lịch nền - tài xế
          </button>
          <button className={styles.button}> Lịch làm việc - tài xế</button>
        </div>
      </div>

      {showJATrolleyModal ? <AssignJATrolleyModal setShowModal={setShowJATrolleyModal} /> : null}
      {showCOAreaModal ? <AssignCOAreaModal setShowModal={setShowCOAreaModal} /> : null}
    </div>
  );
};

type ModalProps = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

function AssignJATrolleyModal(props: ModalProps) {
  return (
    <div
      className={styles.modal_background}
      onClick={() => {
        props.setShowModal(false);
      }}
    >
      <div className={styles.modal}>
        <h1 className={styles.Homepage_title}> Tìm kiếm theo </h1>
        <div className={styles.Actions_Board}>
          <div className={styles.Column}>
            <button className={styles.button}> Lao công</button>
          </div>
          <div className={styles.Column}>
            <button className={styles.button}> Điểm tập kết</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AssignCOAreaModal(props: ModalProps) {
  return (
    <div
      className={styles.modal_background}
      onClick={() => {
        props.setShowModal(false);
      }}
    >
      <div className={styles.modal}>
        <h1 className={styles.Homepage_title}> Tìm kiếm theo </h1>
        <div className={styles.Actions_Board}>
          <div className={styles.Column}>
            <button className={styles.button}> Tài xế</button>
          </div>
          <div className={styles.Column}>
            <button className={styles.button}> Khu vực</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
