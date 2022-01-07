import { atom } from "recoil";

export const isDarkAtom = atom({
    key: 'isDark', // unique ID (with respect to other atoms/selectors)
    default: true, // default value (aka initial value)
  });