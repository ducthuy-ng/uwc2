import type { NextPage } from "next";
import styles from "./../../styles/ja-mcp.module.css";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "../../lib/fetch";

const Ja_MCP: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR("/api/calendar/co-calendar", fetcher);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>LỊCH LÀM VIỆC - TÀI XẾ - THÁNG 12</h1>
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
        <FirstRow name="Họ và tên" id="MSNV"></FirstRow>
        {data
          ? data.map((item: AssignmentProps) => (
              <Assignment
                key={item["co_id"]}
                co_id={item["co_id"]}
                co_name={item["co_name"]}
                number_day_of_month={item["number_day_of_month"]}
                onClick={() => {
                  router.push(`/cal/co-detail?co_id=${item["co_id"]}`);
                }}
              />
            ))
          : null}
      </div>
    </div>
  );
};

type AssignmentProps = {
  co_id: string;
  co_name: string;
  number_day_of_month: number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const Assignment = (props: AssignmentProps) => {
  return (
    <div className={styles.item} onClick={props.onClick}>
      <div className={styles.item_Name}>{props.co_name}</div>
      <div className={styles.item_MSNV}>{props.co_id}</div>
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
