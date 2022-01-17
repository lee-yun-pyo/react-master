import { atom, selector } from "recoil";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
  // string으로 반환되도록 설정
  // 원래 값: 0, 1, 2 (문자를 숫자로 표현함)
}
export interface ITodo {
  text: string;
  id: number;
  category: Categories;
}

export const toDoState = atom<ITodo[]>({
  key: "toDos",
  default: [],
});

export const categoryState = atom<Categories>({
  // <Categories>: 타입 스크립트에게 category가 세 개중 하나임을 알려줌
  key: "categoryState",
  default: Categories.TO_DO,
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    if (category === "TO_DO")
      return toDos.filter((toDo) => toDo.category === "TO_DO");
    if (category === "DOING")
      return toDos.filter((toDo) => toDo.category === "DOING");
    if (category === "DONE")
      return toDos.filter((toDo) => toDo.category === "DONE");
  },
});
