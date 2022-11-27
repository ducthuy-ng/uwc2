import type { NextPage } from "next";
import styles from "./../styles/assignment-vehicle.module.css";
import { Button } from "../components/Button/Button";
import { Input } from "../components/Input/Input";
import { ReactNode } from "react";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Phân khu vực - xe rác</h1>
      </div>
      <div className={styles.option}>
        <div>
          <Button>Quay lại</Button>
        </div>
        <div className={styles.optionSearch}>
          <div>
            <Input className={styles.optionSearch_Input} placeholder="Nhập tên khu vực ..."></Input>
          </div>
          <div>
            <Button className={styles.optionSearch_Button}>Tìm kiếm</Button>
          </div>
        </div>
        <div>
          <Button>Lọc</Button>
        </div>
      </div>
      <div className={styles.body}>
        <Assignment area="Phường P1, Quận Q1"></Assignment>
        <Assignment area="Phường P2, Quận Q1"></Assignment>
        <Assignment area="Phường P3, Quận Q1"></Assignment>
        <Assignment area="Phường P4, Quận Q1"></Assignment>
        <Assignment area="Phường P1, Quận Q2"></Assignment>
        <Assignment area="Phường P2, Quận Q2"></Assignment>
        <Assignment area="Phường P1, Quận Q3"></Assignment>
      </div>
    </div>
  );
};

type AssignmentProps = {
  area?: string;
};

const Assignment = (props: AssignmentProps) => {
  return (
    <div className={styles.item}>
      <div className={styles.item_Text}>{props.area}</div>
      <div className={styles.item_Input}>
        <Input></Input>
      </div>
    </div>
  );
};

export default Home;
