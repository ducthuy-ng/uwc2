import type { NextPage } from "next";
import styles from "./../../styles/ja-mcp.module.css";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { useRouter } from "next/router";

const Ja_MCP: NextPage = (props: AssignmentProps) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>QUẢN LÝ LỊCH NỀN - TÀI XẾ - THÁNG 12</h1>
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
        <Assignment name="1. Nguyễn Văn A" id="1"></Assignment>
        <Assignment name="2. Nguyễn Văn B" id="2"></Assignment>
        <Assignment name="3. Nguyễn Văn C" id="3"></Assignment>
        <Assignment name="4. Nguyễn Văn D" id="4"></Assignment>
        <Assignment name="5. Nguyễn Văn E" id="5"></Assignment>
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

export default Ja_MCP;
