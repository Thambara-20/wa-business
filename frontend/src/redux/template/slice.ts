import { PayloadAction, createSlice } from "@reduxjs/toolkit";
const LocalstorageId = `${process.env.REACT_APP_API_URL}`;

type Button = {
  _id: number;
  name: string;
  type: string;
  link: string;
};

type template = {
  _id: string;
  name: string;
  buttons: Button[];
  isloading: boolean;
};

export const initialStateTemplate: template = {
  _id: "1",
  isloading: false,
  name: "Sample",
  buttons: [
    {
      _id: 1,
      name: "Test Button",
      type: "",
      link: "https://sample.com",
    },
  ],
};

const userSlice = createSlice({
  name: "template",
  initialState: initialStateTemplate,
  reducers: {
    updatetemplate: (state, action: PayloadAction<Partial<template>>) => {
      Object.assign(state, action.payload);
    },
    updateButton: (state, action: PayloadAction<Partial<Button>>) => {
      const buttonIndex = state.buttons.findIndex(
        (button) => button._id === action.payload._id
      );
      state.buttons[buttonIndex] = {
        ...state.buttons[buttonIndex],
        ...action.payload,
      };
    },
    deleteButton: (state, action: PayloadAction<number>) => {
      state.buttons = state.buttons.filter((e) => e._id != action.payload);
    },
  },
});

export default userSlice.reducer;
export const { updatetemplate, updateButton, deleteButton } = userSlice.actions;
