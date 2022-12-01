import type { NextPage } from "next";
import styles from "./../../styles/ja-mcp.module.css";
import { Button } from "./../../components/Button/Button";
import { Input } from "./../../components/Input/Input";
import { useRouter } from "next/router";

const Ja_MCP: NextPage = (props: AssignmentProps) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>QUẢN LÝ LỊCH NỀN LAO CÔNG - điểm tập kết</h1>
      </div>
      <div className={styles.option}>
        <div>
          <Button
            onClick={() => {
              router.push("/basecal/ja");
            }}
          >
            Quay lại
          </Button>
        </div>
        <div className={styles.optionSearch}>
          <div>
            <Input className={styles.optionSearch_Input} placeholder="Nhập tên điểm tập kết ..."></Input>
          </div>
          <div>
            <Button className={styles.optionSearch_Button}>Tìm kiếm</Button>
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <h3>
          <Assignment name="Điểm tập kết - Mã số" id="Số ngày đã phân công"></Assignment>
        </h3>
        <Assignment name="1" id="5/7"></Assignment>
        <Assignment name="2" id="0/7"></Assignment>
        <Assignment name="3" id="1/7"></Assignment>
        <Assignment name="4" id="7/7"></Assignment>
        <Assignment name="5" id="3/7"></Assignment>
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
