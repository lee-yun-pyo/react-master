import React, { useState } from "react";
import { useForm } from "react-hook-form";

// function ToDoList() {
//   const [toDo, setTodo] = useState("");
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setTodo(value);
//   };
//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     console.log(toDo);
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input
//           onChange={onChange}
//           value={toDo}
//           type="text"
//           placeholder="write your to do"
//         />
//         <button>클릭</button>
//       </form>
//     </div>
//   );
// }

function ToDoList() {
  const { register, handleSubmit, formState } = useForm();
  const onVaild = (data: any) => {
    console.log(data);
  };
  console.log(formState.errors);
  return (
    <div>
      <form onSubmit={handleSubmit(onVaild)}>
        <input
          {...register("Email", { required: true })}
          type="text"
          placeholder="write"
        />
        <input
          {...register("Email2", {
            minLength: { value: 5, message: "to short" },
          })}
          type="text"
          placeholder="write"
        />
        <input {...register("Email3")} type="text" placeholder="write" />
        <input {...register("Email4")} type="text" placeholder="write" />
        <input {...register("Email5")} type="text" placeholder="write" />
        <button>Click</button>
      </form>
    </div>
  );
}

export default ToDoList;
