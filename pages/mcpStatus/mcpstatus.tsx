import type { NextPage } from "next";
import styles from "./../../styles/ja.module.css";
import { Button } from "./../../components/Button/Button";
import { Input } from "./../../components/Input/Input";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "../../lib/fetch";

const JA: NextPage = () => {
  const router = useRouter();

  const { data } = useSWR("/api/current_cap", fetcher);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>TÌNH TRẠNG MCP</h1>
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
            <Input className={styles.optionSearch_Input} placeholder="Nhập tên MCP ..."></Input>
          </div>
          <div>
            <Button className={styles.optionSearch_Button}>Tìm kiếm</Button>
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <FirstRow name="Mã số MCP" id="Sức chứa hiện tại"></FirstRow>
        {data
          ? data.map((item: AssignmentProps) => (
              <Assignment key={item["mcp_id"]} mcp_id={item["mcp_id"]} curent_cap={item["curent_cap"]} />
            ))
          : null}
      </div>
    </div>
  );
};

type AssignmentProps = {
  mcp_id: string;
  curent_cap: string;
};

const Assignment = (props: AssignmentProps) => {
  return (
    <div className={styles.item}>
      <div className={styles.item_Name}>{props.mcp_id}</div>
      <div className={styles.item_MSNV}>{props.curent_cap}</div>
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

export default JA;
