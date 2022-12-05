import type { NextPage } from "next";

import styles from "./../styles/Homepage.module.css";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();

  const [showJATrolleyModal, setShowJATrolleyModal] = useState(false);
  const [showCOAreaModal, setShowCOAreaModal] = useState(false);

  return (
    <div className={styles.Trang_chu}>
      <h1 className={styles.Homepage_title}>TRANG CHỦ</h1>
      <div className={styles.Actions_Board}>
        <div className={styles.Column}>
          <button
            onClick={() => {
              router.push("/assignment/ja-trolley");
            }}
            className={styles.button}
          >
            {" "}
            Phân xe đẩy - lao công
          </button>
          <button
            className={styles.button}
            onClick={() => {
              setShowJATrolleyModal(true);
            }}
          >
            Quản lý lịch nền - lao công
          </button>
          <button
            onClick={() => {
              router.push("/cal/ja");
            }}
            className={styles.button}
          >
            {" "}
            Lịch làm việc - lao công
          </button>
          <button
            onClick={() => {
              router.push("/");
            }}
            className={styles.button}
          >
            Xếp lịch
          </button>
        </div>

        <div className={styles.Column}>
          <button
            onClick={() => {
              router.push("/assignment/area-vehicle");
            }}
            className={styles.button}
          >
            Phân khu vực - xe rác
          </button>
          <button
            className={styles.button}
            onClick={() => {
              setShowCOAreaModal(true);
            }}
          >
            Quản lý lịch nền - tài xế
          </button>
          <button
            onClick={() => {
              router.push("/cal/co");
            }}
            className={styles.button}
          >
            Lịch làm việc - tài xế
          </button>
          <button
            onClick={() => {
              router.push("/");
            }}
            className={styles.button}
          >
            Tình trạng MCP
          </button>
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
  const router = useRouter();
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
            <button
              onClick={() => {
                router.push("/basecal/ja");
              }}
              className={styles.button}
            >
              {" "}
              Lao công
            </button>
          </div>
          <div className={styles.Column}>
            <button
              onClick={() => {
                router.push("/basecal/ja-mcp");
              }}
              className={styles.button}
            >
              {" "}
              Điểm tập kết
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AssignCOAreaModal(props: ModalProps) {
  const router = useRouter();
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
            <button
              onClick={() => {
                router.push("/basecal/co");
              }}
              className={styles.button}
            >
              {" "}
              Tài xế
            </button>
          </div>
          <div className={styles.Column}>
            <button
              onClick={() => {
                router.push("/basecal/co-area");
              }}
              className={styles.button}
            >
              {" "}
              Khu vực
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
