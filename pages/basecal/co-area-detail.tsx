// import type { NextPage } from "next";
// import styles from "./../../styles/co-area-detail.module.css";
// import { Button } from "../../components/Button/Button";
// import { Input } from "../../components/Input/Input";
// import { useState } from "react";
// import { fetcher } from "../../lib/fetch";
// import useSWR from "swr";
// import { useRouter } from "next/router";

// const Home: NextPage = () => {
//   const router = useRouter();

//   const { data, error } = useSWR("/api/assignment/ja-trolley", fetcher);

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h1>QUẢN LÝ LỊCH NỀN TÀI XẾ - Chi tiết</h1>
//       </div>
//       <div className={styles.option}>
//         <div>
//           <Button
//             onClick={() => {
//               router.push("/");
//             }}
//           >
//             Quay lại
//           </Button>
//         </div>
//         <div className={styles.optionSearch}>
//           <h3>Mã khu vực: 1</h3>
//         </div>
//         <div>
//           <Button>Cập nhật</Button>
//         </div>
//       </div>
//       <div className={styles.body}>
//         <FirstRow name="Thứ trong tuần" id="Tài xế"></FirstRow>
//         {data
//           ? data.map((item: AssignmentProps) => (
//               <Assignment
//                 key={item["ja_id"]}
//                 ja_name={item["ja_name"]}
//                 ja_id={item["ja_id"]}
//                 trolley_id={item["trolley_id"]}
//               />
//             ))
//           : "Loading..."}
//       </div>
//     </div>
//   );
// };

// type AssignmentProps = {};

// const Assignment = (props: AssignmentProps) => {
//   const [value, setValue] = useState(props.trolley_id || "");
//   return (
//     <form
//       onSubmit={async (event) => {
//         event.preventDefault();
//         await formSubmit(props.ja_id, value, props.trolley_id);
//       }}
//       className={styles.item}
//     >
//       <div className={styles.item_Text}>{props.ja_name}</div>
//       <div className={styles.item_Input}>
//         <Input
//           value={value}
//           onChange={(e) => {
//             setValue(e.target.value);
//           }}
//         ></Input>
//       </div>
//       <input type="submit" hidden></input>
//     </form>
//   );
// };

// async function formSubmit(ja_id: string, value: string, trolley_id?: string) {
//   if (value) {
//     await fetch(`/api/assignment/ja-trolley?ja_id=${ja_id}&trolley_id=${value}`, {
//       method: "POST",
//     });

//     return;
//   }

//   if (trolley_id) {
//     await fetch(`/api/assignment/ja-trolley?ja_id=${ja_id}&trolley_id=${trolley_id}`, {
//       method: "DELETE",
//     });
//   }
// }

// type FirstRowProps = {
//   name?: string;
//   id?: string;
// };

// const FirstRow = (props: FirstRowProps) => {
//   return (
//     <h3 className={styles.item}>
//       <div className={styles.item_Name}>{props.name}</div>
//       <div className={styles.item_MSNV}>{props.id}</div>
//     </h3>
//   );
// };

// export default Home;
