import type { GetServerSidePropsContext, NextPage } from "next";
import styles from "./../../styles/ja-detail.module.css";
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
  console.log(props.ja_id);
  const router = useRouter();

  const { data, error } = useSWR("/api/basecal/ja-base", fetcher);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>QUẢN LÝ LỊCH NỀN LAO CÔNG - Chi tiết</h1>
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
          <h3>Họ và tên: </h3>
          <h3>Mã số nhân viên: 3</h3>
        </div>
        <div>
          <Button>Cập nhật</Button>
        </div>
      </div>
      <div className={styles.body}>
        <FirstRow name="Thứ trong tuần" id="Điểm tập kết"></FirstRow>
        {data
          ? data.map((item: AssignmentProps) => (
              <Assignment
                key={item["ja_id"]}
                ja_id={item["ja_id"]}
                mcp_id={item["mcp_id"]}
                day_of_week={item["day_of_week"]}
              />
            ))
          : null}
      </div>
    </div>
  );
};
type AssignmentProps = {
  ja_id: string;
  mcp_id: string;
  day_of_week: string;
};

const Assignment = (props: AssignmentProps) => {
  const [value, setValue] = useState(props.mcp_id || "");
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await formSubmit(props.ja_id, value, props.mcp_id);
      }}
      className={styles.item}
    >
      <div className={styles.item_Text}>{props.day_of_week}</div>
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

async function formSubmit(ja_id: string, value: string, mcp_id?: string) {
  if (value) {
    await fetch(`/api/base-cal/ja-base?ja_id=${ja_id}&mcp_id=${value}`, {
      method: "POST",
    });

    return;
  }

  if (mcp_id) {
    await fetch(`/api/base-cal/ja-base?ja_id=${ja_id}&mcp_id=${mcp_id}`, {
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
