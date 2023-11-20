import { atom } from "recoil";

export const textState = atom({
  key: "textState",
  default: {
    changeState: false,
  },
});

// export const checkActivityLoading= atom({
//   key: "textState",
//   default: false,
// });
