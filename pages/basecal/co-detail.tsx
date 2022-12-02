import type { GetServerSidePropsContext, NextPage } from "next";
import styles from "./../../styles/ja-detail.module.css";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { useState } from "react";
import { fetcher } from "../../lib/fetch";
import useSWR from "swr";
import { useRouter } from "next/router";

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  if (!context.query["co_id"])
    return {
      redirect: {
        destination: "/",
      },
    };

  return {
    props: {
      co_id: context.query["co_id"],
    },
  };
};

const Home: NextPage<{ co_id: string }> = (props: { co_id: string }) => {
  console.log(props.co_id);
  const router = useRouter();

  const { data, error } = useSWR(`/api/base-cal/co-base/${props.co_id}`, fetcher);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>QUẢN LÝ LỊCH NỀN TÀI XẾ - Chi tiết</h1>
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
          <h3>Mã số nhân viên: {props.co_id}</h3>
        </div>
        <div>
          <Button>Cập nhật</Button>
        </div>
      </div>
      <div className={styles.body}>
        <FirstRow name="Thứ trong tuần" id="Khu vực"></FirstRow>
        {data
          ? data.map((item: AssignmentProps) => (
              <Assignment
                key={props.co_id}
                co_id={props.co_id}
                area_id={item["area_id"]}
                day_of_week={item["day_of_week"]}
              />
            ))
          : null}
      </div>
    </div>
  );
};

type AssignmentProps = {
  co_id: string;
  area_id: string;
  day_of_week: string;
};

const Assignment = (props: AssignmentProps) => {
  const [value, setValue] = useState(props.area_id || "");
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await formSubmit(props.co_id, value, props.area_id);
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

async function formSubmit(co_id: string, value: string, area_id?: string) {
  if (value) {
    await fetch(`/api/base-cal/co-base?co_id=${co_id}&area_id=${value}`, {
      method: "POST",
    });

    return;
  }

  if (area_id) {
    await fetch(`/api/base-cal/co-base?co_id=${co_id}&area_id=${area_id}`, {
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
