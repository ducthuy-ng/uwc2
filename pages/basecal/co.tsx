import type { NextPage } from "next";
import styles from "./../../styles/ja.module.css";
import { Button } from "./../../components/Button/Button";
import { Input } from "./../../components/Input/Input";
import { useRouter } from "next/router";

const JA: NextPage = (props: AssignmentProps) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>QUẢN LÝ LỊCH NỀN TÀI XẾ - Tài xế</h1>
      </div>
      <div className={styles.option}>
        <div>
          <Button
            onClick={() => {
              router.push("/");
            }}
          >
            Quay lại
          </Button>
        </div>
        <div className={styles.optionSearch}>
          <div>
            <Input className={styles.optionSearch_Input} placeholder="Nhập tên tài xế ..."></Input>
          </div>
          <div>
            <Button className={styles.optionSearch_Button}>Tìm kiếm</Button>
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <h3>
          <Assignment name="Họ và tên" id="MSNV"></Assignment>
        </h3>
        <Assignment name="Nguyễn Văn A" id="5/7"></Assignment>
        <Assignment name="Nguyễn Văn B" id="0/7"></Assignment>
        <Assignment name="Nguyễn Văn C" id="1/7"></Assignment>
        <Assignment name="Nguyễn Văn D" id="7/7"></Assignment>
        <Assignment name="Nguyễn Văn E" id="3/7"></Assignment>
      </div>
    </div>
  );
};

type AssignmentProps = {
  name?: string;
  id?: string;
};

const Assignment = (props: AssignmentProps) => {
  return (
    <div className={styles.item}>
      <div className={styles.item_Name}>{props.name}</div>
      <div className={styles.item_MSNV}>{props.id}</div>
    </div>
  );
};

export default JA;
