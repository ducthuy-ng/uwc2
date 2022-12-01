import type { NextPage } from "next";
import styles from "./../../styles/co-area.module.css";
import { Button } from "./../../components/Button/Button";
import { Input } from "./../../components/Input/Input";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "../../lib/fetch";

const Ja_MCP: NextPage = () => {
  const router = useRouter();

  const { data } = useSWR("/api/base-cal/co-base", fetcher);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>QUẢN LÝ LỊCH NỀN TÀI XẾ - Khu vực</h1>
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
            <Input className={styles.optionSearch_Input} placeholder="Nhập tên tài xế ..."></Input>
          </div>
          <div>
            <Button className={styles.optionSearch_Button}>Tìm kiếm</Button>
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <FirstRow name="Họ và tên" id="MSNV"></FirstRow>
        {data
          ? data.map((item: AssignmentProps) => (
              <Assignment key={item["id"]} id={item["id"]} number_day_of_week={item["number_day_of_week"]} />
            ))
          : null}
      </div>
    </div>
  );
};

type AssignmentProps = {
  id: string;
  number_day_of_week: number;
};

const Assignment = (props: AssignmentProps) => {
  return (
    <div className={styles.item}>
      <div className={styles.item_Name}>{props.id}</div>
      <div className={styles.item_MSNV}>{props.number_day_of_week}</div>
    </div>
  );
};
type FirstRowProps = {
  name?: string;
  id?: string;
};

const FirstRow = (props: FirstRowProps) => {
  return (
    <h3 className={styles.item}>
      <div className={styles.item_Name}>{props.name}</div>
      <div className={styles.item_MSNV}>{props.id}</div>
    </h3>
  );
};

export default Ja_MCP;
