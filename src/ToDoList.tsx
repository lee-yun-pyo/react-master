import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";

interface ITodo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

const toDoState = atom<ITodo[]>({
  key: "toDos",
  default: [],
});

interface IForm {
  toDo: string;
}

function ToDoList1() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onSubmit = ({ toDo }: IForm) => {
    setToDos((oldToDo) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
      ...oldToDo,
    ]);
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
      <ul>
        {toDos.map((toDo) => (
          <li key={toDo.id}>{toDo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList1;
