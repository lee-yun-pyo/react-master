import { ITodo } from "./atoms";

function ToDo({ text }: ITodo) {
  return (
    <li>
      <span>{text}</span>
      <button>To Do</button>
      <button>Doing</button>
      <button>Done</button>
    </li>
  );
}
export default ToDo;
