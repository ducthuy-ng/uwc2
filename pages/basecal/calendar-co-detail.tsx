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
              router.push("/basecal/calendar-co");
            }}
          >
            Quay lại
          </Button>
        </div>
        
        <div className={styles.Show_Details}>
          <h3>Họ và tên: Nguyễn Văn A</h3>
          <h3>MSNV: 3</h3>
        </div>

        <div className={styles.optionSearch}>
          <div>
            <Button className={styles.optionSearch_Button}>Cập Nhập</Button>
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <h3>
          <Assignment name="Ngày" id="Điểm tập kết"></Assignment>
        </h3>
        <Element name = "Thứ 2"></Element>
        <Element name = "Thứ 3"></Element>
        <Element name = "Thứ 4"></Element>
        <Element name = "Thứ 5"></Element>
        <Element name = "Thứ 6"></Element>
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

type ElementProps = {
  name?: string;
};

const Element = (props: ElementProps) => {
  return (
    <div className={styles.item}>
      <div className={styles.item_Name}>{props.name}</div>
      <Input className={styles.optionSearch_Input} placeholder="Mã số..."></Input>
    </div>
  );
};

export default Ja_MCP;
