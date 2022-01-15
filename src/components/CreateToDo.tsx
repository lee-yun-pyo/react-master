import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";
import { toDoState } from "./atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { handleSubmit, register, setValue } = useForm();
  const onSubmit = ({ toDo }: IForm) => {
    setToDos((oldToDo) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
      ...oldToDo,
    ]);
    setValue("toDo", "");
  };
  return (
    <div>
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

export default CreateToDo;
