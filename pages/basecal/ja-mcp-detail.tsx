import type { GetServerSidePropsContext, NextPage } from "next";
import styles from "./../../styles/ja-detail.module.css";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { useState } from "react";
import { fetcher } from "../../lib/fetch";
import useSWR from "swr";
import { useRouter } from "next/router";

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  if (!context.query["mcp_id"])
    return {
      redirect: {
        destination: "/",
      },
    };

  return {
    props: {
      mcp_id: context.query["mcp_id"],
    },
  };
};

const Home: NextPage<{ mcp_id: string }> = (props: { mcp_id: string }) => {
  console.log(props.mcp_id);
  const router = useRouter();

  const { data, error } = useSWR(`/api/base-cal/ja-base/mcp/${props.mcp_id}`, fetcher);

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
          <h3>Mã điểm tập kết: {props.mcp_id}</h3>
        </div>
        <div>
          <Button>Cập nhật</Button>
        </div>
      </div>
      <div className={styles.body}>
        <FirstRow name="Thứ trong tuần" id="Lao công"></FirstRow>
        {data
          ? data.map((item: AssignmentProps) => (
              <Assignment
                key={props.mcp_id}
                mcp_id={props.mcp_id}
                ja_id={item["ja_id"]}
                day_of_week={item["day_of_week"]}
              />
            ))
          : null}
      </div>
    </div>
  );
};
type AssignmentProps = {
  mcp_id: string;
  ja_id: string;
  day_of_week: string;
};

const Assignment = (props: AssignmentProps) => {
  const [value, setValue] = useState(props.ja_id || "");
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await formSubmit(props.mcp_id, value, props.ja_id);
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

async function formSubmit(mcp_id: string, value: string, ja_id?: string) {
  if (value) {
    await fetch(`/api/base-cal/ja-base/mcp?mcp_id=${mcp_id}&ja_id=${value}`, {
      method: "POST",
    });

    return;
  }

  if (ja_id) {
    await fetch(`/api/base-cal/ja-base/mcp?mcp_id=${mcp_id}&ja_id=${ja_id}`, {
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
