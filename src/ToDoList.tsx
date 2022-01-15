import { useRecoilState, useRecoilValue } from "recoil";
import { toDoState } from "./components/atoms";
import CreateToDo from "./components/CreateToDo";
import ToDo from "./components/ToDo";

function ToDoList1() {
  const toDos = useRecoilValue(toDoState);
  return (
    <div>
      <h1>투두 리스트</h1>
      <hr />
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList1;
