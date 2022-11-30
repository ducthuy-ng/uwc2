import type { NextPage } from "next";
import styles from "./../styles/assignment-ja.module.css";
import { Button } from "../components/Button/Button";
import { Input } from "../components/Input/Input";
import { ReactNode } from "react";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>PHÂN XE ĐẨY - LAO CÔNG</h1>
      </div>
      <div className={styles.option}>
        <div>
          <Button>Quay lại</Button>
        </div>
        <div className={styles.optionSearch}>
          <div>
            <Input className={styles.optionSearch_Input} placeholder="Nhập tên lao công ..."></Input>
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
        <Assignment ja="Nguyễn Văn A"></Assignment>
        <Assignment ja="Nguyễn Văn B"></Assignment>
        <Assignment ja="Nguyễn Văn C"></Assignment>
        <Assignment ja="Nguyễn Văn D"></Assignment>
        <Assignment ja="Nguyễn Văn E"></Assignment>
        <Assignment ja="Nguyễn Văn F"></Assignment>
        <Assignment ja="Nguyễn Văn G"></Assignment>
      </div>
    </div>
  );
};

type AssignmentProps = {
  ja?: string;
};

const Assignment = (props: AssignmentProps) => {
  return (
    <div className={styles.item}>
      <div className={styles.item_Text}>{props.ja}</div>
      <div className={styles.item_Input}>
        <Input></Input>
      </div>
    </div>
  );
};

export default Home;
