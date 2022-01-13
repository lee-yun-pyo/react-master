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

interface IForm {
  email: string;
  lastName: string;
  firstName: string;
  password: string;
  password1: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onVaild = (data: IForm) => {
    if (data.password !== data.password1) {
      setError("password1", { message: "패스워드가 일치하지 않습니다." });
    }
  };
  console.log(errors);
  return (
    <div>
      <form onSubmit={handleSubmit(onVaild)}>
        <input
          {...register("email", {
            required: "필수 입니다.",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com allowed",
            },
          })}
          type="text"
          placeholder="write"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register("lastName", {
            required: "필수 입니다.",
            minLength: { value: 5, message: "to short" },
            validate: {
              react: (value) =>
                value.includes("react") ? "react를 포함할 수 없습니다." : true,
              js: (value) =>
                value.includes("js") ? "js를 포함할 수 없습니다." : true,
            },
          })}
          type="text"
          placeholder="write"
        />
        <span>{errors?.lastName?.message}</span>
        <input
          {...register("firstName", { required: "필수 입니다." })}
          type="text"
          placeholder="write"
        />
        <span>{errors?.firstName?.message}</span>
        <input
          {...register("password", { required: "필수 입니다." })}
          type="text"
          placeholder="write"
        />{" "}
        <span>{errors?.password?.message}</span>
        <input
          {...register("password1", { required: "필수 입니다." })}
          type="text"
          placeholder="write"
        />{" "}
        <span>{errors?.password1?.message}</span>
        <button>Click</button>
      </form>
    </div>
  );
}

export default ToDoList;
