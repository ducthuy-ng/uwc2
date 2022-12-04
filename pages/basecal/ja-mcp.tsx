import type { NextPage } from "next";
import styles from "./../../styles/ja-mcp.module.css";
import { Button } from "./../../components/Button/Button";
import { Input } from "./../../components/Input/Input";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "../../lib/fetch";

const Ja_MCP: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR("/api/base-cal/ja-base/mcp", fetcher);
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
        <FirstRow name="Điểm tập kết - Mã số" id="Số ngày phân công"></FirstRow>
        {data
          ? data.map((item: AssignmentProps) => (
              <Assignment
                key={item["mcp_id"]}
                mcp_id={item["mcp_id"]}
                number_day_of_week={item["number_day_of_week"]}
                onClick={() => {
                  router.push(`/basecal/ja-mcp-detail?mcp_id=${item["mcp_id"]}`);
                }}
              />
            ))
          : null}
      </div>
    </div>
  );
};

type AssignmentProps = {
  mcp_id: string;
  number_day_of_week: number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const Assignment = (props: AssignmentProps) => {
  return (
    <div className={styles.item} onClick={props.onClick}>
      <div className={styles.item_Name}>{props.mcp_id}</div>
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
