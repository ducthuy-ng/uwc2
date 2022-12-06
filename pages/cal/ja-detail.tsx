import type { GetServerSidePropsContext, NextPage } from "next";
import styles from "./../../styles/ja-mcp.module.css";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { useState } from "react";
import { fetcher } from "../../lib/fetch";
import useSWR from "swr";
import { useRouter } from "next/router";

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  if (!context.query["ja_id"])
    return {
      redirect: {
        destination: "/",
      },
    };

  return {
    props: {
      ja_id: context.query["ja_id"],
    },
  };
};

const Home: NextPage<{ ja_id: string }> = (props: { ja_id: string }) => {
  const router = useRouter();

  let today = new Date();
  today.setMonth(today.getMonth() + 1);

  const { data, error } = useSWR(
    `/api/calendar/get-ja-calendar?ja_id=${props.ja_id}&month=${today.getMonth() + 1}&year=${today.getFullYear()}`,
    fetcher
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>LỊCH LÀM VIỆC - LAO CÔNG - Tháng {today.getMonth() + 1}</h1>
      </div>
      <div className={styles.option}>
        <div>
          <Button
            onClick={() => {
              router.push("/cal/ja");
            }}
          >
            Quay lại
          </Button>
        </div>
        <div className={styles.optionSearch}>
          <h3>Họ và tên: </h3>
          <h3>Mã số nhân viên: {props.ja_id}</h3>
        </div>
        <div>
          <Button>Cập nhật</Button>
        </div>
      </div>
      <div className={styles.body}>
        <FirstRow name="Ngày" id="Điểm tập kết"></FirstRow>
        {data
          ? data.map((item: AssignmentProps) => (
              <Assignment key={props.ja_id} ja_id={props.ja_id} mcp_id={item["mcp_id"]} day={item["day"]} />
            ))
          : null}
      </div>
    </div>
  );
};
type AssignmentProps = {
  ja_id: string;
  mcp_id: string;
  day: string;
};

const Assignment = (props: AssignmentProps) => {
  const [value, setValue] = useState(props.mcp_id || "");
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await formSubmit(props.ja_id, value, props.mcp_id, props.day);
      }}
      className={styles.item}
    >
      <div className={styles.item_Text}>{props.day}</div>
      <div className={styles.item_Input}>
        <Input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        ></Input>
      </div>
      <input type="submit" hidden></input>
    </form>
  );
};

async function formSubmit(ja_id: string, value: string, mcp_id?: string, day?: string) {
  if (value) {
    await fetch(`/api/calendar/ja-calendar?ja_id=${ja_id}&mcp_id=${value}&day=${day}`, {
      method: "POST",
    });

    return;
  }

  if (mcp_id) {
    await fetch(`/api/calendar/ja-calendar?ja_id=${ja_id}&mcp_id=${mcp_id}&day=${day}`, {
      method: "DELETE",
    });
  }
}

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

export default Home;
