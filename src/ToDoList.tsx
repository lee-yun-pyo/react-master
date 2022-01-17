import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  Categories,
  categoryState,
  toDoSelector,
  toDoState,
} from "./components/atoms";
import CreateToDo from "./components/CreateToDo";
import ToDo from "./components/ToDo";

function ToDoList1() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
    /* categoryState = atom<Categories> 
    -->  setCategory 인자로 category를 받음 
    --> as any로 해결 */
  };
  return (
    <div>
      <h1>투두 리스트</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>TO DO</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>DONE</option>
      </select>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo}></ToDo>
      ))}
    </div>
  );
}

export default ToDoList1;
