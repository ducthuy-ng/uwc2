import type { GetServerSidePropsContext, NextPage } from "next";
import styles from "./../../styles/co-area-detail.module.css";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { useState } from "react";
import { fetcher } from "../../lib/fetch";
import useSWR from "swr";
import { useRouter } from "next/router";

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  if (!context.query["area_id"])
    return {
      redirect: {
        destination: "/",
      },
    };

  return {
    props: {
      area_id: context.query["area_id"],
    },
  };
};

const Home: NextPage<{ area_id: string }> = (props: { area_id: string }) => {
  console.log(props.area_id);
  const router = useRouter();

  const { data, error } = useSWR(`/api/base-cal/co-base/area/${props.area_id}`, fetcher);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>QUẢN LÝ LỊCH NỀN TÀI XẾ - Chi tiết</h1>
      </div>
      <div className={styles.option}>
        <div>
          <Button
            onClick={() => {
              router.push("/basecal/co-area");
            }}
          >
            Quay lại
          </Button>
        </div>
        <div className={styles.optionSearch}>
          <h3>Mã khu vực: {props.area_id}</h3>
        </div>
        <div>
          <Button>Cập nhật</Button>
        </div>
      </div>
      <div className={styles.body}>
        <FirstRow name="Thứ trong tuần" id="Tài xế"></FirstRow>
        {data
          ? data.map((item: AssignmentProps) => (
              <Assignment
                key={props.area_id}
                area_id={props.area_id}
                co_id={item["co_id"]}
                day_of_week={item["day_of_week"]}
              />
            ))
          : "Loading..."}
      </div>
    </div>
  );
};

type AssignmentProps = {
  area_id: string;
  co_id: string;
  day_of_week: string;
};

const Assignment = (props: AssignmentProps) => {
  const [value, setValue] = useState(props.co_id || "");
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await formSubmit(props.area_id, value, props.co_id, props.day_of_week);
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

async function formSubmit(area_id: string, value: string, co_id?: string, day_of_week?: string) {
  if (value) {
    await fetch(`/api/base-cal/co-base?area_id=${area_id}&co_id=${value}&day_of_week=${day_of_week}`, {
      method: "POST",
    });

    return;
  }

  if (co_id) {
    await fetch(`/api/base-cal/co-base?area_id=${area_id}&co_id=${co_id}&day_of_week=${day_of_week}`, {
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
