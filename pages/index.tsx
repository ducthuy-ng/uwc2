import type { NextPage } from "next";

import styles from "./../styles/Homepage.module.css"

const Home: NextPage = () => {
  return (
    <div className={styles.Trang_chu}>
      <div> 
        <h1 className={styles.Homepage_title}>TRANG CHỦ</h1>
      </div>
      <div className={styles.Actions_Board}>
        <div className={styles.Column}>
          <button className={styles.button}> Phân xe đẩy - lao công</button>
          <button className={styles.button}> Quản lý lịch nền - lao công</button>
          <button className={styles.button}> Lịch làm việc - lao công</button>
        </div>

        <div className={styles.Column}>
          <button className={styles.button}> Phân khu vực - xe rác</button>
          <button className={styles.button}> Quản lý lịch nền - tài xế</button>
          <button className={styles.button}> Lịch làm việc - tài xế</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
