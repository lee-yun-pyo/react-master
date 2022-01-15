import { useForm } from "react-hook-form";

interface ITodo {
  toDo: string;
}

function ToDoList1() {
  const { register, handleSubmit, setValue } = useForm<ITodo>();
  const onSubmit = (data: ITodo) => {
    setValue("toDo", "");
  };
  return (
    <div>
      <h1>투두 리스트</h1>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("toDo", {
            required: "Please write todo",
          })}
          type="text"
          placeholder="write your to do"
        />
        <button>클릭</button>
      </form>
    </div>
  );
}

export default ToDoList1;
