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

/* toDo들 가져다가 categoryState에 맞는 toDo만을 걸러서 반환 */
export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
