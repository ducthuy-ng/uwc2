import type { NextPage } from "next";
import styles from "../../styles/assignment-vehicle.module.css";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { ReactNode, useState } from "react";
import { fetcher } from "../../lib/fetch";
import useSWR from "swr";

const Home: NextPage = () => {
  const { data, error } = useSWR("/api/assignment/area-vehicle", fetcher);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Phân khu vực - xe rác</h1>
      </div>
      <div className={styles.option}>
        <div>
          <Button>Quay lại</Button>
        </div>
        <div className={styles.optionSearch}>
          <div>
            <Input className={styles.optionSearch_Input} placeholder="Nhập tên khu vực ..."></Input>
          </div>
          <div>
            <Button className={styles.optionSearch_Button}>Tìm kiếm</Button>
          </div>
        </div>
        <div>
          <Button>Lọc</Button>
        </div>
      </div>
      <div className={styles.body}>
        {data
          ? data.map((item: AssignmentProps) => (
              <Assignment
                key={item["area_id"]}
                area_name={item["area_name"]}
                area_id={item["area_id"]}
                vehicle_id={item["vehicle_id"]}
              />
            ))
          : "Loading..."}
      </div>
    </div>
  );
};

type AssignmentProps = {
  area_name: string;
  area_id: string;
  vehicle_id?: string;
};

const Assignment = (props: AssignmentProps) => {
  const [value, setValue] = useState(props.vehicle_id || "");
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await formSubmit(props.area_id, value, props.vehicle_id);
      }}
      className={styles.item}
    >
      <div className={styles.item_Text}>{props.area_name}</div>
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

async function formSubmit(area_id: string, value: string, vehicle_id?: string) {
  if (value) {
    await fetch(`/api/assignment/area-vehicle?area_id=${area_id}&vehicle_id=${value}`, {
      method: "POST",
    });

    return;
  }

  if (vehicle_id) {
    await fetch(`/api/assignment/area-vehicle?area_id=${area_id}&vehicle_id=${vehicle_id}`, {
      method: "DELETE",
    });
  }
}

export default Home;
